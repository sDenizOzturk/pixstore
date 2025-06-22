import type { ImageFormat } from './image-format.js'

export interface ImagePayload {
  buffer: Uint8Array
  token: number
  imageFormat: ImageFormat
}
