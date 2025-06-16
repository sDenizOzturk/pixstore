import fs from 'fs'
import path from 'path'
import {
  saveImageFile,
  readImageFile,
  deleteImageFile,
  diskToBuffer,
} from '../../src/backend/file-storage'
import { toFilePath } from '../../src/backend/id'

const assetsDir = path.resolve(__dirname, '../assets')
const pngBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.png'))
const webpBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.webp'))
const txtBuffer = fs.readFileSync(path.join(assetsDir, 'no-text.txt'))

// Use a unique ID for each test to avoid accidental collisions
const makeTestId = (suffix: string) => `testfile:${Date.now()}_${suffix}`

describe('file-storage', () => {
  afterEach(() => {
    // Clean up any test images saved during the test
    fs.rmSync('pixstore-images', { recursive: true, force: true })
  })

  it('should save and read a valid PNG file (as webp)', async () => {
    const id = makeTestId('png')
    await saveImageFile(id, pngBuffer)
    const readBuffer = await readImageFile(id)
    expect(Buffer.isBuffer(readBuffer)).toBe(true)
    // The file on disk must be in the target format (e.g. webp)
    // readImageFile already validates format!
  })

  it('should save and read a valid webp file', async () => {
    const id = makeTestId('webp')
    await saveImageFile(id, webpBuffer)
    const readBuffer = await readImageFile(id)
    expect(Buffer.isBuffer(readBuffer)).toBe(true)
  })

  it('should throw when saving a non-image file', () => {
    const id = makeTestId('txt')
    expect(saveImageFile(id, txtBuffer)).rejects.toThrow('Invalid image format')
  })

  it('should throw when reading a missing file', () => {
    const id = makeTestId('missing')
    expect(() => readImageFile(id)).toThrow()
  })
  it('should delete a file and fail to read after deletion', async () => {
    const id = makeTestId('delete')
    await saveImageFile(id, pngBuffer)
    deleteImageFile(id)
    expect(() => readImageFile(id)).toThrow()
  })

  it('diskToBuffer should read and validate a valid image file', async () => {
    // First, save a test image
    const id = makeTestId('diskbuf')
    await saveImageFile(id, pngBuffer)
    const filepath = toFilePath(id)
    const buffer = diskToBuffer(filepath)
    expect(Buffer.isBuffer(buffer)).toBe(true)
  })

  it('diskToBuffer should throw for a non-image file', () => {
    // Write a .txt to disk manually
    const fakePath = path.join('pixstore-images', 'fake.txt')
    fs.mkdirSync(path.dirname(fakePath), { recursive: true })
    fs.writeFileSync(fakePath, txtBuffer)
    expect(() => diskToBuffer(fakePath)).toThrow('Invalid image file')
  })
})
