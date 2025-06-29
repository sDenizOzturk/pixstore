import { encryptImage } from '../../../src/backend/image-encryption.js'
import { createDecipheriv } from 'crypto'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { BACKEND_AES_ALGORITHM } from '../../../src/shared/constants.js'
import { getImageFormat } from '../../../src/backend/format-image.js'
import { imageFormatToByte } from '../../../src/shared/format-image.js'
import { isValidImage } from '../../../src/backend/format-image.js'

const assetsDir = join(__dirname, '../../assets')

const imageFiles = readdirSync(assetsDir).filter((f) =>
  /\.(png|jpg|jpeg|webp)$/i.test(f),
)

describe('encryptImage (with real assets)', () => {
  it.each(imageFiles)(
    'should encrypt and decrypt "%s" correctly and fast',
    (file) => {
      const filePath = join(assetsDir, file)
      const buffer = readFileSync(filePath)

      // Use actual format from buffer content instead of extension
      const format = getImageFormat(buffer)
      const expectedFormatByte = imageFormatToByte(format)

      const start = Date.now()
      const { encrypted, meta } = encryptImage(buffer)
      const duration = Date.now() - start

      const decipher = createDecipheriv(
        BACKEND_AES_ALGORITHM,
        Buffer.from(meta.key, 'base64'),
        Buffer.from(meta.iv, 'base64'),
      )

      decipher.setAuthTag(Buffer.from(meta.tag, 'base64'))
      const plaintext = Buffer.concat([
        decipher.update(encrypted),
        decipher.final(),
      ])

      const decryptedFormatByte = plaintext[0]
      const decryptedBuffer = plaintext.slice(1)

      expect(decryptedFormatByte).toBe(expectedFormatByte)
      expect(decryptedBuffer.equals(buffer)).toBe(true)
      expect(duration).toBeLessThanOrEqual(10)
    },
  )
})

describe('isValidImage utility', () => {
  it('returns true for valid images and false for invalid', () => {
    const validBuffer = readFileSync(join(assetsDir, '1-pixel.png'))
    const invalidBuffer = Buffer.from('not an image')

    expect(isValidImage(validBuffer)).toBe(true)
    expect(isValidImage(invalidBuffer)).toBe(false)
  })
})
