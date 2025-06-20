import 'fake-indexeddb/auto'
import {
  writeImageRecord,
  getAllImageRecords,
  getImageRecordCount,
  deleteImageRecords,
} from '../../../src/frontend/database'
import { cleanupImageCache } from '../../../src/frontend/cleanup'
import {
  FRONTEND_IMAGE_CACHE_LIMIT,
  FRONTEND_CLEANUP_BATCH,
} from '../../../src/constants'
import { sleep } from '../../utils'

const makeRecord = (id: string, offsetMs: number) => ({
  id,
  data: new Blob(['img'], { type: 'image/png' }),
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
    const totalToAdd = FRONTEND_IMAGE_CACHE_LIMIT + FRONTEND_CLEANUP_BATCH

    // 1) insert totalToAdd records with oldest first
    for (let i = 0; i < totalToAdd; i++) {
      await writeImageRecord(makeRecord(`item-${i}`, (totalToAdd - i) * 100))
      await sleep(1)
    }

    // give background cleanup a moment to run
    await sleep(20)

    // 2) after writes, cache should have been auto‐cleaned down to the limit
    const countAfterAuto = await getImageRecordCount()
    expect(countAfterAuto).toBe(FRONTEND_IMAGE_CACHE_LIMIT)

    const remaining = await getAllImageRecords()
    const ids = remaining.map((r) => r.id)

    // 3) verify the oldest batch were removed
    for (let i = 0; i < FRONTEND_CLEANUP_BATCH; i++) {
      expect(ids).not.toContain(`item-${i}`)
    }

    // 4) verify that all newer records remain
    for (let i = FRONTEND_CLEANUP_BATCH; i < totalToAdd; i++) {
      expect(ids).toContain(`item-${i}`)
    }

    // 5) calling cleanupImageCache again should not change anything
    await cleanupImageCache()
    expect(await getImageRecordCount()).toBe(FRONTEND_IMAGE_CACHE_LIMIT)
  })
})
