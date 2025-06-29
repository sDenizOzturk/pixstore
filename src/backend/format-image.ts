import { pixstoreConfig } from '../shared/pixstore-config.js'
import imageType from 'image-type'
import type { ImageFormat } from '../types/image-format.js'

/**
 * Checks if the given buffer is a valid image of supported type.
 */
export const isValidImage = (buffer: Buffer): boolean => {
  const IMAGE_FORMATS = pixstoreConfig.imageFormats
  const type = imageType(buffer)
  return (
    !!type && IMAGE_FORMATS.includes(type.ext as (typeof IMAGE_FORMATS)[number])
  )
}

/**
 * Extracts the image format (e.g., 'jpeg', 'png') from a buffer.
 * Throws if format is missing or unsupported.
 */
export const getImageFormat = (buffer: Buffer): ImageFormat => {
  const IMAGE_FORMATS = pixstoreConfig.imageFormats
  const type = imageType(buffer)
  if (!type || !IMAGE_FORMATS.includes(type.ext as ImageFormat)) {
    throw new Error('Unsupported or invalid image format')
  }
  return type.ext as ImageFormat
}
