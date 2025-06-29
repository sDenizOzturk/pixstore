import type { ImageFormat } from '../types/image-format.js'
import { pixstoreConfig } from '../shared/pixstore-config.js'
import { DecryptedImagePayload } from '../types/decrypted-image-payload.js'

/**
 * Converts an image format (e.g. 'png') to the corresponding MIME type.
 * Throws if the format is not supported.
 */
const imageFormatToMime = (format: ImageFormat): string => {
  const IMAGE_FORMATS = pixstoreConfig.imageFormats
  if (!IMAGE_FORMATS.includes(format))
    throw new Error(`Unsupported image format: ${format}`)
  return `image/${format}`
}

/**
 * Converts a DecryptedImagePayload to a Blob for frontend usage.
 */
export const decryptedPayloadToBlob = (
  payload: DecryptedImagePayload,
): Blob => {
  const mime = imageFormatToMime(payload.format)
  return new Blob([payload.buffer.buffer as ArrayBuffer], { type: mime })
}
