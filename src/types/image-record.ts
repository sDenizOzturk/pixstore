import type { ImageDecryptionMeta } from './image-decryption-meta.js'

// Reference object representing an image in Pixstore
export interface ImageRecord {
  id: string // Unique ID used to locate and identify the image
  token: number // Used for cache validation and version control
  meta: ImageDecryptionMeta // Metadata required to decrypt the image
  statelessProof: string // Stateless time-based proof-of-access hash for endpoint authorization
}

/** Used only for backend (disk/db/cache) */
export interface DBImageRecord {
  id: string
  token: number
  meta: ImageDecryptionMeta
}
