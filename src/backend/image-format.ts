import {
  BYTE_TO_IMAGE_FORMAT,
  IMAGE_FORMATS,
  IMAGE_FORMAT_TO_BYTE,
} from '../constants'
import imageType from 'image-type'
import { ImageFormat } from '../shared/models/image-format'

// Build mapping tables once on module load.
IMAGE_FORMATS.forEach((imageFormat: ImageFormat, imageID: number) => {
  // 0 is reserved for unknown/invalid, so use (imageID + 1)
  IMAGE_FORMAT_TO_BYTE.set(imageFormat, imageID + 1)
  BYTE_TO_IMAGE_FORMAT.set(imageID + 1, imageFormat)
})

/**
 * Converts an ImageFormat string (e.g., 'jpeg', 'png') to its protocol byte value.
 * Returns 0 for unknown/unsupported formats.
 */
export const imageFormatToByte = (format: ImageFormat): number => {
  return IMAGE_FORMAT_TO_BYTE.get(format) ?? 0
}

/**
 * Converts a protocol byte value to the corresponding ImageFormat string.
 * Returns the first entry of IMAGE_FORMATS as fallback if the byte is invalid.
 */
export const byteToImageFormat = (byte: number): ImageFormat => {
  return BYTE_TO_IMAGE_FORMAT.get(byte) ?? IMAGE_FORMATS[0]
}

/**
 * Checks if the given buffer is a valid image of supported type.
 */
export const isValidImage = (buffer: Buffer): boolean => {
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
  const type = imageType(buffer)
  if (!type || !IMAGE_FORMATS.includes(type.ext as ImageFormat)) {
    throw new Error('Unsupported or invalid image format')
  }
  return type.ext as ImageFormat
}
