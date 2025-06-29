import { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface BackendWirePayload {
  encrypted: Buffer
  meta: ImageDecryptionMeta
  token: number
}
