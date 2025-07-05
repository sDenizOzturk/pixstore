import {
  readImageRecord,
  writeImageRecord,
  deleteImageRecord,
  imageRecordExists,
} from './database.js'
import { fetchEncodedImage } from './image-fetcher.js'
import { decryptedPayloadToBlob } from './format-image.js'
import type { ImageRecord } from '../types/image-record.js'
import { decryptImage } from './image-decryption.js'
import { decodeWirePayload } from '../shared/wire-encoder.js'
import { IndexedDBImageRecord } from '../types/indexeddb-image-record.js'
import { handleErrorAsync } from '../shared/handle-error.js'
import { WirePayloadState } from '../types/wire-payload.js'
import { PixstoreError } from '../shared/pixstore-error.js'

/**
 * Retrieves image data using token-based cache validation.
 * Returns the cached Blob if token matches; otherwise fetches, updates, and returns new Blob.
 */
export const getImage = async (
  record: ImageRecord,
  context?: unknown,
): Promise<Blob | null> => {
  return handleErrorAsync(async () => {
    // Attempt to read the cached image from IndexedDB by ID
    const { id, token, meta } = record
    const cached = await readImageRecord(id)

    // If a cached image exists and the token matches, return it immediately
    if (cached && cached.token === token) {
      const indexedDBRecord = await readImageRecord(id)
      const encrypted = indexedDBRecord!.encrypted

      // Decrypt the image using the extracted encrypted data and meta
      const imagePayload = await decryptImage(encrypted, meta)

      // Update lastUsed timestamp (wihtout awaiting)
      writeImageRecord({
        ...indexedDBRecord!,
        lastUsed: Date.now(),
      })

      // Return the up-to-date Blob for rendering
      return decryptedPayloadToBlob(imagePayload)
    }

    // Otherwise, fetch the latest encoded image from the backend
    const encoded = await fetchEncodedImage(record, context)

    // Decode the wire payload to extract encrypted data, meta, and token
    const decodedWirePayload = decodeWirePayload(encoded)

    // Ensure response state is Success or Updated; throw on error or not found.
    if (
      decodedWirePayload.state !== WirePayloadState.Success &&
      decodedWirePayload.state !== WirePayloadState.Updated
    )
      throw new PixstoreError(
        `Image fetch failed: state=${
          WirePayloadState[decodedWirePayload.state] || decodedWirePayload.state
        } (not Success/Updated)`,
      )

    // Use the correct token depending on response state (Success uses old token, Updated uses fresh token)
    const latestToken =
      decodedWirePayload.state === WirePayloadState.Success
        ? token
        : decodedWirePayload.token

    // Prepare the IndexedDB record with fresh encrypted data and token
    const indexedDBRecord: IndexedDBImageRecord = {
      id,
      encrypted: decodedWirePayload.encrypted,
      token: latestToken,
      lastUsed: Date.now(),
    }

    // Save the updated image into the local cache (wihtout awaiting)
    writeImageRecord(indexedDBRecord)

    // Use the correct meta depending on response state (Success keeps old meta, Updated uses new meta)
    const latestMeta =
      decodedWirePayload.state === WirePayloadState.Success
        ? meta
        : decodedWirePayload.meta

    // Decrypt the image using the encrypted data and meta from the wire payload.
    // The `record.meta` is not used, using stale meta could break decryption if the image was recently updated.
    const imagePayload = await decryptImage(
      decodedWirePayload.encrypted,
      latestMeta,
    )

    // Return the up-to-date Blob for rendering
    return decryptedPayloadToBlob(imagePayload)
  })
}

/**
 * Removes a cached image from IndexedDB.
 */
export const deleteCachedImage = async (id: string): Promise<void | null> => {
  return handleErrorAsync(async () => {
    // Deletes the image record (by ID) from the local IndexedDB cache
    await deleteImageRecord(id)
  })
}

/**
 * Returns true if a cached image exists in IndexedDB for the given id.
 */
export const cachedImageExists = async (
  id: string,
): Promise<boolean | null> => {
  return handleErrorAsync(async () => {
    // Checks IndexedDB for an image record with the specified ID
    return await imageRecordExists(id)
  })
}
