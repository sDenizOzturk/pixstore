import {
  saveImageFile,
  deleteImageFile,
  diskToBuffer,
  readImageFile,
  imageFileExists,
} from './file-storage'
import {
  deleteImageRecord,
  imageRecordExists,
  readImageRecord,
  writeImageRecord,
} from './database'
import { createUniqueId } from './unique-id'
import type { BackendImageRecord } from '../shared/models/backend-image-record'
import { ImagePayload } from '../shared/models/image-payload'
import { getImageFormat } from './format-image'

/**
 * Reads the image buffer from disk and returns it along with the DB token.
 * Throws if the image or database record is not found.
 */
export const getImage = async (id: string): Promise<ImagePayload> => {
  const record = readImageRecord(id)
  if (!record) throw new Error(`Image record not found: ${id}`)

  const buffer = await readImageFile(id)
  const imageFormat = getImageFormat(buffer)
  const token = record.token

  return { buffer, imageFormat, token }
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
  await saveImageFile(id, buffer)
  try {
    return writeImageRecord(id)
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
