/**
 * Custom error class for all expected Pixstore errors.
 * Used to distinguish between handled Pixstore errors and unexpected bugs.
 */
export class PixstoreError extends Error {
  // Constructor for the PixstoreError class
  constructor(message: string) {
    super(message) // Call the base Error constructor with the message
    this.name = 'PixstoreError' // Set a distinct name for identification
  }
}
