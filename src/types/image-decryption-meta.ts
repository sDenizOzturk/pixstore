// Metadata required to decrypt an encrypted image
export interface ImageDecryptionMeta {
  key: string // Base64-encoded AES-GCM encryption key
  iv: string // Initialization vector (IV) for AES-GCM, base64-encoded
  tag: string // Authentication tag for AES-GCM, base64-encoded
}
