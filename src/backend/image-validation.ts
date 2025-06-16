import { IMAGE_FORMAT, IMAGE_FORMATS } from '../constants'
import sharp from 'sharp'
import imageType from 'image-type'

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
 * Checks if the buffer matches the configured target image format (e.g. webp).
 */
export const isValidFormat = (buffer: Buffer): boolean => {
  const type = imageType(buffer)
  return !!type && type.ext === IMAGE_FORMAT
}

/**
 * Converts the given buffer to the configured target image format.
 * Returns a new buffer in the desired format.
 */
export const convertImage = async (buffer: Buffer): Promise<Buffer> => {
  const data = await sharp(buffer).toFormat(IMAGE_FORMAT).toBuffer()
  return data
}
