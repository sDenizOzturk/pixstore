import type { BackendWirePayload } from '../types/backend-wire-payload.js'
import type { FrontendWirePayload } from '../types/frontend-wire-payload.js'
import {
  AES_KEY_SIZE,
  AES_IV_SIZE,
  AES_GCM_TAG_LENGTH, // in bits
} from '../shared/constants.js'
import { ImageDecryptionMeta } from '../types/image-decryption-meta.js'

const TAG_SIZE_BYTES = AES_GCM_TAG_LENGTH / 8

/**
 * Encodes a BackendWirePayload into a binary Uint8Array.
 * Layout: [token (8 bytes, LE)] [key (32 bytes)] [iv (12 bytes)]
 *         [tag (16 bytes)] [encrypted image buffer]
 */
export const encodeWirePayload = (payload: BackendWirePayload): Uint8Array => {
  const { token, meta, encrypted } = payload

  // Token as 8 bytes (LE)
  const tokenBuf = new ArrayBuffer(8)
  new DataView(tokenBuf).setBigUint64(0, BigInt(token), true)

  // Total length in bytes
  const total =
    8 + AES_KEY_SIZE + AES_IV_SIZE + TAG_SIZE_BYTES + encrypted.byteLength
  const result = new Uint8Array(total)

  let offset = 0
  result.set(new Uint8Array(tokenBuf), offset)
  offset += 8

  result.set(new Uint8Array(meta.key), offset)
  offset += AES_KEY_SIZE

  result.set(new Uint8Array(meta.iv), offset)
  offset += AES_IV_SIZE

  result.set(new Uint8Array(meta.tag), offset)
  offset += TAG_SIZE_BYTES

  result.set(new Uint8Array(encrypted), offset)
  return result
}

/**
 * Decodes a Uint8Array into a FrontendWirePayload.
 * Expects the same layout as above.
 */
export const decodeWirePayload = (data: Uint8Array): FrontendWirePayload => {
  let offset = 0

  // 1) token
  const token = Number(
    new DataView(data.buffer, data.byteOffset + offset, 8).getBigUint64(
      0,
      true,
    ),
  )
  offset += 8

  // 2) key
  const keySlice = data.subarray(offset, offset + AES_KEY_SIZE)
  const key = keySlice.buffer.slice(
    keySlice.byteOffset,
    keySlice.byteOffset + keySlice.byteLength,
  ) as ArrayBuffer
  offset += AES_KEY_SIZE

  // 3) iv
  const ivSlice = data.subarray(offset, offset + AES_IV_SIZE)
  const iv = ivSlice.buffer.slice(
    ivSlice.byteOffset,
    ivSlice.byteOffset + ivSlice.byteLength,
  ) as ArrayBuffer
  offset += AES_IV_SIZE

  // 4) tag
  const tagSlice = data.subarray(offset, offset + TAG_SIZE_BYTES)
  const tag = tagSlice.buffer.slice(
    tagSlice.byteOffset,
    tagSlice.byteOffset + tagSlice.byteLength,
  ) as ArrayBuffer
  offset += TAG_SIZE_BYTES

  // 5) encrypted buffer
  const encrypted = data.subarray(offset)

  const meta: ImageDecryptionMeta = { key, iv, tag }
  return { token, meta, encrypted }
}
