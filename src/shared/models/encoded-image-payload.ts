import { ImageFormat } from './image-format'

export interface EncodedImagePayload {
  buffer: Uint8Array
  token: number
  imageFormat: ImageFormat
}
