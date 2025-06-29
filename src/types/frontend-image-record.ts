import type { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface FrontendImageRecord {
  id: string
  token: number
  meta: ImageDecryptionMeta
}
