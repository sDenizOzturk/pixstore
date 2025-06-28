/**
 * Indicates test environment based on NODE_ENV.
 */
export const IS_TEST = process.env.NODE_ENV === 'test'

/**
 * Default image formats supported by Pixstore.
 */
export const DEFAULT_IMAGE_FORMATS = ['png', 'webp', 'jpg', 'jpeg'] as const

/**
 * Algorithm string for Node.js crypto (AES-256 in GCM mode, required format for createCipheriv).
 */
export const BACKEND_AES_ALGORITHM = 'aes-256-gcm'

/**
 * Algorithm name for Web Crypto API (AES-GCM, used with window.crypto.subtle).
 */
export const FRONTEND_AES_ALGORITHM = 'AES-GCM'

/**
 * Key size for AES-256 (in bytes, 32 bytes = 256 bits)
 */
export const AES_KEY_SIZE = 32

/**
 * IV size for AES-GCM (in bytes, 12 bytes = 96 bits, standard for GCM)
 */
export const AES_IV_SIZE = 12

/**
 * Authentication tag length for AES-GCM (in bits, standard is 128)
 */
export const AES_GCM_TAG_LENGTH = 128
