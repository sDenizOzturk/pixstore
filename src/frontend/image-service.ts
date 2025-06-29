import {
  readImageRecord,
  writeImageRecord,
  deleteImageRecord,
  imageRecordExists,
} from './database.js'
import { fetchEncodedImage } from './image-fetcher.js'
import { decryptedPayloadToBlob } from './format-image.js'
import type { FrontendImageRecord } from '../types/frontend-image-record.js'
import { decryptImage } from './image-decryption.js'
import { decodeWirePayload } from '../shared/wire-encoder.js'
import { IndexedDBImageRecord } from '../types/indexeddb-image-record.js'

/**
 * Retrieves image data using token-based cache validation.
 * Returns the cached Blob if token matches; otherwise fetches, updates, and returns new Blob.
 */
export const getImage = async (
  record: FrontendImageRecord,
  context?: any,
): Promise<Blob> => {
  // Attempt to read the cached image from IndexedDB by ID
  const { id, token, meta } = record
  const cached = await readImageRecord(id)

  // If a cached image exists and the token matches, return it immediately
  if (cached && cached.token === token) {
    const indexedDBRecord = await readImageRecord(id)
    const encrypted = indexedDBRecord!.encrypted
    const imagePayload = await decryptImage({ encrypted, meta })
    return decryptedPayloadToBlob(imagePayload)
  }

  // Otherwise, fetch the latest encoded image from the backend
  const encoded = await fetchEncodedImage(record.id, context)

  // Decode the wire payload to extract encrypted data, meta, and token
  const decodedWirePayload = decodeWirePayload(encoded)

  // Prepare the IndexedDB record with fresh encrypted data and token
  const indexedDBRecord: IndexedDBImageRecord = {
    id,
    encrypted: decodedWirePayload.encrypted,
    token: decodedWirePayload.token,
    lastUsed: Date.now(),
  }

  // Save the updated image into the local cache
  await writeImageRecord(indexedDBRecord)

  // Decrypt the image using the extracted encrypted data and meta
  const imagePayload = await decryptImage({
    encrypted: decodedWirePayload.encrypted,
    meta: decodedWirePayload.meta,
  })

  // Return the up-to-date Blob for rendering
  return decryptedPayloadToBlob(imagePayload)
}

/**
 * Removes a cached image from IndexedDB.
 */
export const deleteCachedImage = async (id: string): Promise<void> => {
  await deleteImageRecord(id)
}

/**
 * Returns true if a cached image exists in IndexedDB for the given id.
 */
export const cachedImageExists = async (id: string): Promise<boolean> => {
  return await imageRecordExists(id)
}
