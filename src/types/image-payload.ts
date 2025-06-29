import { ImageFormat } from './image-format.js'
import { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface DecryptedImagePayload {
  format: ImageFormat
  buffer: Uint8Array
}

export interface EncryptedImagePayload {
  encrypted: Buffer
  meta: ImageDecryptionMeta
}
