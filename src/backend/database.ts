import BetterSqlite3 from 'better-sqlite3'

import type { BackendImageRecord } from '../types/backend-image-record.js'
import { pixstoreConfig } from '../shared/pixstore-config.js'
import { ImageEncryptionMeta } from '../types/image-encryption-meta.js'

let database: InstanceType<typeof BetterSqlite3> | null = null

/**
 * Initializes the SQLite database connection and ensures the required table exists.
 * Assigns the database instance to the global `database` variable for reuse.
 * The database file is created automatically if it doesn't exist.
 * This function should be called once during application startup.
 */
export const initializeDatabase = () => {
  const DATABASE_PATH = pixstoreConfig.databasePath

  // Ensure file exists; better-sqlite3 creates it if missing
  database = new BetterSqlite3(DATABASE_PATH)

  // Initialize table (once)
  database.exec(
    `CREATE TABLE IF NOT EXISTS image_records (
      id TEXT PRIMARY KEY,
      token INTEGER NOT NULL,
      meta TEXT NOT NULL
    )`,
  )
}

/**
 * Inserts or updates an image record with the given ID.
 * If the ID already exists, the token is updated.
 */
export const writeImageRecord = (
  id: string,
  meta: ImageEncryptionMeta,
): BackendImageRecord => {
  const token = Date.now()
  const metaStr = JSON.stringify(meta)
  const statement = database!.prepare(
    `INSERT INTO image_records (id, token, meta)
     VALUES (?, ?, ?)
     ON CONFLICT(id) DO UPDATE SET token=excluded.token, meta=excluded.meta`,
  )
  statement.run(id, token, metaStr)

  return { id, token, meta }
}

/**
 * Retrieves the image record with the given ID.
 * Returns null if the record does not exist.
 */
export const readImageRecord = (id: string): BackendImageRecord | null => {
  const row = database!
    .prepare(`SELECT id, token, meta FROM image_records WHERE id = ?`)
    .get(id) as { id: string; token: number; meta: string } | undefined

  if (!row) return null

  // Parse meta and fix Buffer-serialized fields if necessary
  const rawMeta = JSON.parse(row.meta) as any
  const fixBuffer = (b: any): Buffer =>
    Buffer.isBuffer(b) ? b : Buffer.from(Array.isArray(b) ? b : b.data) // covers both [1,2,3] and {data:[1,2,3]}

  const meta: ImageEncryptionMeta = {
    key: fixBuffer(rawMeta.key),
    iv: fixBuffer(rawMeta.iv),
    tag: fixBuffer(rawMeta.tag),
  }

  return {
    id: row.id,
    token: row.token,
    meta,
  }
}

/**
 * Deletes the image record with the given ID.
 * Does nothing if the ID does not exist.
 */
export const deleteImageRecord = (id: string) => {
  const statement = database!.prepare(`DELETE FROM image_records WHERE id = ?`)
  statement.run(id)
}

/**
 * Checks whether an image record with the given ID exists.
 */
export const imageRecordExists = (id: string): boolean => {
  const statement = database!.prepare(
    `SELECT 1 FROM image_records WHERE id = ?`,
  )
  return !!statement.get(id)
}
