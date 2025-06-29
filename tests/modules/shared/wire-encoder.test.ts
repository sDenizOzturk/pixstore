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
import { ImageEncryptionMeta } from '../../../src/types/image-encryption-meta.js'

const randomBuf = (size: number) => {
  return Buffer.from(
    Array.from({ length: size }, () => Math.floor(Math.random() * 256)),
  )
}

describe('Wire Encoder', () => {
  it('encodeWirePayload + decodeWirePayload should be lossless & compatible', () => {
    // Random test data

    const token = 42
    const key = randomBuf(AES_KEY_SIZE)
    const iv = randomBuf(AES_IV_SIZE)
    const tag = randomBuf(AES_GCM_TAG_LENGTH / 8)
    const encrypted = randomBuf(9)

    const meta: ImageEncryptionMeta = { key, iv, tag }

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
    expect(new Uint8Array(decoded.meta.key)).toEqual(new Uint8Array(key))
    expect(new Uint8Array(decoded.meta.iv)).toEqual(new Uint8Array(iv))
    expect(new Uint8Array(decoded.meta.tag)).toEqual(new Uint8Array(tag))

    // Encrypted: Uint8Array equality
    expect(decoded.encrypted).toEqual(new Uint8Array(encrypted))
  })
})
