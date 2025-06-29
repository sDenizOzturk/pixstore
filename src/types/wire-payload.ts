import { ImageDecryptionMeta } from './image-decryption-meta.js'

export interface BackendWirePayload {
  encrypted: Buffer
  meta: ImageDecryptionMeta
  token: number
}

export interface FrontendWirePayload {
  encrypted: Uint8Array
  meta: ImageDecryptionMeta
  token: number
}
