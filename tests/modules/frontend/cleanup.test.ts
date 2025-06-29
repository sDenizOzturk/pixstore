import 'fake-indexeddb/auto'
import {
  writeImageRecord,
  getAllImageRecords,
  getImageRecordCount,
  deleteImageRecords,
} from '../../../src/frontend/database.js'
import { cleanupImageCache } from '../../../src/frontend/cleanup.js'

import { sleep } from '../../utils'
import { pixstoreConfig } from '../../../src/shared/pixstore-config.js'
import { IndexedDBImageRecord } from '../../../src/types/indexeddb-image-record.js'
const FRONTEND_IMAGE_CACHE_LIMIT = pixstoreConfig.frontendImageCacheLimit
const FRONTEND_CLEANUP_BATCH = pixstoreConfig.frontendCleanupBatch

const makeRecord = (id: string, offsetMs: number): IndexedDBImageRecord => ({
  id,
  encrypted: new Uint8Array([1, 2, 3]),
  token: Math.floor(Math.random() * 1e6),
  lastUsed: Date.now() - offsetMs,
})

describe('cleanupImageCache auto‐cleanup behavior', () => {
  beforeEach(async () => {
    // ensure a clean slate
    const all = await getAllImageRecords()
    if (all.length > 0) {
      await deleteImageRecords(all.map((r) => r.id))
    }
  })

  it(`automatically removes the oldest ${FRONTEND_CLEANUP_BATCH} records when limit exceeded`, async () => {
    const totalToAdd = FRONTEND_IMAGE_CACHE_LIMIT + 1

    // 1) insert totalToAdd records with oldest first
    for (let i = 0; i < totalToAdd; i++) {
      await writeImageRecord(makeRecord(`item-${i}`, (totalToAdd - i) * 100))
      await sleep(1)
    }

    // give background cleanup a moment to run
    await sleep(20)

    // 2) after writes, cache should have been auto‐cleaned down to the limit
    const countAfterAuto = await getImageRecordCount()
    expect(countAfterAuto).toBe(
      FRONTEND_IMAGE_CACHE_LIMIT - FRONTEND_CLEANUP_BATCH,
    )

    const remaining = await getAllImageRecords()
    const ids = remaining.map((r) => r.id)

    // 3) verify the oldest batch were removed
    for (let i = 0; i < FRONTEND_CLEANUP_BATCH + 1; i++) {
      expect(ids).not.toContain(`item-${i}`)
    }

    // 4) verify that all newer records remain
    for (let i = FRONTEND_CLEANUP_BATCH + 1; i < totalToAdd; i++) {
      expect(ids).toContain(`item-${i}`)
    }

    // 5) calling cleanupImageCache again should not change anything
    await cleanupImageCache()
    expect(await getImageRecordCount()).toBe(FRONTEND_IMAGE_CACHE_LIMIT - 5)
  })
})
