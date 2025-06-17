import fs from 'fs'
import path from 'path'
import {
  encodeImagePayload,
  decodeImagePayload,
} from '../../src/shared/image-encoder'
import { EncodedImagePayload } from '../../src/shared/models/encoded-image-payload'

describe('Image Encoder/Decoder – Round-Trip Integrity', () => {
  const assetDir = path.resolve(__dirname, '..', 'assets')

  const cases: { name: string; token: number; buffer: Uint8Array }[] = [
    { name: 'empty buffer', token: 0, buffer: new Uint8Array([]) },
    { name: 'small bytes', token: 7, buffer: new Uint8Array([1, 2, 3, 4, 5]) },
    {
      name: '1-pixel.png',
      token: 42,
      buffer: new Uint8Array(
        fs.readFileSync(path.join(assetDir, '1-pixel.png')),
      ),
    },
    {
      name: '1-pixel.svg',
      token: 43,
      buffer: new Uint8Array(
        fs.readFileSync(path.join(assetDir, '1-pixel.webp')),
      ),
    },
    {
      name: 'no-text.txt',
      token: 44,
      buffer: new Uint8Array(
        fs.readFileSync(path.join(assetDir, 'no-text.txt')),
      ),
    },
  ]

  cases.forEach(({ name, token, buffer }) => {
    it(`should correctly encode & decode for ${name}`, () => {
      const payload: EncodedImagePayload = { token, buffer }
      const encoded = encodeImagePayload(payload)
      const decoded = decodeImagePayload(encoded)

      expect(decoded.token).toBe(token)
      expect(decoded.buffer).toEqual(buffer)
    })
  })
})

describe('Image Encoder/Decoder – Edge Cases', () => {
  it('throws if input length is less than 8 bytes', () => {
    expect(() => decodeImagePayload(new Uint8Array(7))).toThrow(RangeError)
  })

  it('preserves little-endian token format', () => {
    const token = 0x0102030405060708
    const buffer = new Uint8Array([255, 128, 0])
    const encoded = encodeImagePayload({ token, buffer })

    // Manually read the first 8 bytes as little-endian
    const dv = new DataView(
      encoded.buffer,
      encoded.byteOffset,
      encoded.byteLength,
    )
    const readToken = Number(dv.getBigUint64(0, true))

    expect(readToken).toBe(token)
    expect(new Uint8Array(encoded.slice(8))).toEqual(buffer)
  })
})
