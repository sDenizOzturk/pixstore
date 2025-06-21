import {
  FRONTEND_DB_NAME,
  FRONTEND_DB_VERSION,
  IMAGE_STORE_NAME,
  TEMP_IMAGE_STORE_NAME,
} from '../constants'
import { FrontendImageRecord } from '../shared/models/frontend-image-record'
import { cleanupImageCache } from './cleanup'

let database: IDBDatabase | null = null

/**
 * Opens the frontend IndexedDB instance and ensures required object stores exist.
 * - Creates the main image store (`images`) if missing.
 * - Creates the temporary image store (`images_temp`) for atomic cleanup/migration.
 * Returns a promise that resolves to the IDBDatabase connection.
 */
export const openDatabase = (): Promise<IDBDatabase> => {
  if (database) return Promise.resolve(database)
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FRONTEND_DB_NAME, FRONTEND_DB_VERSION)

    request.onupgradeneeded = (event) => {
      const database = request.result
      // Ensure the main image store exists
      if (!database.objectStoreNames.contains(IMAGE_STORE_NAME)) {
        database.createObjectStore(IMAGE_STORE_NAME, { keyPath: 'id' })
      }
      // Ensure the temp store exists (used for migration/cleanup)
      if (!database.objectStoreNames.contains(TEMP_IMAGE_STORE_NAME)) {
        database.createObjectStore(TEMP_IMAGE_STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => {
      database = request.result
      resolve(database)
    }
    request.onerror = () => reject(request.error)
  })
}

/**
 * Reads an image record from IndexedDB by its id.
 * Returns the FrontendImageRecord if found, otherwise null.
 */
export const readImageRecord = async (
  id: string,
): Promise<FrontendImageRecord | null> => {
  // Wait for the IndexedDB connection to be available
  const database = await openDatabase()
  // Start a readonly transaction on the main image store
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readonly')
  const store = transaction.objectStore(IMAGE_STORE_NAME)
  // Attempt to get the record by id
  return await new Promise<FrontendImageRecord | null>((resolve, reject) => {
    const request = store.get(id)
    request.onsuccess = () => {
      // If record exists, resolve with the object; else resolve with null
      resolve(request.result ?? null)
    }
    request.onerror = () => reject(request.error)
  })
}

/**
 * Saves an image record to IndexedDB.
 * If a record with the same id exists, it will be overwritten.
 * Uses 'put' operation (insert or update).
 */
export const writeImageRecord = async (
  record: FrontendImageRecord,
): Promise<void> => {
  // Wait for the IndexedDB connection to be available
  const database = await openDatabase()
  // Start a readwrite transaction on the main image store
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readwrite')
  const store = transaction.objectStore(IMAGE_STORE_NAME)
  // Put the record (insert or update)
  await new Promise<void>((resolve, reject) => {
    const request = store.put(record)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })

  cleanupImageCache()
}

/**
 * Deletes an image record from IndexedDB by its id.
 * If the record does not exist, does nothing (no error).
 */
export const deleteImageRecord = async (id: string): Promise<void> => {
  // Wait for the IndexedDB connection to be available
  const database = await openDatabase()
  // Start a readwrite transaction on the main image store
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readwrite')
  const store = transaction.objectStore(IMAGE_STORE_NAME)
  // Delete the record by id
  await new Promise<void>((resolve, reject) => {
    const request = store.delete(id)
    request.onsuccess = () => resolve()
    request.onerror = () => reject(request.error)
  })
}

/**
 * Checks if an image record exists in IndexedDB by its id.
 * Resolves to true if the record exists, otherwise false.
 */
export const imageRecordExists = async (id: string): Promise<boolean> => {
  // Wait for the IndexedDB connection to be available
  const database = await openDatabase()
  // Start a readonly transaction on the main image store
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readonly')
  const store = transaction.objectStore(IMAGE_STORE_NAME)
  // Get the record by id and check if result is not undefined
  return await new Promise<boolean>((resolve, reject) => {
    const request = store.get(id)
    request.onsuccess = () => resolve(request.result !== undefined)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Returns the total number of image records in the main IndexedDB store.
 * Uses the IndexedDB count() operation.
 */
export const getImageRecordCount = async (): Promise<number> => {
  const database = await openDatabase()
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readonly')
  const store = transaction.objectStore(IMAGE_STORE_NAME)
  return await new Promise<number>((resolve, reject) => {
    const request = store.count()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Returns all image records from IndexedDB as an array.
 * Reads the entire contents of the image store.
 */
export const getAllImageRecords = async (): Promise<FrontendImageRecord[]> => {
  const database = await openDatabase()
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readonly')
  const store = transaction.objectStore(IMAGE_STORE_NAME)
  return await new Promise<FrontendImageRecord[]>((resolve, reject) => {
    const request = store.getAll()
    request.onsuccess = () => resolve(request.result)
    request.onerror = () => reject(request.error)
  })
}

/**
 * Deletes multiple image records by their ids in a single transaction.
 * If any deletion fails, the transaction is rolled back.
 */
export const deleteImageRecords = async (ids: string[]): Promise<void> => {
  const database = await openDatabase()
  const transaction = database.transaction(IMAGE_STORE_NAME, 'readwrite')
  const store = transaction.objectStore(IMAGE_STORE_NAME)

  await new Promise<void>((resolve, reject) => {
    for (const id of ids) {
      store.delete(id)
    }

    transaction.oncomplete = () => resolve()
    transaction.onerror = () => reject(transaction.error)
  })
}
