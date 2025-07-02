---
id: image-service
title: Image Service
sidebar_position: 2
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

# Image Service

This module provides high-level functions to store, retrieve, update, and delete encrypted images on the backend.

It operates on binary buffers, handles AES-GCM encryption internally, and manages image metadata via SQLite.

All functions are exported from the `pixstore/backend` entrypoint:

```ts
import {
  getImageRecord,
  saveImage,
  saveImageFromFile,
  updateImage,
  updateImageFromFile,
  deleteImage,
  imageExists,
} from 'pixstore/backend'
```

Each function is described in detail below.

## `getImageRecord`

Retrieves the metadata for an image previously saved to the backend.

Returns an `ImageRecord` object containing the image's `id`, `token`, and `imageFormat`, or `null` if the image does not exist in the database.

---

### Description

```ts
export const getImageRecord = (id: string): ImageRecord | null
```

---

### Parameters

| Name | Type     | Description                 |
| ---- | -------- | --------------------------- |
| `id` | `string` | The unique ID of the image. |

---

### Example

```ts
const imageRecord = getImageRecord(imageId)

if (!imageRecord) {
  // Image not found
}

// Send this to the frontend.
// The Pixstore frontend needs imageRecord to fetch and decrypt the actual image.
const player: BasketballPlayer = {
  ...playerRecord,
  imageRecord,
}

res.json(player)
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Returns the image record (id + token) from the database
 * Returns null if not found
 */
export const getImageRecord = (id: string): ImageRecord | null => {
  return handleErrorSync(() => {
    // Reads imageRecord from database (includes id, token, and meta fields)
    return readImageRecord(id)
  })
}
```

---

## `saveImage`

Creates and saves a new image using an in-memory `Buffer`.  
The image is encrypted using AES-GCM, written to disk, and registered in the metadata database.

This function generates a unique `id` for the image, optionally namespaced by a `dir`.

---

### Description

```ts
export const saveImage = (
  buffer: Buffer,
  dir?: string
): Promise<ImageRecord | null>
```

---

### Parameters

| Name     | Type      | Description                                                     |
| -------- | --------- | --------------------------------------------------------------- |
| `buffer` | `Buffer`  | Raw binary data of the image. Will be encrypted before storage. |
| `dir`    | `string?` | Optional namespace or folder scope for the image ID.            |

---

### Example

```ts
const imageRecord = await saveImage(imageBuffer, 'players')

if (!imageRecord) {
  // Image could not be saved
}

// Send this to the frontend.
// The Pixstore frontend needs imageRecord to fetch and decrypt the actual image.
const player: BasketballPlayer = {
  ...playerRecord,
  imageRecord,
}

res.json(player)
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Saves an image buffer to disk and creates a corresponding database record.
 * If writing to the database fails, the saved file is deleted to maintain consistency.
 */
export const saveImage = async (
  buffer: Buffer,
  dir?: string,
): Promise<ImageRecord | null> => {
  return handleErrorAsync(async () => {
    // Generate a unique ID for this image, optionally scoped by dir
    const id = createUniqueId(dir)

    // Write the encrypted image and metadata
    return await writeImage(id, buffer, dir)
  })
}

/**
 * Writes an image buffer to disk and updates or creates its database record.
 * If writing to the database fails, the file is deleted to maintain consistency.
 */
const writeImage = async (
  id: string,
  buffer: Buffer,
  dir?: string,
): Promise<ImageRecord> => {
  // Encrypt the buffer using AES-GCM and get encryption metadata
  const { encrypted, meta } = encryptImage(buffer)

  // Save the encrypted image buffer to disk
  await saveImageFile(id, encrypted)

  try {
    // Write image metadata (token, key, iv, tag) to the database
    return writeImageRecord(id, meta)
  } catch (err) {
    // If writing metadata fails, delete the saved image to avoid inconsistency
    deleteImageFile(id)
    throw err
  }
}
```

---

## `saveImageFromFile`

Reads an image file from disk and saves it as a new encrypted image.

This is a convenience wrapper around `saveImage()`. It lets you work directly with file paths instead of manually reading buffers.

---

### Description

```ts
export const saveImageFromFile = (
  filePath: string,
  dir?: string
): Promise<ImageRecord | null>
```

---

### Parameters

| Name       | Type      | Description                                                   |
| ---------- | --------- | ------------------------------------------------------------- |
| `filePath` | `string`  | Path to the image file on disk                                |
| `dir`      | `string?` | Optional namespace or folder scope for the generated image ID |

---

### Example

```ts
const imageRecord = await saveImageFromFile('./assets/logo.png', 'system')

if (!imageRecord) {
  // Image could not be saved
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Reads an image file from disk and saves it as a new image
 * This is a convenience wrapper around saveImage()
 */
export const saveImageFromFile = async (
  filePath: string,
  dir?: string,
): Promise<ImageRecord | null> => {
  return handleErrorAsync(async () => {
    // Read file content into a Buffer
    const buffer = await diskToBuffer(filePath)

    // Save buffer as encrypted image
    return await saveImage(buffer, dir)
  })
}
```

---

## `updateImage`

Overwrites an existing image with new binary content and refreshes the corresponding metadata.

This function expects the image ID to already exist in the database. If not, returns null.

---

### Description

```ts
export const updateImage = (
  id: string,
  buffer: Buffer,
): Promise<ImageRecord | null>
```

---

### Parameters

| Name     | Type     | Description                                      |
| -------- | -------- | ------------------------------------------------ |
| `id`     | `string` | The ID of the image to update                    |
| `buffer` | `Buffer` | New binary content to replace the existing image |

---

### Example

```ts
const updatedImageRecord = await updateImage(playerId, newBuffer)
if (!updatedImageRecord) {
  // Image not found
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Updates an existing image by overwriting the file and refreshing the database record
 */
export const updateImage = async (
  id: string,
  buffer: Buffer,
): Promise<ImageRecord | null> => {
  return handleErrorAsync(async () => {
    // Check if image exists in the database
    if (!imageRecordExists(id)) {
      throw new Error(`Image not found: ${id}`)
    }

    // Overwrite image and update its metadata
    return await writeImage(id, buffer)
  })
}

/**
 * Writes an image buffer to disk and updates or creates its database record.
 * If writing to the database fails, the file is deleted to maintain consistency.
 */
const writeImage = async (
  id: string,
  buffer: Buffer,
  dir?: string,
): Promise<ImageRecord> => {
  // Encrypt the buffer using AES-GCM and get encryption metadata
  const { encrypted, meta } = encryptImage(buffer)

  // Save the encrypted image buffer to disk
  await saveImageFile(id, encrypted)

  try {
    // Write image metadata (token, key, iv, tag) to the database
    return writeImageRecord(id, meta)
  } catch (err) {
    // If writing metadata fails, delete the saved image to avoid inconsistency
    deleteImageFile(id)
    throw err
  }
}
```

---

## `updateImageFromFile`

Updates an existing image by reading new binary content from a file and replacing both the file and its metadata.

This function requires the image `id` to already exist in the database.
It is a convenience wrapper around `updateImage()` and lets you work directly with file paths.

---

### Description

```ts
export const updateImageFromFile = (
  id: string,
  filePath: string
): Promise<ImageRecord | null>
```

---

### Parameters

| Name       | Type     | Description                        |
| ---------- | -------- | ---------------------------------- |
| `id`       | `string` | The ID of the image to update      |
| `filePath` | `string` | Path to the new image file on disk |

---

### Example

```ts
const updatedImageRecord = await updateImageFromFile(
  imageId,
  './images/new-logo.png',
)
if (!updatedImageRecord) {
  // Image not found
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Reads a buffer from a file and updates the image with the given ID
 * Optionally, a directory prefix can be specified
 */
export const updateImageFromFile = async (
  id: string,
  filePath: string,
): Promise<ImageRecord | null> => {
  return handleErrorAsync(async () => {
    // Read file content into a Buffer
    const buffer = await diskToBuffer(filePath)

    // Overwrite existing image with new buffer
    return await updateImage(id, buffer)
  })
}
```

---

## `deleteImage`

Deletes both the encrypted image file and its metadata record for the specified image `id`.

Returns `true` if at least one of them was successfully deleted.

---

### Description

```ts
export const deleteImage = (
  id: string
): Promise<boolean | null>
```

---

### Parameters

| Name | Type     | Description                 |
| ---- | -------- | --------------------------- |
| `id` | `string` | The unique ID of the image. |

---

### Example

```ts
const success = await deleteImage(imageId)

if (success) {
  console.log('Image deleted.')
} else {
  console.log('Image not found.')
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Deletes the image file and corresponding database record for the given ID
 * Returns true if at least one of them was deleted
 */
export const deleteImage = (id: string): Promise<boolean | null> => {
  return handleErrorAsync(async () => {
    let deleted = false

    // Delete the image file if it exists
    if (await imageFileExists(id)) {
      await deleteImageFile(id)
      deleted = true
    }

    // Delete the metadata record if it exists
    if (imageRecordExists(id)) {
      deleteImageRecord(id)
      deleted = true
    }

    return deleted
  })
}
```

---

## `imageExists`

Checks whether the image with the given `id` exists on disk or in the metadata database.

This can be used to verify if an image is still present in storage. Useful for debugging, logging, or conditional logic.

---

### Description

```ts
export const imageExists = (
  id: string
): Promise<boolean | null>
```

---

### Parameters

| Name | Type     | Description                 |
| ---- | -------- | --------------------------- |
| `id` | `string` | The unique ID of the image. |

---

### Example

```ts
if (await imageExists(imageId)) {
  console.log('Image is available')
} else {
  console.log('Image not found')
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Checks whether the image exists either on disk or in the database
 */
export const imageExists = async (id: string): Promise<boolean | null> => {
  return handleErrorAsync(async () => {
    // Returns true if image file or metadata record exists
    return (await imageFileExists(id)) || imageRecordExists(id)
  })
}
```

---

📄 Source: [`src/backend/image-service.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/image-service.ts)
