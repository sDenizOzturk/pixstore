/**
 * Re-exports Pixstore's error handler utilities for global error tracking and customization.
 *
 * - setCustomErrorHandler: Registers a custom error handler function (frontend and backend).
 * - getLastPixstoreError: Returns the most recent PixstoreError for debugging/logging.
 *
 * Import from 'pixstore/shared' to manage or observe Pixstore errors throughout your application.
 */
export { setCustomErrorHandler, getLastPixstoreError } from './handle-error.js'
