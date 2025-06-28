import type { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface EncryptedImagePayload {
  encrypted: ArrayBuffer
  meta: ImageDecryptionMeta
}
