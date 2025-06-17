import { EncodedImagePayload } from './models/encoded-image-payload'

/**
 * Encodes an EncodedImagePayload into a binary Uint8Array.
 * Layout: [token (8 bytes, LE)] [buffer]
 */
export function encodeImagePayload(payload: EncodedImagePayload): Uint8Array {
  const { token, buffer } = payload

  // Token as 8 bytes (Little Endian)
  const tokenBuffer = new ArrayBuffer(8)
  new DataView(tokenBuffer).setBigUint64(0, BigInt(token), true)

  // Output: token (8 bytes) + buffer
  const result = new Uint8Array(8 + buffer.length)
  result.set(new Uint8Array(tokenBuffer), 0)
  result.set(buffer, 8)

  return result
}

/**
 * Decodes a Uint8Array into an EncodedImagePayload.
 */
export function decodeImagePayload(data: Uint8Array): EncodedImagePayload {
  const token = Number(
    new DataView(data.buffer, data.byteOffset, data.byteLength).getBigUint64(
      0,
      true,
    ),
  )
  const buffer = data.slice(8)
  return { token, buffer }
}
