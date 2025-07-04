import crypto from 'crypto'
import { STATELESS_KEY_LENGTH } from '../shared/constants.js'
import { pixstoreConfig } from '../shared/pixstore-config.js'

/**
 * Random, per-process salt for stateless proof generation.
 * Never exported or persisted, created fresh on every server start.
 * If this value is leaked, stateless proof security is broken.
 */
const SERVER_SALT = crypto.randomBytes(32)

/**
 * Stateless proof generator.
 * Returns a deterministic N-byte proof for a given image ID and time window,
 * using the per-process salt.
 */
const createProof = (window: number | null, imageId: string): string => {
  const hash = window
    ? crypto
        .createHash('sha256')
        .update(imageId)
        .update(SERVER_SALT)
        .update(window.toString())
        .digest()
    : crypto.createHash('sha256').update(imageId).update(SERVER_SALT).digest()
  // Only the first N bytes are used as proof, defined in config/constants.
  return hash.subarray(0, STATELESS_KEY_LENGTH).toString('base64')
}

/**
 * Returns the current window's stateless proof for the given image ID.
 * Used to validate access for the current time slot.
 */
export const getCurrentStatelessProof = (imageId: string): string => {
  const STATELESS_KEY_WINDOW_LENGTH = pixstoreConfig.statelessKeyWindowLength
  if (STATELESS_KEY_WINDOW_LENGTH === -1) return createProof(null, imageId)

  const window = Math.floor(Date.now() / STATELESS_KEY_WINDOW_LENGTH)
  return createProof(window, imageId)
}

/**
 * Returns the previous window's stateless proof for the given image ID.
 * Used to allow clock drift and slow network. Two consecutive proofs are valid.
 */
export const getPreviousStatelessProof = (imageId: string): string => {
  const STATELESS_KEY_WINDOW_LENGTH = pixstoreConfig.statelessKeyWindowLength
  if (STATELESS_KEY_WINDOW_LENGTH === -1) return createProof(null, imageId)

  const window = Math.floor(Date.now() / STATELESS_KEY_WINDOW_LENGTH)
  return createProof(window - 1, imageId)
}

/**
 * Validates a received proof against both current and previous window for a given image ID.
 * Returns true if the proof matches either; otherwise, false.
 * Accepts slight clock/network drift and ensures user experience.
 */
export const verifyStatelessProof = (
  imageId: string,
  proof: string,
): boolean => {
  const currentProof = getCurrentStatelessProof(imageId)
  if (currentProof === proof) return true

  const previousProof = getPreviousStatelessProof(imageId)
  if (previousProof === proof) return true

  return false
}
