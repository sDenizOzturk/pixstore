import { pixstoreConfig } from '../shared/pixstore-config.js'
import imageType from 'image-type'
import type { ImageFormat } from '../types/image-format.js'

/**
 * Converts an ImageFormat string (e.g., 'jpeg', 'png') to its protocol byte value.
 * Returns 0 for unknown/unsupported formats.
 */
export const imageFormatToByte = (format: ImageFormat): number => {
  const IMAGE_FORMAT_TO_BYTE = pixstoreConfig.imageFormatToByte
  const byte = IMAGE_FORMAT_TO_BYTE.get(format)
  if (byte === undefined) {
    throw new Error(`Unsupported image format: ${format}`)
  }
  return byte
}

/**
 * Converts a protocol byte value to the corresponding ImageFormat string.
 * Returns the first entry of IMAGE_FORMATS as fallback if the byte is invalid.
 */
export const byteToImageFormat = (byte: number): ImageFormat => {
  const BYTE_TO_IMAGE_FORMAT = pixstoreConfig.byteToImageFormat
  const format = BYTE_TO_IMAGE_FORMAT.get(byte)
  if (format === undefined) {
    throw new Error(`Unknown image format byte: ${byte}`)
  }
  return format
}
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
