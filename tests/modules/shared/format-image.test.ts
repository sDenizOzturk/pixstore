import {
  imageFormatToByte,
  byteToImageFormat,
} from '../../../src/shared/format-image.js'
import { pixstoreConfig } from '../../../src/shared/pixstore-config.js'

const IMAGE_FORMATS = pixstoreConfig.imageFormats

describe('imageFormatToByte', () => {
  it('converts all supported formats to correct byte values', () => {
    for (const format of IMAGE_FORMATS) {
      const byte = imageFormatToByte(format)
      expect(typeof byte).toBe('number')
      expect(byteToImageFormat(byte)).toBe(format)
    }
  })

  it('throws on unsupported format', () => {
    expect(() => imageFormatToByte('bmp' as any)).toThrow(
      'Unsupported image format: bmp',
    )
  })
})

describe('byteToImageFormat', () => {
  it('converts all supported bytes to correct format', () => {
    for (const format of IMAGE_FORMATS) {
      const byte = imageFormatToByte(format)
      expect(byteToImageFormat(byte)).toBe(format)
    }
  })

  it('throws on unknown byte value', () => {
    expect(() => byteToImageFormat(255)).toThrow(
      'Unknown image format byte: 255',
    )
  })
})
