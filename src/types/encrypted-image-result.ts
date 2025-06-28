import { ImageEncryptionMeta } from './image-encryption-meta.ts'

export interface EncryptedImageResult {
  encryptedImage: Buffer
  imageEncryptionMeta: ImageEncryptionMeta
}
