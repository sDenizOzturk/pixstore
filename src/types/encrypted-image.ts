import { ImageEncryptionMeta } from './image-encryption-meta.js'

export interface EncryptedImage {
  encrypted: Buffer
  meta: ImageEncryptionMeta
}
