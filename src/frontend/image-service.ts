import {
  readImageRecord,
  writeImageRecord,
  deleteImageRecord,
} from './database'
import { fetchEncodedImage } from './default-fetcher'
import { formatEncodedImage } from './format-image'
import { BackendImageRecord } from '../shared/models/backend-image-record'

/**
 * Retrieves image data using token-based cache validation.
 * Returns the cached Blob if token matches; otherwise fetches, updates, and returns new Blob.
 */
export async function getImage(record: BackendImageRecord): Promise<Blob> {
  // Attempt to read the cached image from IndexedDB by ID
  const cached = await readImageRecord(record.id)

  // If a cached image exists and the token matches, return it immediately
  if (cached && cached.token === record.token) {
    return cached.data
  }

  // Otherwise, fetch the latest encoded image from the backend
  const encoded = await fetchEncodedImage(record.id)

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
export async function getCachedImage(id: string): Promise<Blob | null> {
  const cached = await readImageRecord(id)
  return cached?.data ?? null
}

/**
 * Removes a cached image from IndexedDB.
 */
export async function deleteCachedImage(id: string): Promise<void> {
  await deleteImageRecord(id)
}
