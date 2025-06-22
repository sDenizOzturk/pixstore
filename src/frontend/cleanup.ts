import {
  getImageRecordCount,
  getAllImageRecords,
  deleteImageRecords,
} from './database'
import { pixstoreConfig } from '../shared/pixstore-config'

const FRONTEND_IMAGE_CACHE_LIMIT = pixstoreConfig.frontendImageCacheLimit
const FRONTEND_CLEANUP_BATCH = pixstoreConfig.frontendCleanupBatch
/**
 * Removes the oldest cached images if the cache limit is exceeded.
 * Uses an LRU (least recently used) policy based on the 'lastUsed' field.
 */
export const cleanupImageCache = async (): Promise<void> => {
  // 1. Get the current cache size
  const totalImages = await getImageRecordCount()
  if (totalImages <= FRONTEND_IMAGE_CACHE_LIMIT) return

  // 2. Fetch all records
  const allRecords = await getAllImageRecords()
  // 3. Sort records by lastUsed (oldest first)
  allRecords.sort((a, b) => a.lastUsed - b.lastUsed)
  // 4. Select the oldest N records for deletion
  const deletingRecords = allRecords
    .slice(0, FRONTEND_CLEANUP_BATCH)
    .map((record) => record.id)

  // 5. Delete them in a single transaction
  await deleteImageRecords(deletingRecords)
}
