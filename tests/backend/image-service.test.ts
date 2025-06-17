import fs from 'fs'
import path from 'path'
import {
  saveImageFromFile,
  updateImageFromFile,
} from '../../src/backend/image-service'
import { readImageRecord } from '../../src/backend/database'
import { toFilePath } from '../../src/backend/id'

const assetsDir = path.resolve(__dirname, '../assets')
const testDir = 'test-assets'

describe('saveImageFromFile', () => {
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
