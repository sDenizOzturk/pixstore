import {
  readImageRecord,
  writeImageRecord,
  deleteImageRecord,
} from './database.js'
import { fetchEncodedImage } from './image-fetcher.js'
import { formatEncodedImage } from './format-image.js'
import type { ImageRecord } from '../types/image-record.js'

/**
 * Retrieves image data using token-based cache validation.
 * Returns the cached Blob if token matches; otherwise fetches, updates, and returns new Blob.
 */
export const getImage = async (
  record: ImageRecord,
  context?: any,
): Promise<Blob> => {
  // Attempt to read the cached image from IndexedDB by ID
  const cached = await readImageRecord(record.id)

  // If a cached image exists and the token matches, return it immediately
  if (cached && cached.token === record.token) {
    return cached.data
  }

  console.log('FROM-API-context: ', context)

  // Otherwise, fetch the latest encoded image from the backend
  const encoded = await fetchEncodedImage(record.id, context)

  // Decode and convert the encoded payload into a usable image record
  const formatted = formatEncodedImage(record.id, encoded)

  // Save the updated image into the local cache
  await writeImageRecord(formatted)

  // Return the up-to-date Blob for rendering
  return formatted.data
}

/**
 * Retrieves a Blob from cache if available.
 * Returns null if not found.
 */
export const getCachedImage = async (id: string): Promise<Blob | null> => {
  const cached = await readImageRecord(id)
  return cached?.data ?? null
}

/**
 * Removes a cached image from IndexedDB.
 */
export const deleteCachedImage = async (id: string): Promise<void> => {
  await deleteImageRecord(id)
}
