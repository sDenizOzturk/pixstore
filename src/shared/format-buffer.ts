/**
 * Converts a base64-encoded string to an ArrayBuffer.
 */
export const base64ToArrayBuffer = (base64: string): ArrayBuffer =>
  Uint8Array.from(atob(base64), (c) => c.charCodeAt(0)).buffer

/**
 * Converts an ArrayBuffer or Uint8Array to a standard base64-encoded string.
 */
export const arrayBufferToBase64 = (
  buffer: ArrayBuffer | Uint8Array,
): string => {
  const arr = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer)
  return btoa(String.fromCharCode(...arr))
}
