import { saveImageFile, deleteImageFile, diskToBuffer } from './file-storage'
import { imageRecordExists, writeImageRecord } from './database'
import { createUniqueId } from './id'
import type { ImageRecord } from '../shared/models/image-record'

/**
 * Writes an image buffer to disk and updates or creates its database record.
 * If writing to the database fails, the file is deleted to maintain consistency.
 */
const writeImage = async (
  id: string,
  buffer: Buffer,
  dir?: string,
): Promise<ImageRecord> => {
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
): Promise<ImageRecord> => {
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
): Promise<ImageRecord> => {
  const buffer = diskToBuffer(filePath)
  return saveImage(buffer, dir)
}

/**
 * Updates an existing image by overwriting the file and refreshing the database record.
 * Optionally, a directory prefix can be specified.
 */
export const updateImage = async (
  id: string,
  buffer: Buffer,
  dir?: string,
): Promise<ImageRecord> => {
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
): Promise<ImageRecord> => {
  const buffer = diskToBuffer(filePath)
  return updateImage(id, buffer, dir)
}
