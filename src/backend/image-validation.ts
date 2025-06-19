import { IMAGE_FORMATS } from '../constants'
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
