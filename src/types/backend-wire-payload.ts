import { ImageEncryptionMeta } from './image-encryption-meta.js'

export interface BackendWirePayload {
  encrypted: Buffer
  meta: ImageEncryptionMeta
  token: number
}
