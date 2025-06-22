import { decodeImagePayload } from '../shared/image-encoder.js'
import type { FrontendImageRecord } from '../models/frontend-image-record.js'
import type { ImageFormat } from '../models/image-format.js'
import { pixstoreConfig } from '../shared/pixstore-config.js'

const IMAGE_FORMATS = pixstoreConfig.imageFormats
/**
 * Converts an image format (e.g. 'png') to the corresponding MIME type.
 * Throws if the format is not supported.
 */
const imageFormatToMime = (format: ImageFormat): string => {
  if (!IMAGE_FORMATS.includes(format))
    throw new Error(`Unsupported image format: ${format}`)
  return `image/${format}`
}

/**
 * Converts a wire-encoded image payload to a FrontendImageRecord.
 * Decodes payload, determines MIME type, and creates a Blob for browser use.
 */
export const formatEncodedImage = (
  id: string,
  encoded: Uint8Array,
): FrontendImageRecord => {
  const { buffer, token, imageFormat } = decodeImagePayload(encoded)
  const mime = imageFormatToMime(imageFormat)
  const data = new Blob([new Uint8Array(buffer)], { type: mime })
  return {
    id,
    data,
    token,
    lastUsed: Date.now(),
  }
}
