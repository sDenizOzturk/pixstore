import type { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface ImageRecord {
  id: string
  token: number
  meta: ImageDecryptionMeta
}
