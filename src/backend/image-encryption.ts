import { randomBytes, createCipheriv } from 'crypto'
import type { EncryptedImage } from '../types/encrypted-image.js'
import {
  AES_KEY_SIZE,
  AES_IV_SIZE,
  BACKEND_AES_ALGORITHM,
} from '../shared/constants.js'
import { getImageFormat, isValidImage } from './format-image.js'
import { imageFormatToByte } from '../shared/format-image.js'

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
export const encryptImage = (buffer: Buffer): EncryptedImage => {
  if (!isValidImage(buffer)) {
    throw new Error('Invalid image file')
  }
  const format = getImageFormat(buffer)

  const key = generateKey()
  const formatBuffer = Buffer.from([imageFormatToByte(format)])
  const plaintext = Buffer.concat([formatBuffer, Buffer.from(buffer)])
  const { encrypted, iv, tag } = encrypt(plaintext, key)
  return {
    encrypted,
    meta: { key, iv, tag },
  }
}
