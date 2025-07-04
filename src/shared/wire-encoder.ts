import {
  WirePayloadState,
  type BackendWirePayload,
} from '../types/wire-payload.js'
import type { FrontendWirePayload } from '../types/wire-payload.js'
import {
  AES_KEY_SIZE,
  AES_IV_SIZE,
  AES_GCM_TAG_LENGTH, // in bits
} from '../shared/constants.js'
import { ImageDecryptionMeta } from '../types/image-decryption-meta.js'
import { arrayBufferToBase64, base64ToArrayBuffer } from './format-buffer.js'
import { PixstoreError } from './pixstore-error.js'

const TAG_SIZE_BYTES = AES_GCM_TAG_LENGTH / 8

/**
 * Encodes a BackendWirePayload into a binary Uint8Array.
 *
 * Wire protocol:
 *   - [state (1 byte)] [encrypted image buffer]                          // Success
 *   - [state (1 byte)] [token (8 bytes, LE)] [key (32 bytes)]            // Updated
 *     [iv (12 bytes)] [tag (16 bytes)] [encrypted image buffer]
 *   - [state (1 byte)]                                                   // All other states
 */
export const encodeWirePayload = (payload: BackendWirePayload): Uint8Array => {
  const { state } = payload

  // Validate that the state is a valid WirePayloadState
  validateState(state)

  // For non-Success and non-Updated states, encode as [state]
  if (
    state !== WirePayloadState.Success &&
    state !== WirePayloadState.Updated
  ) {
    const result = new Uint8Array(1)
    result[0] = state
    return result
  }

  // For Success state, encode as [state][encrypted]
  if (state === WirePayloadState.Success) {
    const { encrypted } = payload
    const result = new Uint8Array(1 + encrypted.byteLength)
    result[0] = state
    result.set(new Uint8Array(encrypted), 1)
    return result
  }

  // For Updated state, encode as [state][token][key][iv][tag][encrypted]
  const { token, meta, encrypted } = payload

  const keyBuf = base64ToArrayBuffer(meta.key)
  const ivBuf = base64ToArrayBuffer(meta.iv)
  const tagBuf = base64ToArrayBuffer(meta.tag)

  // Encode token as 8 bytes (LE)
  const tokenBuf = new ArrayBuffer(8)
  new DataView(tokenBuf).setBigUint64(0, BigInt(token), true)

  const totalLength =
    1 + 8 + AES_KEY_SIZE + AES_IV_SIZE + TAG_SIZE_BYTES + encrypted.byteLength

  const result = new Uint8Array(totalLength)
  let offset = 0

  result[offset++] = state
  result.set(new Uint8Array(tokenBuf), offset)
  offset += 8

  result.set(new Uint8Array(keyBuf), offset)
  offset += AES_KEY_SIZE

  result.set(new Uint8Array(ivBuf), offset)
  offset += AES_IV_SIZE

  result.set(new Uint8Array(tagBuf), offset)
  offset += TAG_SIZE_BYTES

  result.set(new Uint8Array(encrypted), offset)
  return result
}

/**
 * Decodes a binary wire payload (Uint8Array) into a FrontendWirePayload.
 * Layout:
 *   - [state (1 byte)] [encrypted image buffer]                          // Success
 *   - [state (1 byte)] [token (8 bytes, LE)] [key (32 bytes)]            // Updated
 *     [iv (12 bytes)] [tag (16 bytes)] [encrypted image buffer]
 *   - [state (1 byte)]                                                   // All other states
 */
export const decodeWirePayload = (data: Uint8Array): FrontendWirePayload => {
  let offset = 0
  const state = data[offset++]

  // Validate that the state is a valid WirePayloadState
  validateState(state)

  // If only 1 byte, just return the state (NotFound, MissingToken, etc.)
  if (data.length === 1) {
    return { state }
  }

  // Success: [state][encrypted]
  if (state === WirePayloadState.Success) {
    const encrypted = data.subarray(offset)
    return { state, encrypted }
  }

  // Updated: [state][token][key][iv][tag][encrypted]
  if (state === WirePayloadState.Updated) {
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

    const meta: ImageDecryptionMeta = {
      key: arrayBufferToBase64(key),
      iv: arrayBufferToBase64(iv),
      tag: arrayBufferToBase64(tag),
    }
    return { state, token, meta, encrypted }
  }

  // Fallback: Return just state
  return { state }
}

/**
 * Checks whether the given state is a valid WirePayloadState enum value.
 * Throws PixstoreError if the state is unknown, to prevent encoding or decoding invalid payloads.
 */
const validateState = (state: WirePayloadState) => {
  if (!Object.values(WirePayloadState).includes(state)) {
    throw new PixstoreError(
      `encodeWirePayload: Invalid state=${state} in BackendWirePayload`,
    )
  }
}
