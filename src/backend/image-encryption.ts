import { randomBytes, createCipheriv } from 'crypto'
import type { EncryptedImageResult } from '../types/encrypted-image-result.js'
import {
  AES_KEY_SIZE,
  AES_IV_SIZE,
  BACKEND_AES_ALGORITHM,
} from '../shared/constants.js'

/**
 * Generates a random AES key for per-image encryption.
 */
const generateKey = (): Buffer => {
  return randomBytes(AES_KEY_SIZE)
}

/**
 * Generates a random IV for AES-GCM encryption.
 */
const generateIV = (): Buffer => {
  return randomBytes(AES_IV_SIZE)
}

/**
 * Encrypts plaintext with AES-256-GCM.
 * Returns encrypted data, IV, and authentication tag.
 */
const encrypt = (
  plaintext: Buffer,
  key: Buffer,
): { encrypted: Buffer; iv: Buffer; tag: Buffer } => {
  const iv = generateIV()
  const cipher = createCipheriv(BACKEND_AES_ALGORITHM, key, iv)
  const encrypted = Buffer.concat([cipher.update(plaintext), cipher.final()])
  const tag = cipher.getAuthTag()
  return { encrypted, iv, tag }
}

/**
 * Encrypts [format][buffer] for an image.
 * Returns the encrypted image and all encryption metadata.
 */
export const encryptImage = (
  format: number,
  buffer: Buffer,
): EncryptedImageResult => {
  const key = generateKey()
  const plaintext = Buffer.concat([Buffer.from([format]), buffer])
  const { encrypted, iv, tag } = encrypt(plaintext, key)
  return {
    encryptedImage: encrypted,
    imageEncryptionMeta: { key, iv, tag },
  }
}
