import {
  FRONTEND_DB_NAME,
  FRONTEND_DB_VERSION,
  IMAGE_STORE_NAME,
  TEMP_IMAGE_STORE_NAME,
} from '../constants'

let db: IDBDatabase | null = null

/**
 * Opens the frontend IndexedDB instance and ensures required object stores exist.
 * - Creates the main image store (`images`) if missing.
 * - Creates the temporary image store (`images_temp`) for atomic cleanup/migration.
 * Returns a promise that resolves to the IDBDatabase connection.
 */
export function openDatabase(): Promise<IDBDatabase> {
  if (db) return Promise.resolve(db)
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(FRONTEND_DB_NAME, FRONTEND_DB_VERSION)

    request.onupgradeneeded = (event) => {
      const db = request.result
      // Ensure the main image store exists
      if (!db.objectStoreNames.contains(IMAGE_STORE_NAME)) {
        db.createObjectStore(IMAGE_STORE_NAME, { keyPath: 'id' })
      }
      // Ensure the temp store exists (used for migration/cleanup)
      if (!db.objectStoreNames.contains(TEMP_IMAGE_STORE_NAME)) {
        db.createObjectStore(TEMP_IMAGE_STORE_NAME, { keyPath: 'id' })
      }
    }
    request.onsuccess = () => {
      db = request.result
      resolve(db)
    }
    request.onerror = () => reject(request.error)
  })
}
