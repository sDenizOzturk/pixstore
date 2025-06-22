import { ImageFormat } from './image-format'

export interface ImagePayload {
  buffer: Uint8Array
  token: number
  imageFormat: ImageFormat
}
