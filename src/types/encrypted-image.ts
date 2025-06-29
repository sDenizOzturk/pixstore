import { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface EncryptedImage {
  encrypted: Buffer
  meta: ImageDecryptionMeta
}
