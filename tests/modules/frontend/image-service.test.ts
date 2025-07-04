import '../../utils/frontend-crypto-polyfill.js'
import 'fake-indexeddb/auto'
import path from 'path'
import fs from 'fs/promises'
import { ImageRecord } from '../../../src/types/image-record.js'
import {
  getImage,
  deleteCachedImage,
  cachedImageExists,
} from '../../../src/frontend/image-service.js'
import { readImageRecord } from '../../../src/frontend/database.js'
import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint.js'
import { saveImage, updateImage } from '../../../src/backend/image-service.js'
import { initializeDatabase } from '../../../src/backend/database.js'
import { getCurrentStatelessProof } from '../../../src/backend/stateless-proof.js'
import { sleep } from '../../utils/'

const assetDir = path.resolve(__dirname, '../../assets')
const ANTALYA_PATH = path.join(assetDir, 'antalya.jpg')
const VILNIUS_PATH = path.join(assetDir, 'vilnius.jpg')

// Helper: compare two Blobs byte-for-byte
const expectBlobsToBeEqual = async (a: Blob, b: Blob) => {
  const bufA = Buffer.from(await a.arrayBuffer())
  const bufB = Buffer.from(await b.arrayBuffer())
  expect(Buffer.compare(bufA, bufB)).toBe(0)
}

beforeAll(() => {
  initializeDatabase()
})

describe('Pixstore frontend image-service – full flow', () => {
  let record: ImageRecord

  beforeAll(async () => {
    startDefaultEndpoint()
    const saved = await saveImage(await fs.readFile(ANTALYA_PATH), 'students')
    record = {
      id: saved!.id,
      token: saved!.token,
      meta: {
        key: saved!.meta.key,
        iv: saved!.meta.iv,
        tag: saved!.meta.tag,
      },
      statelessProof: getCurrentStatelessProof(saved!.id),
    }
  })

  afterAll(async () => {
    await stopDefaultEndpoint()
  })

  it('updates lastUsed timestamp on cache hit', async () => {
    // Ensure image is cached
    record.statelessProof = getCurrentStatelessProof(record.id)
    await getImage(record)

    const before = (await readImageRecord(record.id))!.lastUsed

    // Wait to separate timestamps
    await sleep(50)

    // Trigger cache hit
    record.statelessProof = getCurrentStatelessProof(record.id)
    await getImage(record)

    // Wait again for background write to complete
    await sleep(50)

    const after = (await readImageRecord(record.id))!.lastUsed
    expect(after).toBeGreaterThan(before)
  })

  it('caches, deletes, and refreshes image correctly with blob and token validation', async () => {
    // 1) Initial fetch: retrieve from backend and store in cache
    record.statelessProof = getCurrentStatelessProof(record.id)
    const blob1 = await getImage(record)
    expect(blob1).toBeInstanceOf(Blob)

    // 2) Compare blob content with original backend file
    const _originalBuffer = await fs.readFile(ANTALYA_PATH)
    const originalBlob = new Blob([new Uint8Array(_originalBuffer)], {
      type: blob1!.type,
    })
    await expectBlobsToBeEqual(blob1!, originalBlob)

    // 3) Ensure cached record token matches backend token
    const cachedRecord1 = await readImageRecord(record.id)
    expect(cachedRecord1).not.toBeNull()
    expect(cachedRecord1!.token).toBe(record.token)

    // 4) Cache existence check
    const exists1 = await cachedImageExists(record.id)
    expect(exists1).toBe(true)

    // 5) Delete from cache
    await deleteCachedImage(record.id)
    const exists2 = await cachedImageExists(record.id)
    expect(exists2).toBe(false)

    // 6) Re-fetch after deletion: should re-cache original blob
    record.statelessProof = getCurrentStatelessProof(record.id)
    const blob2 = await getImage(record)
    expect(blob2).toBeInstanceOf(Blob)
    await expectBlobsToBeEqual(blob2!, blob1!)

    // 7) Update backend image (same ID, new token/meta)
    const updated = await updateImage(
      record.id,
      await fs.readFile(VILNIUS_PATH),
    )
    expect(updated!.token).not.toBe(record.token)
    const updatedRecord: ImageRecord = {
      id: updated!.id,
      token: updated!.token,
      meta: {
        key: updated!.meta.key,
        iv: updated!.meta.iv,
        tag: updated!.meta.tag,
      },
      statelessProof: getCurrentStatelessProof(updated!.id),
    }

    // 8) Token mismatch triggers cache update on getImage
    updatedRecord.statelessProof = getCurrentStatelessProof(updatedRecord.id)
    const blob3 = await getImage(updatedRecord)
    expect(blob3).toBeInstanceOf(Blob)
    const buf2 = Buffer.from(await blob2!.arrayBuffer())
    const buf3 = Buffer.from(await blob3!.arrayBuffer())
    expect(Buffer.compare(buf2, buf3)).not.toBe(0)

    // 9) Verify cached record has been updated with new token
    const cachedRecord2 = await readImageRecord(record.id)
    expect(cachedRecord2!.token).toBe(updated!.token)

    // 10) Final cache existence check
    const existsFinal = await cachedImageExists(record.id)
    expect(existsFinal).toBe(true)
  })
})
