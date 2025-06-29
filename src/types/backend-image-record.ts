import type { ImageEncryptionMeta } from './image-encryption-meta.js'

export interface BackendImageRecord {
  id: string
  token: number
  meta: ImageEncryptionMeta
}
