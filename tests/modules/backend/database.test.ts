import {
  writeImageRecord,
  readImageRecord,
  deleteImageRecord,
  imageRecordExists,
} from '../../../src/backend/database'

import fs from 'fs'

const dbPath =
  process.env.NODE_ENV === 'test'
    ? './.pixstore-test.sqlite'
    : './.pixstore.sqlite'

describe('firstWrite', () => {
  it('creates storage directory on first write', () => {
    writeImageRecord('first-write')
    expect(fs.existsSync(dbPath)).toBe(true)
  })
})

describe('readImageRecord', () => {
  const testId = 'read-test'

  beforeAll(() => {
    writeImageRecord(testId)
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
    const initialWrite = writeImageRecord(testId)
    await new Promise((res) => setTimeout(res, 10)) // ensure timestamp gap
    const overwrittenWrite = writeImageRecord(testId)

    expect(overwrittenWrite.token).toBeGreaterThan(initialWrite.token)

    const latestRecord = readImageRecord(testId)
    expect(latestRecord?.token).toBe(overwrittenWrite.token)
  })
})

describe('deleteImageRecord', () => {
  const testId = 'delete-test'

  beforeEach(() => {
    writeImageRecord(testId)
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
    writeImageRecord(testId)
    const exists = imageRecordExists(testId)
    expect(exists).toBe(true)
  })

  it('returns false if record does not exist', () => {
    deleteImageRecord(testId)
    const exists = imageRecordExists(testId)
    expect(exists).toBe(false)
  })
})
