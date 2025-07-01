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

Retrieves and decrypts an image using token-based cache validation.

If the image is already cached in IndexedDB **and** the token matches, it is decrypted and returned directly.
Otherwise, the image is fetched from the backend in encrypted wire format, decoded, cached, and then decrypted before returning as a `Blob`.

---

### Description

```ts
export const getImage = (
  record: ImageRecord,
  context?: any
): Promise<Blob>
```

---

### Parameters

| Name      | Type          | Description                                                                |
| --------- | ------------- | -------------------------------------------------------------------------- |
| `record`  | `ImageRecord` | Metadata object received from backend (`id`, `token`, and `meta`)          |
| `context` | `any?`        | Optional data passed to a custom image fetcher (if configured on frontend) |

---

### Example

```ts
try {
  const blob = await getImage(imageRecord)
  const url = URL.createObjectURL(blob)
  // ...use in <img> or wherever
} catch {
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
  context?: any,
): Promise<Blob> => {
  // Attempt to read the cached image from IndexedDB by ID
  const { id, token, meta } = record
  const cached = await readImageRecord(id)

  // If a cached image exists and the token matches, return it immediately
  if (cached && cached.token === token) {
    const indexedDBRecord = await readImageRecord(id)
    const encrypted = indexedDBRecord!.encrypted

    // Decrypt the image using the extracted encrypted data and meta
    const imagePayload = await decryptImage(encrypted, meta)

    // Return the up-to-date Blob for rendering
    return decryptedPayloadToBlob(imagePayload)
  }

  // Otherwise, fetch the latest encoded image from the backend
  const encoded = await fetchEncodedImage(record.id, context)

  // Decode the wire payload to extract encrypted data, meta, and token
  const decodedWirePayload = decodeWirePayload(encoded)

  // Prepare the IndexedDB record with fresh encrypted data and token
  const indexedDBRecord: IndexedDBImageRecord = {
    id,
    encrypted: decodedWirePayload.encrypted,
    token: decodedWirePayload.token,
    lastUsed: Date.now(),
  }

  // Save the updated image into the local cache
  await writeImageRecord(indexedDBRecord)

  // Decrypt the image using the encrypted data and meta from the wire payload.
  // The `record.meta` is not used, using stale meta could break decryption if the image was recently updated.
  const imagePayload = await decryptImage(
    decodedWirePayload.encrypted,
    decodedWirePayload.meta,
  )

  // Return the up-to-date Blob for rendering
  return decryptedPayloadToBlob(imagePayload)
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
): Promise<void>
```

---

### Parameters

| Name | Type     | Description                       |
| ---- | -------- | --------------------------------- |
| `id` | `string` | ID of the cached image to delete. |

---

### Example

```ts
import { deleteCachedImage } from 'pixstore/frontend'

await deleteCachedImage(imageId)

// Optional: update UI or local state
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Removes a cached image from IndexedDB.
 */
export const deleteCachedImage = async (id: string): Promise<void> => {
  // Deletes the image record (by ID) from the local IndexedDB cache
  await deleteImageRecord(id)
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
): Promise<boolean>
```

---

### Parameters

| Name | Type     | Description                            |
| ---- | -------- | -------------------------------------- |
| `id` | `string` | ID of the image to check in the cache. |

---

### Example

```ts
import { cachedImageExists } from 'pixstore/frontend'

const exists = await cachedImageExists(imageId)

if (exists) {
  console.log('Image is available locally.')
} else {
  console.log('Image needs to be fetched.')
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Returns true if a cached image exists in IndexedDB for the given id.
 */
export const cachedImageExists = async (id: string): Promise<boolean> => {
  // Checks IndexedDB for an image record with the specified ID
  return await imageRecordExists(id)
}
```

---

📄 Source: [`src/frontend/image-service.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/frontend/image-service.ts)
