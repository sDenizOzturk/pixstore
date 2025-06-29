import type { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface EncryptedImagePayload {
  encrypted: Uint8Array
  meta: ImageDecryptionMeta
}
