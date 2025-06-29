import {
  encodeWirePayload,
  decodeWirePayload,
} from '../../../src/shared/wire-encoder.js'
import {
  AES_KEY_SIZE,
  AES_IV_SIZE,
  AES_GCM_TAG_LENGTH,
} from '../../../src/shared/constants.js'
import { BackendWirePayload } from '../../../src/types/backend-wire-payload.js'
import { arrayBufferToBase64 } from '../../../src/shared/format-buffer.js'
import { ImageDecryptionMeta } from '../../../src/types/image-decryption-meta.js'

const randomBuf = (size: number) => {
  return Buffer.from(
    Array.from({ length: size }, () => Math.floor(Math.random() * 256)),
  )
}

describe('Wire Encoder', () => {
  it('encodeWirePayload + decodeWirePayload should be lossless & compatible', () => {
    // Random test data
    const token = 42
    const key = arrayBufferToBase64(randomBuf(AES_KEY_SIZE))
    const iv = arrayBufferToBase64(randomBuf(AES_IV_SIZE))
    const tag = arrayBufferToBase64(randomBuf(AES_GCM_TAG_LENGTH / 8))
    const encrypted = randomBuf(9)

    const meta: ImageDecryptionMeta = {
      key,
      iv,
      tag,
    }

    // BackendWirePayload format (encode input)
    const payload: BackendWirePayload = {
      token,
      meta,
      encrypted,
    }

    // Encode & decode
    const encoded = encodeWirePayload(payload)
    const decoded = decodeWirePayload(encoded)

    // Token
    expect(decoded.token).toBe(token)

    // Meta: ArrayBuffer equality (byte-for-byte)
    expect(decoded.meta.key).toEqual(key)
    expect(decoded.meta.iv).toEqual(iv)
    expect(decoded.meta.tag).toEqual(tag)

    // Encrypted: Uint8Array equality
    expect(new Uint8Array(decoded.encrypted)).toEqual(new Uint8Array(encrypted))
  })
})
