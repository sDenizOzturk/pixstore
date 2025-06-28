import { encryptImage } from '../../../src/backend/image-encryption'
import { createDecipheriv } from 'crypto'
import { readdirSync, readFileSync } from 'fs'
import { join } from 'path'
import { AES_ALGORITHM } from '../../../src/shared/constants'

const assetsDir = join(__dirname, '../../assets')

// Select supported image files in assets
const imageFiles = readdirSync(assetsDir).filter((f) =>
  /\.(png|jpg|jpeg|webp)$/i.test(f),
)

describe('encryptImage (with real assets)', () => {
  it.each(imageFiles)(
    'should encrypt and decrypt "%s" correctly and fast',
    (file) => {
      const filePath = join(assetsDir, file)
      const buffer = readFileSync(filePath)
      // Determine format code by file extension
      const ext = file.split('.').pop()!.toLowerCase()
      const formatMap: Record<string, number> = {
        png: 0,
        webp: 1,
        jpg: 2,
        jpeg: 2,
      }
      const format = formatMap[ext] ?? 9

      const start = Date.now()
      const { encryptedImage, imageEncryptionMeta } = encryptImage(
        format,
        buffer,
      )
      const duration = Date.now() - start

      // Decrypt (for test only)
      const { key, iv, tag } = imageEncryptionMeta
      const decipher = createDecipheriv(AES_ALGORITHM, key, iv)
      decipher.setAuthTag(tag)
      const plaintext = Buffer.concat([
        decipher.update(encryptedImage),
        decipher.final(),
      ])
      const decryptedFormat = plaintext[0]
      const decryptedBuffer = plaintext.slice(1)

      expect(decryptedFormat).toBe(format)
      expect(decryptedBuffer.equals(buffer)).toBe(true)
      expect(duration).toBeLessThanOrEqual(10)
    },
  )
})
