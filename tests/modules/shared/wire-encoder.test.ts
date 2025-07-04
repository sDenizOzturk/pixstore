import {
  encodeWirePayload,
  decodeWirePayload,
} from '../../../src/shared/wire-encoder.js'
import {
  AES_KEY_SIZE,
  AES_IV_SIZE,
  AES_GCM_TAG_LENGTH,
} from '../../../src/shared/constants.js'
import {
  WirePayloadState,
  type BackendWirePayload,
} from '../../../src/types/wire-payload.js'
import { arrayBufferToBase64 } from '../../../src/shared/format-buffer.js'
import type { ImageDecryptionMeta } from '../../../src/types/image-decryption-meta.js'

// Generates random buffer of given size
const randomBuf = (size: number) => {
  return Buffer.from(
    Array.from({ length: size }, () => Math.floor(Math.random() * 256)),
  )
}

describe('Wire Encoder', () => {
  it('should correctly encode and decode a Success payload', () => {
    const encrypted = randomBuf(16)
    const payload: BackendWirePayload = {
      state: WirePayloadState.Success,
      encrypted,
    }

    const encoded = encodeWirePayload(payload)

    const decoded = decodeWirePayload(encoded)

    expect(decoded.state).toBe(WirePayloadState.Success)
    if (decoded.state === WirePayloadState.Success) {
      expect(new Uint8Array(decoded.encrypted)).toEqual(
        new Uint8Array(encrypted),
      )
      expect('token' in decoded).toBe(false)
      expect('meta' in decoded).toBe(false)
    } else {
      throw new Error('Expected Success state payload')
    }
  })

  it('should correctly encode and decode an Updated payload', () => {
    const token = 42
    const key = arrayBufferToBase64(randomBuf(AES_KEY_SIZE))
    const iv = arrayBufferToBase64(randomBuf(AES_IV_SIZE))
    const tag = arrayBufferToBase64(randomBuf(AES_GCM_TAG_LENGTH / 8))
    const encrypted = randomBuf(16)

    const meta: ImageDecryptionMeta = { key, iv, tag }
    const payload: BackendWirePayload = {
      state: WirePayloadState.Updated,
      token,
      meta,
      encrypted,
    }

    const encoded = encodeWirePayload(payload)
    const decoded = decodeWirePayload(encoded)

    expect(decoded.state).toBe(WirePayloadState.Updated)
    // Only in Updated state, these fields must exist:
    if (decoded.state === WirePayloadState.Updated) {
      expect(decoded.token).toBe(token)
      expect(decoded.meta.key).toBe(key)
      expect(decoded.meta.iv).toBe(iv)
      expect(decoded.meta.tag).toBe(tag)
      expect(new Uint8Array(decoded.encrypted)).toEqual(
        new Uint8Array(encrypted),
      )
    } else {
      throw new Error('Decoded payload is not in Updated state')
    }
  })

  const errorStates: BackendWirePayload[] = [
    { state: WirePayloadState.NotFound },
    { state: WirePayloadState.InvalidProof },
    { state: WirePayloadState.MissingID },
    { state: WirePayloadState.MissingProof },
    { state: WirePayloadState.InternalError },
  ]
  for (const payload of errorStates) {
    const encoded = encodeWirePayload(payload)
    const decoded = decodeWirePayload(encoded)
    expect(decoded.state).toBe(payload.state)
    expect(Object.keys(decoded)).toEqual(['state'])
  }
})
