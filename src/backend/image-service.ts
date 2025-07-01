import {
  saveImageFile,
  deleteImageFile,
  diskToBuffer,
  readImageFile,
  imageFileExists,
} from './file-storage.js'
import {
  deleteImageRecord,
  imageRecordExists,
  readImageRecord,
  writeImageRecord,
} from './database.js'
import { createUniqueId } from './unique-id.js'
import type { ImageRecord } from '../types/image-record.js'
import { encryptImage } from './image-encryption.js'
import { BackendWirePayload } from '../types/wire-payload.js'

/**
 * Retrieves the encrypted image payload (wire format) for the given image ID.
 *
 * Reads the encrypted image buffer from disk and fetches its metadata and token from the database.
 * Throws an error if the image record is not found.
 *
 * Returns a BackendWirePayload containing:
 * - encrypted: the encrypted image data as a Buffer,
 * - meta: encryption metadata (key, iv, tag),
 * - token: the current version token for cache validation.
 */
export const getWirePayload = async (
  id: string,
): Promise<BackendWirePayload> => {
  const record = readImageRecord(id)
  if (!record) throw new Error(`Image record not found: ${id}`)

  const encrypted = await readImageFile(id)
  const { token, meta } = record

  return { encrypted, meta, token }
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

/**
 * Saves an image buffer to disk and creates a corresponding database record.
 * If writing to the database fails, the saved file is deleted to maintain consistency.
 */
export const saveImage = async (
  buffer: Buffer,
  dir?: string,
): Promise<ImageRecord> => {
  // Generate a unique ID for this image, optionally scoped by dir
  const id = createUniqueId(dir)

  // Write the encrypted image and metadata
  return await writeImage(id, buffer, dir)
}

/**
 * Reads an image file from disk and saves it as a new image
 * This is a convenience wrapper around saveImage()
 */
export const saveImageFromFile = async (
  filePath: string,
  dir?: string,
): Promise<ImageRecord> => {
  // Read file content into a Buffer
  const buffer = await diskToBuffer(filePath)

  // Save buffer as encrypted image
  return await saveImage(buffer, dir)
}

/**
 * Updates an existing image by overwriting the file and refreshing the database record
 * Optionally, a directory prefix can be specified
 */
export const updateImage = async (
  id: string,
  buffer: Buffer,
): Promise<ImageRecord> => {
  // Check if image exists in the database
  if (!imageRecordExists(id)) {
    throw new Error(`Image not found: ${id}`)
  }

  // Overwrite image and update its metadata
  return await writeImage(id, buffer)
}

/**
 * Reads a buffer from a file and updates the image with the given ID
 * Optionally, a directory prefix can be specified
 */
export const updateImageFromFile = async (
  id: string,
  filePath: string,
): Promise<ImageRecord> => {
  // Read file content into a Buffer
  const buffer = await diskToBuffer(filePath)

  // Overwrite existing image with new buffer
  return await updateImage(id, buffer)
}

/**
 * Deletes the image file and corresponding database record for the given ID
 * Returns true if at least one of them was deleted
 */
export const deleteImage = async (id: string): Promise<boolean> => {
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
}

/**
 * Returns the image record (id + token) from the database
 * Returns null if not found
 */
export const getImageRecord = (id: string): ImageRecord | null => {
  // Reads imageRecord from database (includes id, token, and meta fields)
  return readImageRecord(id)
}

/**
 * Checks whether the image exists either on disk or in the database
 */
export const imageExists = async (id: string): Promise<boolean> => {
  // Returns true if image file or metadata record exists
  return (await imageFileExists(id)) || imageRecordExists(id)
}
