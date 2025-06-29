import { ImageFormat } from '../types/image-format.js'
import { pixstoreConfig } from './pixstore-config.js'

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
