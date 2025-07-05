---
id: frontend-crud
title: Image CRUD on the Frontend
sidebar_position: 3
---

Pixstore automatically creates and manages an IndexedDB table for image caching in the browser.
You do not need to set up or initialize any storage manually.

## How it works

Pixstore handles all frontend image cache management for you.

- When you use `getImage`, Pixstore fetches and decrypts the image from the backend (if needed), then caches it in IndexedDB as decrypted (without the key) for fast future access.
- No encryption keys or sensitive data are ever written to IndexedDB. All decryption is performed only in memory.
- Cached images are validated with tokens to ensure you never use stale or out-of-date content.

When you remove an image from the frontend cache:

- The cached record is deleted from IndexedDB.
- If you created any Blob URLs from this image, you are responsible for revoking them using `URL.revokeObjectURL(url)` when they are no longer needed.

All these actions are performed automatically. You never interact with IndexedDB or low-level browser storage directly.

## Reading and caching an image

```ts
import { getImage } from 'pixstore/frontend'
import { getLastPixstoreError } from 'pixstore/shared'

const blob = await getImage(imageRecord)
if (blob) {
  const url = URL.createObjectURL(blob)
  // Use this url in <img src={url}> or anywhere in your UI
} else {
  // Image is not available
  console.error(getLastPixstoreError())
}
```

Pixstore handles fetching, decryption, and caching for you.
You only deal with Blob objects.

## Deleting a cached image

```ts
import { deleteCachedImage } from 'pixstore/frontend'
import { getLastPixstoreError } from 'pixstore/shared'

const success = await deleteCachedImage(imageId)

if (success === null) {
  // Unexpected error occurred
  console.error(getLastPixstoreError())
} else if (success) {
  // Image removed from cache
} else {
  // Image was not found in cache
}
```

Pixstore removes the image from the cache and releases resources.
No IndexedDB code is needed.

## Checking if a cached image exists

```ts
import { cachedImageExists } from 'pixstore/frontend'
import { getLastPixstoreError } from 'pixstore/shared'

const exists = await cachedImageExists(imageId)

if (exists === null) {
  // Unexpected error occurred
  console.error(getLastPixstoreError())
} else if (exists) {
  // Image is available locally
} else {
  // Image is not cached
}
```

## What does Pixstore automate for you

- Automatic creation and management of IndexedDB image cache
- Secure cache with token-based validation, always in sync with backend
- No encryption keys or secrets are stored in the browser cache
- Consistent cleanup and cache updates on every operation
- All storage and cryptography logic handled behind the scenes

Just call the CRUD methods. Pixstore manages the rest.

---

For detailed technical information, see the [API Reference section](../api-reference/frontend/image-service).
