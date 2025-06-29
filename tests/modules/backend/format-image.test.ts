import fs from 'fs'
import path from 'path'
import { isValidImage } from '../../../src/backend/format-image.js'

const assetsDir = path.resolve(__dirname, '../../assets')
const pngBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.png'))
const webpBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.webp'))
const txtBuffer = fs.readFileSync(path.join(assetsDir, 'no-text.txt'))

describe('image-validation', () => {
  describe('isValidImage', () => {
    it('should return true for valid PNG', () => {
      expect(isValidImage(pngBuffer)).toBe(true)
    })

    it('should return true for valid WEBP', () => {
      expect(isValidImage(webpBuffer)).toBe(true)
    })

    it('should return false for text file', () => {
      expect(isValidImage(txtBuffer)).toBe(false)
    })

    it('should return false for empty buffer', () => {
      expect(isValidImage(Buffer.alloc(0))).toBe(false)
    })
  })
})
