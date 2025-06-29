import 'fake-indexeddb/auto'
import {
  writeImageRecord,
  readImageRecord,
  deleteImageRecord,
  imageRecordExists,
  getAllImageRecords,
  deleteImageRecords,
  getImageRecordCount,
} from '../../../src/frontend/database.js'
import type { IndexedDBImageRecord } from '../../../src/types/indexeddb-image-record.js'

describe('Frontend Database CRUD', () => {
  const id = 'city:1232323'
  const initialEncrypted = new Uint8Array([1, 2, 3])
  const updatedEncrypted = new Uint8Array([4, 5, 6])

  const record: IndexedDBImageRecord = {
    id,
    encrypted: initialEncrypted,
    token: 42,
    lastUsed: Date.now(),
  }

  it('writes and reads an image record', async () => {
    await writeImageRecord(record)
    const result = await readImageRecord(id)
    expect(result).not.toBeNull()
    expect(result!.id).toBe(record.id)
    expect(result!.token).toBe(record.token)
    expect(result!.encrypted).toBeInstanceOf(Uint8Array)
    expect(result!.encrypted).toEqual(initialEncrypted)
    expect(typeof result!.lastUsed).toBe('number')
  })

  it('updates an image record and verifies encrypted change', async () => {
    const updated: IndexedDBImageRecord = {
      id,
      encrypted: updatedEncrypted,
      token: 99,
      lastUsed: Date.now(),
    }
    await writeImageRecord(updated)
    const res = await readImageRecord(id)
    expect(res).not.toBeNull()
    expect(res!.token).toBe(99)
    expect(res!.encrypted).toEqual(updatedEncrypted)
  })

  it('checks for record existence', async () => {
    expect(await imageRecordExists(id)).toBe(true)
    expect(await imageRecordExists('nonexistent')).toBe(false)
  })

  it('deletes an image record and confirms deletion', async () => {
    await deleteImageRecord(id)
    const res = await readImageRecord(id)
    expect(res).toBeNull()
    expect(await imageRecordExists(id)).toBe(false)
  })
})

describe('getImageRecordCount', () => {
  beforeEach(async () => {
    // clear all records
    const all = await getAllImageRecords()
    if (all.length) {
      await deleteImageRecords(all.map((r) => r.id))
    }
  })

  it('returns 0 when no records exist', async () => {
    expect(await getImageRecordCount()).toBe(0)
  })

  it('returns correct count after adding records', async () => {
    await writeImageRecord({
      id: 'count-1',
      encrypted: new Uint8Array([1]),
      token: 1,
      lastUsed: Date.now(),
    })
    await writeImageRecord({
      id: 'count-2',
      encrypted: new Uint8Array([2]),
      token: 2,
      lastUsed: Date.now(),
    })
    const count = await getImageRecordCount()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})

describe('getAllImageRecords', () => {
  beforeEach(async () => {
    const all = await getAllImageRecords()
    if (all.length) {
      await deleteImageRecords(all.map((r) => r.id))
    }
  })

  it('returns all records that were added', async () => {
    await writeImageRecord({
      id: 'all-1',
      encrypted: new Uint8Array([1]),
      token: 1,
      lastUsed: Date.now(),
    })
    await writeImageRecord({
      id: 'all-2',
      encrypted: new Uint8Array([2]),
      token: 2,
      lastUsed: Date.now(),
    })
    const records = await getAllImageRecords()
    const ids = records.map((r) => r.id)
    expect(ids).toContain('all-1')
    expect(ids).toContain('all-2')
  })
})

describe('deleteImageRecords', () => {
  beforeEach(async () => {
    const all = await getAllImageRecords()
    if (all.length) {
      await deleteImageRecords(all.map((r) => r.id))
    }
  })

  it('deletes specified records in a single transaction', async () => {
    await writeImageRecord({
      id: 'del-1',
      encrypted: new Uint8Array([1]),
      token: 11,
      lastUsed: Date.now(),
    })
    await writeImageRecord({
      id: 'del-2',
      encrypted: new Uint8Array([2]),
      token: 12,
      lastUsed: Date.now(),
    })
    await deleteImageRecords(['del-1', 'del-2'])
    const records = await getAllImageRecords()
    const ids = records.map((r) => r.id)
    expect(ids).not.toContain('del-1')
    expect(ids).not.toContain('del-2')
  })

  it('does not throw if records do not exist', async () => {
    await expect(
      deleteImageRecords(['nonexistent-1', 'nonexistent-2']),
    ).resolves.not.toThrow()
  })
})
