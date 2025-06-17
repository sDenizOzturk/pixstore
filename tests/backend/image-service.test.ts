import fs from 'fs'
import path from 'path'
import {
  deleteImage,
  getImageRecord,
  imageExists,
  getImage,
  saveImageFromFile,
  updateImageFromFile,
} from '../../src/backend/image-service'
import { readImageRecord } from '../../src/backend/database'
import { toFilePath } from '../../src/backend/id'

const assetsDir = path.resolve(__dirname, '../assets')

describe('saveImageFromFile', () => {
  const testDir = 'saveImageFromFile'
  it('saves a valid image and creates a DB record (with dir)', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    const fileOnDisk = toFilePath(record.id)
    const dbRecord = readImageRecord(record.id)

    expect(fs.existsSync(fileOnDisk)).toBe(true)
    expect(dbRecord).toEqual(record)
  })

  it('saves a valid image and creates a DB record (no dir)', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath)

    const fileOnDisk = toFilePath(record.id)
    const dbRecord = readImageRecord(record.id)

    expect(fs.existsSync(fileOnDisk)).toBe(true)
    expect(dbRecord).toEqual(record)
  })

  it('throws if given an invalid image file', async () => {
    const filePath = path.join(assetsDir, 'no-text.txt')
    await expect(saveImageFromFile(filePath, testDir)).rejects.toThrow(
      'Invalid image file',
    )
  })
})

describe('updateImageFromFile', () => {
  const testDir = 'updateImageFromFile'
  it('overwrites existing image and updates its token', async () => {
    const originalPath = path.join(assetsDir, '1-pixel.png')
    const originalRecord = await saveImageFromFile(originalPath, testDir)

    const updatedPath = path.join(assetsDir, '1-pixel.png')
    const updatedRecord = await updateImageFromFile(
      originalRecord.id,
      updatedPath,
      testDir,
    )

    // verify returned record
    expect(updatedRecord.id).toBe(originalRecord.id)
    expect(updatedRecord.token).not.toBe(originalRecord.token)

    // verify file on disk
    const fileOnDisk = toFilePath(updatedRecord.id)
    expect(fs.existsSync(fileOnDisk)).toBe(true)

    // verify database record
    const dbRecord = readImageRecord(updatedRecord.id)
    expect(dbRecord).not.toBeNull()
    expect(dbRecord!.token).toBe(updatedRecord.token)
  })

  it('rejects when updating a non-existent image', async () => {
    const fakeId = `${testDir}:no-such-id`
    const filePath = path.join(assetsDir, '1-pixel.png')
    await expect(
      updateImageFromFile(fakeId, filePath, testDir),
    ).rejects.toThrow()
  })
})

describe('getImageRecord', () => {
  const testDir = 'getImageRecord'
  it('returns the DB record for an existing image', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    const result = getImageRecord(record.id)
    expect(result).toEqual(record)
  })

  it('returns null if image record is not found', () => {
    const result = getImageRecord(`${testDir}:nonexistent`)
    expect(result).toBeNull()
  })
})

describe('readImage', () => {
  const testDir = 'readImage'
  it('returns image buffer and token for existing image', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    const { buffer, token } = getImage(record.id)
    const fileOnDisk = toFilePath(record.id)

    expect(Buffer.isBuffer(buffer)).toBe(true)
    expect(buffer.length).toBeGreaterThan(0)
    expect(token).toBe(record.token)
    expect(fs.existsSync(fileOnDisk)).toBe(true)
  })

  it('throws if image record is missing', () => {
    expect(() => {
      getImage(`${testDir}:missing-id`)
    }).toThrow('Image record not found')
  })
})
describe('deleteImage', () => {
  const testDir = 'deleteImage'
  it('deletes image file and DB record if both exist', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    const result = deleteImage(record.id)

    expect(result).toBe(true)
    expect(fs.existsSync(toFilePath(record.id))).toBe(false)
    expect(readImageRecord(record.id)).toBeNull()
  })

  it('deletes only DB record if file is missing', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    // delete file manually
    fs.unlinkSync(toFilePath(record.id))

    const result = deleteImage(record.id)

    expect(result).toBe(true)
    expect(readImageRecord(record.id)).toBeNull()
  })

  it('returns false if image does not exist at all', () => {
    const result = deleteImage(`${testDir}:nonexistent`)
    expect(result).toBe(false)
  })
})

describe('imageExists', () => {
  const testDir = 'imageExists'
  it('returns true if image file and DB record exist', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    const result = imageExists(record.id)
    expect(result).toBe(true)
  })

  it('returns true if only DB record exists', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    fs.unlinkSync(toFilePath(record.id)) // delete file

    const result = imageExists(record.id)
    expect(result).toBe(true)
  })

  it('returns false if image does not exist anywhere', () => {
    const result = imageExists(`${testDir}:ghost`)
    expect(result).toBe(false)
  })
})
