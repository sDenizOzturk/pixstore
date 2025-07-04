import path from 'path'
import {
  getImageRecord,
  deleteImage,
  saveImage,
  updateImage,
  getWirePayload,
} from '../../src/backend/image-service.js'
import fs from 'fs'
import { initializeDatabase } from '../../src/backend/database.js'

const assetsDir = path.resolve(__dirname, '../assets')
const imageFile = path.join(assetsDir, 'antalya.jpg')
const imageFile2 = path.join(assetsDir, 'vilnius.jpg')
const N = 100

beforeAll(() => {
  initializeDatabase()
})

describe('Pixstore backend highload scenario', () => {
  const prefix = 'stress'
  const ids: string[] = []

  it('should save a large number of images', async () => {
    const buffer = fs.readFileSync(imageFile)

    for (let i = 0; i < N; ++i) {
      const record = await saveImage(buffer, prefix)
      expect(record).not.toBeNull()
      ids.push(record!.id)
    }
  })
  it('should read all images', async () => {
    for (const id of ids) {
      const payload = await getWirePayload(id, undefined)
      // Only assert encrypted if image is found and state is Success/Updated
      if (
        payload.state === 0 || // WirePayloadState.Success
        payload.state === 1 // WirePayloadState.Updated
      ) {
        expect(payload.encrypted.length).toBeGreaterThan(0)
      } else {
        throw new Error(
          `Image not found or wrong state for id: ${id}, state=${payload.state}`,
        )
      }
    }
  })

  it('should update all images', async () => {
    const buffer2 = fs.readFileSync(imageFile2)
    for (const id of ids) {
      await updateImage(id, buffer2)
      const payload = await getWirePayload(id, undefined)
      if (
        payload.state === 0 || // WirePayloadState.Success
        payload.state === 1 // WirePayloadState.Updated
      ) {
        expect(payload.encrypted.length).toBeGreaterThan(0)
      } else {
        throw new Error(
          `Image not found or wrong state for id: ${id}, state=${payload.state}`,
        )
      }
    }
  })

  it('should read all images after update', async () => {
    for (const id of ids) {
      const payload = await getWirePayload(id, undefined)
      if (
        payload.state === 0 || // WirePayloadState.Success
        payload.state === 1 // WirePayloadState.Updated
      ) {
        expect(payload.encrypted.length).toBeGreaterThan(0)
      } else {
        throw new Error(
          `Image not found or wrong state for id: ${id}, state=${payload.state}`,
        )
      }
    }
  })

  it('should delete all images', async () => {
    for (const id of ids) {
      expect(await deleteImage(id)).toBe(true)
    }
  })
})
