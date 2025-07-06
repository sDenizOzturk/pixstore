---
id: integration
title: Backend ↔ Frontend Integration
sidebar_position: 4
---

Pixstore securely connects backend and frontend for encrypted image storage and safe, up-to-date image access.

You should **never send static image URLs** from your backend to your frontend.
Instead, always provide an up-to-date `imageRecord` object (including id, token, and encryption metadata) in your API responses.

On the frontend, always use `getImage(imageRecord)` to fetch, decrypt, and cache the image.
Do not use hardcoded image paths or try to fetch images directly by URL.

This pattern ensures your app always displays the latest, authorized, and securely decrypted image.
You do not have to manage storage, security, or cache validation yourself.

## How it works

- All images are encrypted and stored on the backend using a unique AES-GCM key per image.
- The encryption key is never saved or persisted on the frontend, not even in IndexedDB.
- When the frontend needs to display an image, it must receive an up-to-date `imageRecord` from your API.
- Pixstore first checks the IndexedDB cache using the image ID and token.
- If a valid cached image exists with a matching token, it is returned directly with no network call.
- If the image is not cached or the token does not match, Pixstore uses the [Stateless proof mechanism](#stateless-proof-mechanism) to securely fetch the encrypted image and metadata (decryption key, IV, authentication tag, and latest token) from the backend in wire format.
- All decryption happens in memory on the frontend. No key or sensitive data is ever saved to IndexedDB.
- The token ensures that cache is never stale. If an image is updated, the frontend always receives the correct key and token in the new wire payload.

This approach guarantees:

- **Strong security:** keys never leave the backend except for in-memory decryption
- **Consistency:** you always get the latest version, even if the image is updated right before your fetch
- No risk of leaking sensitive data in browser cache

## Typical integration flow

1. **Save or update an image on the backend**

   - Backend generates or updates the encrypted image and its metadata.

2. **API returns the imageRecord**

   - Your backend API always returns an up-to-date imageRecord object in its JSON payload.

3. **Frontend calls `getImage(imageRecord)`**

   - Pixstore first checks the IndexedDB cache.
   - If necessary, Pixstore fetches the encrypted image and decryption metadata from the backend, using the stateless proof included in the imageRecord.
   - Only the decrypted image is cached. The key is never written to storage.

4. **Frontend displays the image**

   - You get a standard Blob to use in `<img>` tags or anywhere else.

## Example

**Backend:**

```ts
import { getImageRecord } from 'pixstore/backend'

app.get('/api/player/:id', async (req, res) => {
  const playerId = req.params.id
  const imageRecord = getImageRecord(playerId)
  // ...fetch player data from DB
  res.json({ ...player, imageRecord })
})
```

**Frontend:**

```ts
import { getImage } from 'pixstore/frontend'

const response = await fetch('/api/player/42')
const { imageRecord } = await response.json()

const blob = await getImage(imageRecord)
if (blob) {
  const url = URL.createObjectURL(blob)
  // Use the url in your UI
}
```

---

## Stateless proof mechanism

Pixstore uses a **stateless proof mechanism** to ensure that image requests are authorized and originate from valid frontend flows, not from direct access to public endpoints.

This mechanism prevents **external or unauthorized tools** from calling your default or custom image endpoints directly without going through your application logic.

### Why is it needed?

Pixstore endpoints like `/pixstore-image/:id` are technically accessible by anyone (such as browser or fetch requests),
but images should **only** be retrieved through valid application paths using `getImage()`.

The `statelessProof` ensures:

- Only your **authenticated backend** generates image access metadata.
- Only a **fresh, valid request** from the frontend can successfully load a decrypted image.
- Without a valid proof, the backend responds with a wire payload in `MissingProof` or `InvalidProof` state, and no image data is served.

### How does it work?

- Every `imageRecord` sent to the frontend includes a `statelessProof` field.
- The proof is generated **per image**, using a time-based cryptographic signature.
- It is **short-lived** and expires quickly (e.g., 20-40 seconds).

### What should I do?

- Always fetch a fresh `imageRecord` from your backend just before calling `getImage()` on the frontend.
- Do not reuse or persist `imageRecord` values across pages, sessions, or users.

### Can I skip proof verification?

If you are using a custom endpoint, you can choose to manually disable proof validation
by setting [`statelessKeyWindowLength: -1`](/docs/api-reference/types#pixstorebackendconfig) during [`initPixstoreBackend`](/docs/api-reference/backend/initialization#initpixstorebackend).

> Pixstore does not do this by default. You must handle it manually and only in trusted environments like dev tools or internal dashboards.

---

## What does Pixstore automate for you

- Secure end-to-end encrypted image transfer between backend and frontend
- Automatic stateless proof generation and validation for secure access
- Automatic cache validation and update via tokens
- Never persists any key material or secrets on the frontend
- Seamless backend to frontend workflow for encrypted images

Just provide the image record to your frontend. Pixstore handles everything else.

---

For advanced integration or security topics, see:

- [API Reference - ImageRecord Type](/docs/api-reference/types#imagerecord)
- [API Reference - How getImage works](/docs/api-reference/frontend/image-service#how-it-works)
