import type { ImageFormat } from './image-format.js'

export interface WirePayload {
  buffer: Uint8Array
  token: number
  imageFormat: ImageFormat
}
