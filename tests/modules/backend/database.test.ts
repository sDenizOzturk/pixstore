import {
  writeImageRecord,
  readImageRecord,
  deleteImageRecord,
  imageRecordExists,
  initializeDatabase,
} from '../../../src/backend/database.js'

import fs from 'fs'
import { sleep } from '../../utils'

import { randomBytes } from 'crypto'
import { pixstoreConfig } from '../../../src/shared/pixstore-config.js'

const dummyMeta = {
  key: randomBytes(32),
  iv: randomBytes(12),
  tag: randomBytes(16),
}

const DB_PATH = pixstoreConfig.databasePath

describe('firstWrite', () => {
  it('creates storage directory on first write', () => {
    initializeDatabase()
    writeImageRecord('first-write', dummyMeta)
    expect(fs.existsSync(DB_PATH)).toBe(true)
  })
})

describe('readImageRecord', () => {
  const testId = 'read-test'

  beforeAll(() => {
    initializeDatabase()
    writeImageRecord(testId, dummyMeta)
  })

  it('returns the correct record for existing id', () => {
    const result = readImageRecord(testId)
    expect(result).not.toBeNull()
    expect(result?.token).toBeGreaterThan(0)
  })

  it('returns null for non-existent id', () => {
    const result = readImageRecord('non-existent')
    expect(result).toBeNull()
  })
})

describe('writeImageRecord - update behavior', () => {
  const testId = 'write-update-test'

  it('overwrites record and generates new token', async () => {
    const initialWrite = writeImageRecord(testId, dummyMeta)
    await sleep(10) // ensure timestamp gap
    const overwrittenWrite = writeImageRecord(testId, dummyMeta)

    expect(overwrittenWrite.token).toBeGreaterThan(initialWrite.token)

    const latestRecord = readImageRecord(testId)
    expect(latestRecord?.token).toBe(overwrittenWrite.token)
  })
})

describe('deleteImageRecord', () => {
  const testId = 'delete-test'

  beforeEach(() => {
    writeImageRecord(testId, dummyMeta)
  })

  it('removes existing record', () => {
    deleteImageRecord(testId)
    const result = readImageRecord(testId)
    expect(result).toBeNull()
  })

  it('does not throw when record does not exist', () => {
    deleteImageRecord('non-existent-id') // should not throw
    // should not throw
  })
})

describe('imageRecordExists', () => {
  const testId = 'exists-test'

  it('returns true if record exists', () => {
    writeImageRecord(testId, dummyMeta)
    const exists = imageRecordExists(testId)
    expect(exists).toBe(true)
  })

  it('returns false if record does not exist', () => {
    deleteImageRecord(testId)
    const exists = imageRecordExists(testId)
    expect(exists).toBe(false)
  })
})
