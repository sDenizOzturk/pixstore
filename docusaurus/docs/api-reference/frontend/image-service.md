---
id: image-service
title: Image Service
sidebar_position: 2
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

# Image Service

This module provides high-level functions to retrieve and manage encrypted images on the frontend.

It automatically fetches the image from the backend (using either the default endpoint or a custom fetcher), decrypts it using AES-GCM, and caches the result in IndexedDB for future access.

All functions are exported from the `pixstore/frontend` entrypoint:

```ts
import {
  getImage,
  deleteCachedImage,
  cachedImageExists,
} from 'pixstore/frontend'
```

Each function is described in detail below.

---

## `getImage`

Retrieves and decrypts an image using token-based cache validation and stateless proof authorization.

- If the image is cached in IndexedDB **and** its token matches the provided `record.token`, the cached encrypted data is decrypted and returned immediately as a `Blob`.
- If the cached token differs from the provided `record.token` (indicating a possible update elsewhere), a conditional fetch is made to the backend with the cached token:

  - The backend returns either a minimal payload if the image is unchanged (just after the imageRecord sent) or a full updated payload if changed.

  - The local cache is updated accordingly with the latest encrypted data and token.

- The image is always decrypted using the latest encrypted data and metadata (which may come from the cache or backend).
- This mechanism minimizes data transfer while ensuring the image cache is kept up to date.

---

### Description

```ts
export const getImage = (
  record: ImageRecord,
  context?: any
): Promise<Blob | null>
```

---

### Parameters

| Name      | Type          | Description                                                                                  |
| --------- | ------------- | -------------------------------------------------------------------------------------------- |
| `record`  | `ImageRecord` | Metadata object received from backend, including `id`, `token`, `meta`, and `statelessProof` |
| `context` | `any?`        | Optional data passed to a custom image fetcher (if configured on frontend)                   |

---

### Example

```ts
const blob = await getImage(imageRecord)
if (blob) {
  const url = URL.createObjectURL(blob)
  // ...use in <img> or wherever
} else {
  // For error details, use:
  console.error(getLastPixstoreError())
  // show fallback, placeholder, etc.
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Retrieves image data using token-based cache validation.
 * Returns the cached Blob if token matches; otherwise fetches, updates, and returns new Blob.
 */
export const getImage = async (
  record: ImageRecord,
  context?: unknown,
): Promise<Blob | null> => {
  return handleErrorAsync(async () => {
    // Attempt to read the cached image from IndexedDB by ID
    const { id, token, meta } = record
    const cached = await readImageRecord(id)

    // If a cached image exists and the token matches, return it immediately
    if (cached && cached.token === token) {
      const indexedDBRecord = await readImageRecord(id)
      const encrypted = indexedDBRecord!.encrypted

      // Decrypt the image using the extracted encrypted data and meta
      const imagePayload = await decryptImage(encrypted, meta)

      // Update lastUsed timestamp (wihtout awaiting)
      writeImageRecord({
        ...indexedDBRecord!,
        lastUsed: Date.now(),
      })

      // Return the up-to-date Blob for rendering
      return decryptedPayloadToBlob(imagePayload)
    }

    // Otherwise, fetch the latest encoded image from the backend
    const encoded = await fetchEncodedImage(record, context)

    // Decode the wire payload to extract encrypted data, meta, and token
    const decodedWirePayload = decodeWirePayload(encoded)

    // Ensure response state is Success or Updated; throw on error or not found.
    if (
      decodedWirePayload.state !== WirePayloadState.Success &&
      decodedWirePayload.state !== WirePayloadState.Updated
    )
      throw new PixstoreError(
        `Image fetch failed: state=${
          WirePayloadState[decodedWirePayload.state] || decodedWirePayload.state
        } (not Success/Updated)`,
      )

    // Use the correct token depending on response state (Success uses old token, Updated uses fresh token)
    const latestToken =
      decodedWirePayload.state === WirePayloadState.Success
        ? token
        : decodedWirePayload.token

    // Prepare the IndexedDB record with fresh encrypted data and token
    const indexedDBRecord: IndexedDBImageRecord = {
      id,
      encrypted: decodedWirePayload.encrypted,
      token: latestToken,
      lastUsed: Date.now(),
    }

    // Save the updated image into the local cache (wihtout awaiting)
    writeImageRecord(indexedDBRecord)

    // Use the correct meta depending on response state (Success keeps old meta, Updated uses new meta)
    const latestMeta =
      decodedWirePayload.state === WirePayloadState.Success
        ? meta
        : decodedWirePayload.meta

    // Decrypt the image using the encrypted data and meta from the wire payload.
    // The `record.meta` is not used, using stale meta could break decryption if the image was recently updated.
    const imagePayload = await decryptImage(
      decodedWirePayload.encrypted,
      latestMeta,
    )

    // Return the up-to-date Blob for rendering
    return decryptedPayloadToBlob(imagePayload)
  })
}
```

---

## `deleteCachedImage`

Removes an image from the local IndexedDB cache by its ID.
Useful when you want to manually clear outdated or unused images from the frontend cache.

---

### Description

```ts
export const deleteCachedImage = (
  id: string
): Promise<void | null>
```

---

### Parameters

| Name | Type     | Description                       |
| ---- | -------- | --------------------------------- |
| `id` | `string` | ID of the cached image to delete. |

---

### Example

```ts
const result = await deleteCachedImage(imageId)

if (result === null) {
  // For error details, use:
  console.error(getLastPixstoreError())
} else {
  console.log('Image deleted or not found.')
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Removes a cached image from IndexedDB.
 */
export const deleteCachedImage = async (id: string): Promise<void | null> => {
  return handleErrorAsync(async () => {
    // Deletes the image record (by ID) from the local IndexedDB cache
    await deleteImageRecord(id)
  })
}
```

---

## `cachedImageExists`

Checks whether a cached image exists in the local IndexedDB by its ID.

This can be used to conditionally load or invalidate image data before making a network request.

---

### Description

```ts
export const cachedImageExists = (
  id: string
): Promise<boolean | null>
```

---

### Parameters

| Name | Type     | Description                            |
| ---- | -------- | -------------------------------------- |
| `id` | `string` | ID of the image to check in the cache. |

---

### Example

```ts
const exists = await cachedImageExists(imageId)

if (exists === null) {
  // For error details, use:
  console.error(getLastPixstoreError())
} else if (exists) {
  console.log('Image is available locally.')
} else {
  console.log('Image needs to be fetched.')
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Returns true if a cached image exists in IndexedDB for the given id.
 */
export const cachedImageExists = async (
  id: string,
): Promise<boolean | null> => {
  return handleErrorAsync(async () => {
    // Checks IndexedDB for an image record with the specified ID
    return await imageRecordExists(id)
  })
}
```

---

📄 Source: [`src/frontend/image-service.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/frontend/image-service.ts)
