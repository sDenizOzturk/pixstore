import fs from 'fs'
import fsAsync from 'fs/promises'
import path from 'path'
import {
  deleteImageFile,
  diskToBuffer,
  readImageFile,
  saveImageFile,
} from '../../../src/backend/file-storage'
import { toFilePath } from '../../../src/backend/unique-id'

const assetsDir = path.resolve(__dirname, '../../assets')
const pngBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.png'))
const webpBuffer = fs.readFileSync(path.join(assetsDir, '1-pixel.webp'))
const txtBuffer = fs.readFileSync(path.join(assetsDir, 'no-text.txt'))

// Use a unique ID for each test to avoid accidental collisions
const makeTestId = (suffix: string) => `testfile:${Date.now()}_${suffix}`

describe('file-storage', () => {
  afterEach(async () => {
    // Clean up any test images saved during the test
    await fsAsync.rm('pixstore-images', { recursive: true, force: true })
  })

  it('should save and read a valid PNG file (as webp)', async () => {
    const id = makeTestId('png')
    await saveImageFile(id, pngBuffer)
    const readBuffer = await readImageFile(id)
    expect(Buffer.isBuffer(readBuffer)).toBe(true)
  })

  it('should save and read a valid webp file', async () => {
    const id = makeTestId('webp')
    await saveImageFile(id, webpBuffer)
    const readBuffer = await readImageFile(id)
    expect(Buffer.isBuffer(readBuffer)).toBe(true)
  })

  it('should throw when saving a non-image file', async () => {
    const id = makeTestId('txt')
    await expect(saveImageFile(id, txtBuffer)).rejects.toThrow(
      'Invalid image format',
    )
  })

  it('should throw when reading a missing file', async () => {
    const id = makeTestId('missing')
    await expect(readImageFile(id)).rejects.toThrow()
  })

  it('should delete a file and fail to read after deletion', async () => {
    const id = makeTestId('delete')
    await saveImageFile(id, pngBuffer)
    await deleteImageFile(id)
    await expect(readImageFile(id)).rejects.toThrow()
  })
  it('diskToBuffer should read and validate a valid image file', async () => {
    const id = makeTestId('diskbuf')
    await saveImageFile(id, pngBuffer)
    const filepath = toFilePath(id)
    const buffer = await diskToBuffer(filepath) // <-- await ekle
    expect(Buffer.isBuffer(buffer)).toBe(true)
  })

  it('diskToBuffer should throw for a non-image file', async () => {
    const fakePath = path.join('pixstore-images', 'fake.txt')
    await fsAsync.mkdir(path.dirname(fakePath), { recursive: true })
    await fsAsync.writeFile(fakePath, txtBuffer)
    await expect(diskToBuffer(fakePath)).rejects.toThrow('Invalid image file') // <-- async test
  })
})
