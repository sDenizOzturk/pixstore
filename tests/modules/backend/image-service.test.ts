import fs from 'fs'
import path from 'path'
import {
  saveImageFromFile,
  updateImageFromFile,
  getWirePayload,
  deleteImage,
  imageExists,
  getImageRecord,
} from '../../../src/backend/image-service.js'
import {
  initializeDatabase,
  readImageRecord,
} from '../../../src/backend/database.js'
import { toFilePath } from '../../../src/backend/unique-id.js'

const assetsDir = path.resolve(__dirname, '../../assets')
import { sleep } from '../../utils'

beforeAll(() => {
  initializeDatabase()
})

describe('saveImageFromFile', () => {
  const testDir = 'saveImageFromFile'

  it('should save a valid image and create a DB record with dir prefix', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    // file on disk
    expect(fs.existsSync(toFilePath(record!.id))).toBe(true)

    // DB record must exist and match id+token
    const dbRecord = readImageRecord(record!.id)!
    expect(dbRecord!.id).toBe(record!.id)
    expect(dbRecord!.token).toBe(record!.token)

    // metadata must be present
    expect(dbRecord!.meta).toBeDefined()
    expect(dbRecord!.meta.key).toBeDefined()
    expect(dbRecord!.meta.iv).toBeDefined()
    expect(dbRecord!.meta.tag).toBeDefined()
  })

  it('should save a valid image and create a DB record with no dir', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath)

    expect(fs.existsSync(toFilePath(record!.id))).toBe(true)
    const dbRecord = readImageRecord(record!.id)!
    expect(dbRecord!.id).toBe(record!.id)
    expect(dbRecord!.token).toBe(record!.token)
  })

  it('should reject when given a non-image file', async () => {
    const filePath = path.join(assetsDir, 'no-text.txt')
    await expect(saveImageFromFile(filePath, testDir)).rejects.toThrow(
      'Invalid image file',
    )
  })
})

describe('updateImageFromFile', () => {
  const testDir = 'updateImageFromFile'

  it('should overwrite existing image and update its token', async () => {
    const originalPath = path.join(assetsDir, '1-pixel.png')
    const original = await saveImageFromFile(originalPath, testDir)

    await sleep(5)

    const updated = await updateImageFromFile(original!.id, originalPath)

    expect(updated!.id).toBe(original!.id)
    expect(updated!.token).not.toBe(original!.token)

    // DB record was updated
    const dbRecord = readImageRecord(updated!.id)!
    expect(dbRecord!.token).toBe(updated!.token)
  })

  it('should reject when updating a non-existent image', async () => {
    const fakeId = `${testDir}:no-such-id`
    const filePath = path.join(assetsDir, '1-pixel.png')
    await expect(updateImageFromFile(fakeId, filePath)).rejects.toThrow()
  })
})

describe('getImageRecord', () => {
  const testDir = 'getImageRecord'

  it('should return the DB record for an existing image', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const saved = await saveImageFromFile(filePath, testDir)

    const result = getImageRecord(saved!.id)!
    expect(result.id).toBe(saved!.id)
    expect(result.token).toBe(saved!.token)
  })

  it('should return null if no record found', () => {
    expect(getImageRecord(`${testDir}:nonexistent`)).toBeNull()
  })
})

describe('getWirePayload', () => {
  const testDir = 'getWirePayload'

  it('should return encrypted, token, and meta for an existing image', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const saved = await saveImageFromFile(filePath, testDir)

    const { encrypted, token, meta } = await getWirePayload(saved!.id)

    expect(Buffer.isBuffer(encrypted)).toBe(true)
    expect(encrypted.length).toBeGreaterThan(0)
    expect(token).toBe(saved!.token)

    expect(meta).toBeDefined()
  })

  it('should throw if record is missing', async () => {
    await expect(getWirePayload(`${testDir}:missing-id`)).rejects.toThrow(
      'Image record not found',
    )
  })
})

describe('deleteImage', () => {
  const testDir = 'deleteImage'

  it('should delete both file and DB record when both exist', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const saved = await saveImageFromFile(filePath, testDir)

    expect(await deleteImage(saved!.id)).toBe(true)
    expect(fs.existsSync(toFilePath(saved!.id))).toBe(false)
    expect(readImageRecord(saved!.id)).toBeNull()
  })

  it('should delete only DB record if file is already missing', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const saved = await saveImageFromFile(filePath, testDir)

    fs.unlinkSync(toFilePath(saved!.id))
    expect(await deleteImage(saved!.id)).toBe(true)
    expect(readImageRecord(saved!.id)).toBeNull()
  })

  it('should return false if nothing existed', async () => {
    expect(await deleteImage(`${testDir}:ghost`)).toBe(false)
  })
})

describe('imageExists', () => {
  const testDir = 'imageExists'

  it('should return true if both file and DB record exist', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const saved = await saveImageFromFile(filePath, testDir)
    expect(await imageExists(saved!.id)).toBe(true)
  })

  it('should return true if only DB record exists', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const saved = await saveImageFromFile(filePath, testDir)
    fs.unlinkSync(toFilePath(saved!.id))
    expect(await imageExists(saved!.id)).toBe(true)
  })

  it('should return false if neither exists', async () => {
    expect(await imageExists(`${testDir}:nonexistent`)).toBe(false)
  })
})
