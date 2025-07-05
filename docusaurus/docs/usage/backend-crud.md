---
id: backend-crud
title: Image CRUD on the Backend
sidebar_position: 2
---

Pixstore automatically creates and manages a SQLite database for image metadata, and stores all encrypted image files in your configured directory.
You do not need to set up any storage or database manually.

## How it works

When you save or update an image:

- The image is encrypted using AES-GCM with a unique key for each image.
- All encryption details (key, IV, authentication tag, and the image token) are stored in Pixstore’s internal SQLite table.
- The encrypted image file is saved in your configured image directory.

When you delete an image:

- Both the encrypted file and all related metadata are permanently removed from storage and database.

All these actions are atomic. Pixstore guarantees data integrity at every step.

## Saving an image (buffer-based)

```ts
import { saveImage } from 'pixstore/backend'
import { getLastPixstoreError } from 'pixstore/shared'

const imageBuffer: Buffer = getImageBufferSomehow_notPixstoreFunction() // e.g. uploaded file, network fetch
const imageRecord = await saveImage(imageBuffer)

if (!imageRecord) {
  // Image could not be saved
  // For error details, use:
  console.error(getLastPixstoreError())
}
```

Pixstore encrypts the buffer, writes it to disk, and records all metadata.

## Updating an image (buffer-based)

```ts
import { updateImage } from 'pixstore/backend'
import { getLastPixstoreError } from 'pixstore/shared'

const imageBuffer: Buffer = getImageBufferSomehow_notPixstoreFunction() // e.g. uploaded file, network fetch
const updatedRecord = await updateImage(imageId, imageBuffer)

if (!updatedRecord) {
  // Image not found
  // For error details, use:
  console.error(getLastPixstoreError())
}
```

The previous file and metadata are overwritten.
A new key and token are generated automatically.

## Deleting an image

```ts
import { deleteImage } from 'pixstore/backend'
import { getLastPixstoreError } from 'pixstore/shared'

const result = await deleteImage(imageId)

if (result === null) {
  // There was an error during deletion (use getLastPixstoreError() for details)
  console.error(getLastPixstoreError())
} else if (result) {
  console.log('Image deleted.')
} else {
  console.log('Image not found.')
}
```

Both the encrypted file and its metadata are fully removed.

## File path convenience wrappers

If you prefer, you can use `saveImageFromFile` and `updateImageFromFile` to work directly with image file paths.

```ts
import { saveImageFromFile, updateImageFromFile } from 'pixstore/backend'

const imageRecord = await saveImageFromFile('./photo.jpg')
const updatedRecord = await updateImageFromFile(imageId, './new-photo.jpg')
```

> **Tip:**  
> You can use these helpers with file paths, but reading from and writing to memory (using Buffers) is significantly faster and uses fewer resources than disk I/O. For best performance, prefer buffer-based APIs. Use file path helpers only when your images are already stored on disk.

## What does Pixstore automate for you

- Encryption using AES-GCM with per-image keys
- All file operations and directory management with built-in safety
- All metadata (key, IV, token, tag) is stored in SQLite
- Update and delete always keep file storage and database consistent
- All unsafe file names and path traversal attempts are blocked

Just call the CRUD methods. Pixstore handles everything else.

---

For detailed technical information, see the [API Reference section](../api-reference/backend/image-service).
