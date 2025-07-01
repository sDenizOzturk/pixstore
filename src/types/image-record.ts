import type { ImageDecryptionMeta } from './image-decryption-meta.js'

// Reference object representing an image in Pixstore
export interface ImageRecord {
  id: string // Unique ID used to locate and identify the image
  token: number // Used for cache validation and version control
  meta: ImageDecryptionMeta // Metadata required to decrypt the image
}
