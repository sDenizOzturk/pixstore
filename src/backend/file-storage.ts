import fs from 'fs'
import path from 'path'
import { toFilePath } from './id'
import { convertImage, isValidFormat, isValidImage } from './image-validation'

/**
 * Saves the image buffer to disk at the canonical file path for the given id.
 */
export const saveImageFile = async (
  id: string,
  data: Buffer,
): Promise<void> => {
  if (!isValidImage(data)) {
    throw new Error('Invalid image format')
  }
  const convertedImage = await convertImage(data)
  const filepath = toFilePath(id)
  const dir = path.dirname(filepath)
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true })
  }
  fs.writeFileSync(filepath, convertedImage)
}

/**
 * Reads the image file for the given id and returns it as a buffer.
 */
export const readImageFile = (id: string): Buffer => {
  const filepath = toFilePath(id)
  const buffer = fs.readFileSync(filepath)
  if (!isValidFormat(buffer)) {
    throw new Error('Invalid image file')
  }
  return buffer
}

/**
 * Deletes the image file for the given id.
 */
export const deleteImageFile = (id: string): void => {
  const filepath = toFilePath(id)
  if (fs.existsSync(filepath)) {
    fs.rmSync(filepath)
  }
}

/**
 * Reads the file at the given path and returns its contents as a Buffer.
 */
export const diskToBuffer = (filepath: string): Buffer => {
  const buffer = fs.readFileSync(filepath)
  if (!isValidImage(buffer)) {
    throw new Error('Invalid image file')
  }
  return buffer
}

/**
 * Checks if the image file exists on disk for the given ID.
 */
export const imageFileExists = (id: string): boolean => {
  const filepath = toFilePath(id)
  return fs.existsSync(filepath)
}
