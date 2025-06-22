import 'fake-indexeddb/auto'
import path from 'path'
import fs from 'fs/promises'
import { ImageRecord } from '../../../src/shared/models/image-record'
import {
  getImage,
  getCachedImage,
  deleteCachedImage,
} from '../../../src/frontend/image-service'
import { readImageRecord } from '../../../src/frontend/database'
import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint'
import { saveImage, updateImage } from '../../../src/backend/image-service'

const assetDir = path.resolve(__dirname, '../../assets')
const ANTALYA_PATH = path.join(assetDir, 'antalya.jpg')
const VILNIUS_PATH = path.join(assetDir, 'vilnius.jpg')

// helper: compare two Blobs byte-for-byte
const expectBlobsToBeEqual = async (a: Blob, b: Blob) => {
  const bufA = Buffer.from(await a.arrayBuffer())
  const bufB = Buffer.from(await b.arrayBuffer())
  expect(Buffer.compare(bufA, bufB)).toBe(0)
}

describe('frontend image-service – full flow', () => {
  let record: ImageRecord

  beforeAll(async () => {
    startDefaultEndpoint()
    const saved = await saveImage(await fs.readFile(ANTALYA_PATH), 'students')
    record = { id: saved.id, token: saved.token }
  })

  afterAll(async () => {
    await stopDefaultEndpoint()
  })

  it('caches, deletes, and refreshes image correctly with blob and token validation', async () => {
    // 1) Initial fetch: retrieve from backend and store in cache
    const blob1 = await getImage(record)
    expect(blob1).toBeInstanceOf(Blob)

    // 2) Compare blob content with original backend file
    const _originalBuffer = await fs.readFile(ANTALYA_PATH)
    const originalBuffer = new Blob([new Uint8Array(_originalBuffer)], {
      type: blob1.type,
    })
    await expectBlobsToBeEqual(blob1, originalBuffer)

    // 3) Ensure cached record token matches backend token
    const cachedRecord1 = await readImageRecord(record.id)
    expect(cachedRecord1).not.toBeNull()
    expect(cachedRecord1!.token).toBe(record.token)

    // 4) getCachedImage returns the same blob
    const cachedBlob1 = await getCachedImage(record.id)
    expect(cachedBlob1).toBeInstanceOf(Blob)
    await expectBlobsToBeEqual(cachedBlob1!, blob1)

    // 5) Delete from cache
    await deleteCachedImage(record.id)
    expect(await getCachedImage(record.id)).toBeNull()

    // 6) Re-fetch after deletion: should re-cache original blob
    const blob2 = await getImage(record)
    expect(blob2).toBeInstanceOf(Blob)
    await expectBlobsToBeEqual(blob2, blob1)

    // 7) Update backend image (same ID, new token)
    const updated = await updateImage(
      record.id,
      await fs.readFile(VILNIUS_PATH),
    )
    expect(updated.token).not.toBe(record.token)

    // 8) Token mismatch triggers cache update on getImage
    const blob3 = await getImage({ id: updated.id, token: updated.token })
    expect(blob3).toBeInstanceOf(Blob)
    const buf2 = Buffer.from(await blob2.arrayBuffer())
    const buf3 = Buffer.from(await blob3.arrayBuffer())
    expect(Buffer.compare(buf2, buf3)).not.toBe(0)

    // 9) Verify cached record has been updated with new token
    const cachedRecord2 = await readImageRecord(record.id)
    expect(cachedRecord2!.token).toBe(updated.token)

    // 10) Cached blob matches the updated blob
    const finalCached = await getCachedImage(record.id)
    expect(finalCached).toBeInstanceOf(Blob)
    await expectBlobsToBeEqual(finalCached!, blob3)
  })
})
