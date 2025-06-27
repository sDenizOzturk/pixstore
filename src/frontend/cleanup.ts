import {
  getImageRecordCount,
  getAllImageRecords,
  deleteImageRecords,
} from './database.js'
import { pixstoreConfig } from '../shared/pixstore-config.js'

let cleaningUp = false

/**
 * Removes all excess cached images if the cache limit is exceeded.
 * Enforces a strict LRU (least recently used) policy using the 'lastUsed' timestamp.
 *
 * If the cache exceeds the configured limit, all oldest images above the limit are deleted
 * in a single batch, guaranteeing the cache never holds more than the allowed number of images.
 *
 * This is more robust than incremental/batch cleanup and is suitable for most use cases.
 */
export const cleanupImageCache = async (): Promise<void> => {
  if (cleaningUp) {
    return
  }
  cleaningUp = true
  const FRONTEND_IMAGE_CACHE_LIMIT = pixstoreConfig.frontendImageCacheLimit
  const FRONTEND_CLEANUP_BATCH = pixstoreConfig.frontendCleanupBatch

  // 1. Check the current cache size
  const totalImages = await getImageRecordCount()
  if (totalImages <= FRONTEND_IMAGE_CACHE_LIMIT) {
    cleaningUp = false
    return
  }

  // 2. Fetch all image records from the cache
  const allRecords = await getAllImageRecords()

  // 3. Sort records by lastUsed (oldest images first)
  allRecords.sort((a, b) => a.lastUsed - b.lastUsed)

  // 4. Calculate how many images exceed the limit
  const excessCount =
    totalImages - FRONTEND_IMAGE_CACHE_LIMIT + FRONTEND_CLEANUP_BATCH
  if (excessCount <= 0) return

  // 5. Select the oldest images to delete
  const deletingRecords = allRecords
    .slice(0, excessCount)
    .map((record) => record.id)

  // 6. Remove the selected images from cache in a single transaction
  await deleteImageRecords(deletingRecords)

  cleaningUp = false
  await cleanupImageCache()
}
