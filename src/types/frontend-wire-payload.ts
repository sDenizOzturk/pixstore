import { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface FrontendWirePayload {
  encrypted: Uint8Array
  meta: ImageDecryptionMeta
  token: number
}
