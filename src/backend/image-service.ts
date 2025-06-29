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
import type { BackendImageRecord } from '../types/backend-image-record.js'
import { encryptImage } from './image-encryption.js'
import { BackendWirePayload } from '../types/backend-wire-payload.js'

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
): Promise<BackendImageRecord> => {
  const { encrypted, meta } = encryptImage(buffer)
  await saveImageFile(id, encrypted)
  try {
    return writeImageRecord(id, meta)
  } catch (err) {
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
): Promise<BackendImageRecord> => {
  const id = createUniqueId(dir)
  return await writeImage(id, buffer, dir)
}

/**
 * Reads an image file from disk and saves it as a new image.
 * This is a convenience wrapper around saveImage().
 */
export const saveImageFromFile = async (
  filePath: string,
  dir?: string,
): Promise<BackendImageRecord> => {
  const buffer = await diskToBuffer(filePath)
  return await saveImage(buffer, dir)
}

/**
 * Updates an existing image by overwriting the file and refreshing the database record.
 * Optionally, a directory prefix can be specified.
 */
export const updateImage = async (
  id: string,
  buffer: Buffer,
  dir?: string,
): Promise<BackendImageRecord> => {
  if (!imageRecordExists(id)) {
    throw new Error(`Image not found: ${id}`)
  }
  return await writeImage(id, buffer, dir)
}

/**
 * Reads a buffer from a file and updates the image with the given ID.
 * Optionally, a directory prefix can be specified.
 */
export const updateImageFromFile = async (
  id: string,
  filePath: string,
  dir?: string,
): Promise<BackendImageRecord> => {
  const buffer = await diskToBuffer(filePath)
  return await updateImage(id, buffer, dir)
}

/**
 * Deletes the image file and corresponding database record for the given ID.
 * Returns true if at least one of them was deleted.
 */
export const deleteImage = async (id: string): Promise<boolean> => {
  let deleted = false

  if (await imageFileExists(id)) {
    await deleteImageFile(id)
    deleted = true
  }

  if (imageRecordExists(id)) {
    deleteImageRecord(id)
    deleted = true
  }

  return deleted
}

/**
 * Returns the image record (id + token) from the database.
 * Returns null if not found.
 */
export const getImageRecord = (id: string): BackendImageRecord | null => {
  return readImageRecord(id)
}

/**
 * Checks whether the image exists either on disk or in the database.
 */
export const imageExists = async (id: string): Promise<boolean> => {
  return (await imageFileExists(id)) || imageRecordExists(id)
}
