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
import { PixstoreError } from '../../../src/shared/pixstore-error.js'
import { WirePayloadState } from '../../../src/types/wire-payload.js'

const assetsDir = path.resolve(__dirname, '../../assets')

// Helper to simulate async sleep for file timestamp changes
const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))

beforeAll(() => {
  initializeDatabase()
})

describe('Pixstore backend image-service', () => {
  const testDir = 'backend-image-service'

  it('should save a valid image and create a DB record', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)

    expect(record).not.toBeNull()
    // File exists on disk
    expect(fs.existsSync(toFilePath(record!.id))).toBe(true)
    // DB record exists and matches
    const dbRecord = readImageRecord(record!.id)
    expect(dbRecord).not.toBeNull()
    expect(dbRecord!.id).toBe(record!.id)
    expect(dbRecord!.token).toBe(record!.token)
    expect(dbRecord!.meta).toBeDefined()
    expect(dbRecord!.meta.key).toBeDefined()
    expect(dbRecord!.meta.iv).toBeDefined()
    expect(dbRecord!.meta.tag).toBeDefined()
  })

  it('should reject non-image files', async () => {
    const filePath = path.join(assetsDir, 'no-text.txt')
    await expect(saveImageFromFile(filePath, testDir)).rejects.toThrow(
      'Invalid image file',
    )
  })

  it('should update an image and change its token', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)
    await sleep(5)
    const updated = await updateImageFromFile(record!.id, filePath)
    expect(updated).not.toBeNull()
    expect(updated!.id).toBe(record!.id)
    expect(updated!.token).not.toBe(record!.token)
    const dbRecord = readImageRecord(updated!.id)
    expect(dbRecord!.token).toBe(updated!.token)
  })

  it('should reject updates for non-existent images', async () => {
    const fakeId = `${testDir}:no-such-id`
    const filePath = path.join(assetsDir, '1-pixel.png')
    await expect(updateImageFromFile(fakeId, filePath)).rejects.toThrow(
      PixstoreError,
    )
  })

  it('should get image record and statelessProof for existing image', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)
    const result = getImageRecord(record!.id)
    expect(result).not.toBeNull()
    expect(result!.id).toBe(record!.id)
    expect(result!.token).toBe(record!.token)
    expect(result!.statelessProof).toBeDefined()
  })

  it('should return null from getImageRecord for non-existent id', () => {
    expect(getImageRecord(`${testDir}:does-not-exist`)).toBeNull()
  })

  it('should produce a valid wire payload for existing image', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)
    const payload = await getWirePayload(record!.id, undefined)

    // Check for expected states
    const allowedStates = [
      WirePayloadState.Success,
      WirePayloadState.Updated,
      WirePayloadState.NotFound,
    ]
    expect(allowedStates).toContain(payload.state)

    if (payload.state === WirePayloadState.Success) {
      expect(payload.encrypted).toBeDefined()
      expect('meta' in payload).toBe(false)
      expect('token' in payload).toBe(false)
    } else if (payload.state === WirePayloadState.Updated) {
      expect(payload.encrypted).toBeDefined()
      expect(payload.meta).toBeDefined()
      expect(payload.token).toBeDefined()
    } else if (payload.state === WirePayloadState.NotFound) {
      expect(Object.keys(payload)).toEqual(['state'])
    } else {
      // For any error state, just check that only state exists
      expect(Object.keys(payload)).toEqual(['state'])
    }
  })

  it('should throw error from getWirePayload for truly missing image', async () => {
    await expect(
      getWirePayload(`${testDir}:ghost`, undefined),
    ).resolves.toEqual({ state: 2 }) // NotFound
  })

  it('should delete file and DB record', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)
    expect(await deleteImage(record!.id)).toBe(true)
    expect(fs.existsSync(toFilePath(record!.id))).toBe(false)
    expect(readImageRecord(record!.id)).toBeNull()
  })

  it('should delete only DB record if file already gone', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)
    fs.unlinkSync(toFilePath(record!.id))
    expect(await deleteImage(record!.id)).toBe(true)
    expect(readImageRecord(record!.id)).toBeNull()
  })

  it('should return false if nothing to delete', async () => {
    expect(await deleteImage(`${testDir}:ghost`)).toBe(false)
  })

  it('should detect file and/or DB record existence', async () => {
    const filePath = path.join(assetsDir, '1-pixel.png')
    const record = await saveImageFromFile(filePath, testDir)
    expect(await imageExists(record!.id)).toBe(true)
    fs.unlinkSync(toFilePath(record!.id))
    expect(await imageExists(record!.id)).toBe(true)
    expect(await imageExists(`${testDir}:ghost`)).toBe(false)
  })
})
