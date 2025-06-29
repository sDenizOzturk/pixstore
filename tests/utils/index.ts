/**
 * Simple async sleep for tests.
 * Usage: await sleep(10)
 */
export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

/**
 * Converts a Buffer or Uint8Array to a native ArrayBuffer representing the same bytes.
 * Ensures compatibility when passing binary data between Node.js and browser APIs.
 */
export const toArrayBuffer = (b: Buffer | Uint8Array): ArrayBuffer =>
  b.buffer.slice(b.byteOffset, b.byteOffset + b.byteLength) as ArrayBuffer
