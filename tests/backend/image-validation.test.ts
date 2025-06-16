import fs from 'fs'
import path from 'path'
import { IMAGE_FORMAT } from '../../src/constants'
import {
  isValidImage,
  isValidFormat,
  convertImage,
} from '../../src/backend/image-validation'

const assetsDir = path.resolve(__dirname, '../assets')
const pngBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.png'))
const webpBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.webp'))
const txtBuffer = fs.readFileSync(path.join(assetsDir, 'no-text.txt'))

describe('image-validation', () => {
  describe('isValidImage', () => {
    it('should return true for valid PNG', async () => {
      expect(await isValidImage(pngBuffer)).toBe(true)
    })

    it('should return true for valid WEBP', async () => {
      expect(await isValidImage(webpBuffer)).toBe(true)
    })

    it('should return false for text file', async () => {
      expect(await isValidImage(txtBuffer)).toBe(false)
    })

    it('should return false for empty buffer', async () => {
      expect(await isValidImage(Buffer.alloc(0))).toBe(false)
    })
  })

  describe('isValidFormat', () => {
    it(`should return true for buffer in target format (${IMAGE_FORMAT})`, async () => {
      expect(await isValidFormat(webpBuffer)).toBe(true)
    })

    it('should return false for valid but non-target format', async () => {
      expect(await isValidFormat(pngBuffer)).toBe(false)
    })

    it('should return false for text file', async () => {
      expect(await isValidFormat(txtBuffer)).toBe(false)
    })
  })

  describe('convertImage', () => {
    it(`should convert PNG to target format (${IMAGE_FORMAT})`, async () => {
      const result = await convertImage(pngBuffer)
      expect(await isValidFormat(result)).toBe(true)
    })

    it('should not throw for already-correct format', async () => {
      await expect(convertImage(webpBuffer)).resolves.toBeInstanceOf(Buffer)
    })

    it('should throw or fail for non-image buffer', async () => {
      await expect(convertImage(txtBuffer)).rejects.toThrow()
    })
  })
})
