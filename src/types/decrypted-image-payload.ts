import { ImageFormat } from './image-format.js'

export interface DecryptedImagePayload {
  format: ImageFormat
  buffer: Uint8Array
}
