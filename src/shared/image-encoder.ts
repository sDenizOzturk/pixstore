import { byteToImageFormat, imageFormatToByte } from '../backend/image-format'

import { EncodedImagePayload } from './models/encoded-image-payload'

/**
 * Encodes an EncodedImagePayload into a binary Uint8Array.
 * Layout: [format (1 byte)] [token (8 bytes, LE)] [buffer]
 */
export const encodeImagePayload = (
  payload: EncodedImagePayload,
): Uint8Array => {
  const { imageFormat, token, buffer } = payload

  // Encode image format as 1 byte
  const formatByte = imageFormatToByte(imageFormat)
  // Token as 8 bytes (Little Endian)
  const tokenBuffer = new ArrayBuffer(8)
  new DataView(tokenBuffer).setBigUint64(0, BigInt(token), true)

  // Output: format (1 byte) + token (8 bytes) + buffer
  const result = new Uint8Array(1 + 8 + buffer.length)
  result[0] = formatByte
  result.set(new Uint8Array(tokenBuffer), 1)
  result.set(buffer, 9)

  return result
}

/**
 * Decodes a Uint8Array into an EncodedImagePayload.
 * Expects: [format (1 byte)] [token (8 bytes, LE)] [buffer]
 */
export const decodeImagePayload = (data: Uint8Array): EncodedImagePayload => {
  const formatByte = data[0]
  const imageFormat = byteToImageFormat(formatByte)
  const token = Number(
    new DataView(data.buffer, data.byteOffset + 1, 8).getBigUint64(0, true),
  )
  const buffer = data.slice(9)
  return { imageFormat, token, buffer }
}
