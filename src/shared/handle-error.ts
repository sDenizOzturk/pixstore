import { pixstoreConfig } from './pixstore-config.js'
import type { CustomErrorHandler } from '../types/custom-error-handler.js'
import { PixstoreError } from './pixstore-error.js'

/**
 * Handles synchronous errors for Pixstore API functions using centralized error handling logic.
 * See handleCatch() for details.
 */
export function handleErrorSync<T>(callback: () => T): T | null {
  try {
    // Execute the synchronous callback
    return callback()
  } catch (error) {
    // Delegate error processing to the centralized handler
    return handleCatch(error)
  }
}

/**
 * Handles asynchronous errors for Pixstore API functions using centralized error handling logic.
 * See handleCatch() for details.
 */
export async function handleErrorAsync<T>(
  callback: () => Promise<T>,
): Promise<T | null> {
  try {
    // Execute the async callback
    return await callback()
  } catch (error) {
    // Delegate error processing to the centralized handler
    return handleCatch(error)
  }
}

/**
 * Centralized error handler for all Pixstore API functions.
 * Modes:
 * - 'hybrid': Logs PixstoreError and returns null; throws all other errors (default).
 * - 'warn': Logs any error and returns null.
 * - 'silent': Ignores any error and returns null.
 * - 'custom': Calls a user-provided error handler and returns null.
 * - 'throw': Throws all errors.
 */
const handleCatch = (error: unknown) => {
  // Read the current error handling mode from config
  const ERROR_HANDLING_MODE = pixstoreConfig.errorHandlingMode

  // 'hybrid': Only handle PixstoreError softly, throw all other errors
  if (ERROR_HANDLING_MODE === 'hybrid') {
    if (error instanceof PixstoreError) {
      // Log PixstoreError as warning and return null
      console.warn(error)
      return null
    } else {
      // For all non-Pixstore errors, always throw
      throw error
    }
  }

  // 'warn': Log any error and return null (soft-fail)
  else if (ERROR_HANDLING_MODE === 'warn') {
    console.warn(error)
    return null
  }

  // 'silent': Ignore any error and return null
  else if (ERROR_HANDLING_MODE === 'silent') {
    return null
  }

  // 'custom': Call user-provided error handler if set, else throw
  else if (ERROR_HANDLING_MODE === 'custom') {
    if (customErrorHandler) {
      customErrorHandler(error)
      return null
    }
    // No custom handler set: this is a critical config error
    throw new Error('Custom error handler is not set')
  }

  // 'throw' (default) or unknown: Always throw the error
  throw error
}

/**
 * Stores the current Pixstore custom error handler function.
 * Used when errorHandlingMode is set to 'custom'.
 */
let customErrorHandler: CustomErrorHandler | undefined

/**
 * Registers a custom error handler for Pixstore error handling.
 * Used only if errorHandlingMode is set to 'custom'.
 */
export const setCustomErrorHandler = (
  newErrorHandler: CustomErrorHandler | undefined,
) => {
  // Store the user-provided error handler for centralized error processing
  customErrorHandler = newErrorHandler
}
