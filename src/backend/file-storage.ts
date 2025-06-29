import * as fs from 'fs/promises'
import path from 'path'
import { toFilePath } from './unique-id.js'
import { isValidImage } from './format-image.js'

/**
 * Saves the image buffer to disk at the canonical file path for the given id.
 */
export const saveImageFile = async (
  id: string,
  data: Buffer,
): Promise<void> => {
  const filepath = toFilePath(id)
  const dir = path.dirname(filepath)

  // Ensure directory exists (fs.mkdir from fs/promises supports recursive)
  await fs.mkdir(dir, { recursive: true })

  // Write file asynchronously
  await fs.writeFile(filepath, data)
}

/**
 * Reads the image file for the given id and returns it as a buffer.
 */
export const readImageFile = async (id: string): Promise<Buffer> => {
  const filepath = toFilePath(id)
  const buffer = await fs.readFile(filepath)
  return buffer
}

/**
 * Deletes the image file for the given id.
 */
export const deleteImageFile = async (id: string): Promise<void> => {
  const filepath = toFilePath(id)
  try {
    await fs.rm(filepath)
  } catch (err: any) {
    if (err.code !== 'ENOENT') {
      throw err
    }
    // If file doesn't exist, ignore
  }
}

/**
 * Reads the file at the given path and returns its contents as a Buffer.
 */
export const diskToBuffer = async (filepath: string): Promise<Buffer> => {
  const buffer = await fs.readFile(filepath)
  if (!isValidImage(buffer)) {
    throw new Error('Invalid image file')
  }
  return buffer
}

/**
 * Checks if the image file exists on disk for the given ID.
 */
export const imageFileExists = async (id: string): Promise<boolean> => {
  const filepath = toFilePath(id)
  try {
    await fs.access(filepath)
    return true
  } catch {
    return false
  }
}
