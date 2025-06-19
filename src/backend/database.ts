import Database from 'better-sqlite3'

import { BackendImageRecord } from '../shared/models/backend-image-record'

const dbPath =
  process.env.NODE_ENV === 'test'
    ? './.pixstore-test.sqlite'
    : './.pixstore.sqlite'

// Ensure file exists; better-sqlite3 creates it if missing
const db = new Database(dbPath)

// Initialize table (once)
db.exec(
  `CREATE TABLE IF NOT EXISTS image_records (
    id TEXT PRIMARY KEY,
    token INTEGER NOT NULL
  )`,
)

/**
 * Inserts or updates an image record with the given ID.
 * If the ID already exists, the token is updated.
 */
export const writeImageRecord = (id: string): BackendImageRecord => {
  const token = Date.now()
  const stmt = db.prepare(
    `INSERT INTO image_records (id, token)
    VALUES (?, ?)
    ON CONFLICT(id) DO UPDATE SET token=excluded.token`,
  )
  stmt.run(id, token)

  return { id, token }
}

/**
 * Retrieves the image record with the given ID.
 * Returns null if the record does not exist.
 */
export const readImageRecord = (id: string): BackendImageRecord | null => {
  const row = db
    .prepare(`SELECT id, token FROM image_records WHERE id = ?`)
    .get(id)
  return row ? (row as BackendImageRecord) : null
}

/**
 * Deletes the image record with the given ID.
 * Does nothing if the ID does not exist.
 */
export const deleteImageRecord = (id: string) => {
  const stmt = db.prepare(`DELETE FROM image_records WHERE id = ?`)
  stmt.run(id)
}

/**
 * Checks whether an image record with the given ID exists.
 */
export const imageRecordExists = (id: string): boolean => {
  const stmt = db.prepare(`SELECT 1 FROM image_records WHERE id = ?`)
  return !!stmt.get(id)
}
