---
id: cache-cleanup
title: Automatic Cache Cleanup
sidebar_position: 7
---

Pixstore automatically manages image cache in the browser using **IndexedDB**.  
This includes cleanup of old or unused images to stay within your configured cache limits.

## How it works

- Every cached image includes a `lastUsed` timestamp.
- When `getImage()` is called, Pixstore checks how many images exist in the cache.
- If the number exceeds the limit, it automatically deletes the **least recently used** images.
- The cleanup happens **in the background** and does not block image rendering.

You do not need to run any manual cleanup logic in your app.

## Configuration options

You can control cache size and cleanup behavior via [`initPixstoreFrontend`](/docs/api-reference/types#pixstorefrontendconfig):

```ts
initPixstoreFrontend({
  frontendImageCacheLimit: 300, // Max number of images to keep (default: 1000)
  frontendCleanupBatch: 50, // How many images to delete when limit is exceeded (default: 50)
})
```

- **`frontendImageCacheLimit`**: sets the maximum number of cached images.
- **`frontendCleanupBatch`**: defines how many old records to delete when the limit is exceeded.

Pixstore will always delete the **oldest `lastUsed` images first**.

---

## Manual deletion

You can delete a specific cached image manually using its ID.
This can be useful, for example, on logout or when you know a certain image is no longer needed.

```ts
import { deleteCachedImage } from 'pixstore/frontend'

// Delete a single cached image by ID
await deleteCachedImage('students:abc123')
```

---

## Notes

- Only decrypted images are stored in IndexedDB.
- Pixstore **never stores keys, proofs, or sensitive data** in the browser.
