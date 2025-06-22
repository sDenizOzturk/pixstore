import fs from 'fs'
import path from 'path'
import {
  encodeImagePayload,
  decodeImagePayload,
} from '../../../src/shared/image-encoder'
import { ImagePayload } from '../../../src/shared/models/image-payload'
import { ImageFormat } from '../../../src/shared/models/image-format'
import { pixstoreConfig } from '../../../src/shared/pixstore-config'

const IMAGE_FORMATS = pixstoreConfig.imageFormats

describe('Image Encoder/Decoder – Round-Trip Integrity', () => {
  const assetDir = path.resolve(__dirname, '..', '../assets')
  const defaultFormat: ImageFormat = IMAGE_FORMATS[0]

  const cases: {
    name: string
    imageFormat: ImageFormat
    token: number
    buffer: Uint8Array
  }[] = [
    {
      name: 'empty buffer',
      imageFormat: defaultFormat,
      token: 0,
      buffer: new Uint8Array([]),
    },
    {
      name: 'small bytes',
      imageFormat: defaultFormat,
      token: 7,
      buffer: new Uint8Array([1, 2, 3, 4, 5]),
    },
    {
      name: '1-pixel.png',
      imageFormat: 'png',
      token: 42,
      buffer: new Uint8Array(
        fs.readFileSync(path.join(assetDir, '1-pixel.png')),
      ),
    },
    {
      name: '1-pixel.webp',
      imageFormat: 'webp',
      token: 43,
      buffer: new Uint8Array(
        fs.readFileSync(path.join(assetDir, '1-pixel.webp')),
      ),
    },
    {
      name: 'no-text.txt',
      imageFormat: defaultFormat,
      token: 44,
      buffer: new Uint8Array(
        fs.readFileSync(path.join(assetDir, 'no-text.txt')),
      ),
    },
  ]

  cases.forEach(({ name, imageFormat, token, buffer }) => {
    it(`should correctly encode & decode for ${name}`, () => {
      const payload: ImagePayload = { imageFormat, token, buffer }
      const encoded = encodeImagePayload(payload)
      const decoded = decodeImagePayload(encoded)

      expect(decoded.imageFormat).toBe(imageFormat)
      expect(decoded.token).toBe(token)
      expect(decoded.buffer).toEqual(buffer)
    })
  })
})

describe('Image Encoder/Decoder – Edge Cases', () => {
  it('throws if input length is less than 9 bytes', () => {
    expect(() => decodeImagePayload(new Uint8Array(8))).toThrow(Error)
  })

  it('preserves little-endian token format and leaves buffer intact', () => {
    const token = 0x0102030405060708
    const buffer = new Uint8Array([255, 128, 0])
    const imageFormat: ImageFormat = 'jpeg'
    const encoded = encodeImagePayload({ imageFormat, token, buffer })

    // First byte is format, next 8 bytes are token
    const dv = new DataView(
      encoded.buffer,
      encoded.byteOffset + 1, // skip format byte
      8,
    )
    const readToken = Number(dv.getBigUint64(0, true))

    expect(readToken).toBe(token)
    expect(new Uint8Array(encoded.slice(9))).toEqual(buffer)
  })
})
