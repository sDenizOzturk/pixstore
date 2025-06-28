/**
 * Indicates test environment based on NODE_ENV.
 */
export const IS_TEST = process.env.NODE_ENV === 'test'

/**
 * Default image formats supported by Pixstore.
 */
export const DEFAULT_IMAGE_FORMATS = ['png', 'webp', 'jpg', 'jpeg'] as const

/**
 * AES algorithm used for image encryption (AES-256 in GCM mode)
 */
export const AES_ALGORITHM = 'aes-256-gcm'

/**
 * Key size for AES-256 (in bytes, 32 bytes = 256 bits)
 */
export const AES_KEY_SIZE = 32

/**
 * IV size for AES-GCM (in bytes, 12 bytes = 96 bits, standard for GCM)
 */
export const AES_IV_SIZE = 12
