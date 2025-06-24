import 'fake-indexeddb/auto'
import {
  writeImageRecord,
  readImageRecord,
  deleteImageRecord,
  imageRecordExists,
  getAllImageRecords,
  deleteImageRecords,
  getImageRecordCount,
} from '../../../src/frontend/database'
import { FrontendImageRecord } from '../../../src/types/frontend-image-record'

const fakeBlob = new Blob(['test'], { type: 'image/png' })

describe('Frontend Database CRUD', () => {
  const id = 'city:1232323'
  const initialBlob = new Blob(['mockdata-1'], { type: 'image/jpeg' })
  const updatedBlob = new Blob(['mockdata-2'], { type: 'image/jpeg' })

  const record: FrontendImageRecord = {
    id,
    data: initialBlob,
    token: 42,
    lastUsed: Date.now(),
  }

  it('writes and reads an image record', async () => {
    await writeImageRecord(record)
    const result = await readImageRecord(id)
    expect(result).not.toBeNull()
    expect(result?.id).toBe(id)
    expect(result?.token).toBe(42)
    expect(result?.data).toBeInstanceOf(Blob)
    expect(result?.data.type).toBe('image/jpeg')
    // Check the blob content matches the original
    const text = await result!.data.text()
    expect(text).toBe('mockdata-1')
  })

  it('updates an image record and verifies blob/content change', async () => {
    const updated: FrontendImageRecord = {
      id,
      data: updatedBlob,
      token: 99,
      lastUsed: Date.now(),
    }
    await writeImageRecord(updated)
    const res = await readImageRecord(id)
    expect(res).not.toBeNull()
    expect(res?.token).toBe(99)
    expect(res?.data).toBeInstanceOf(Blob)
    expect(res?.data.type).toBe('image/jpeg')
    // Ensure the blob content is updated
    const text = await res!.data.text()
    expect(text).toBe('mockdata-2')
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
  it('returns 0 when no records exist', async () => {
    // Benzersiz id eklemeden önce tüm kayıtları sil
    const records = await getAllImageRecords()
    if (records.length > 0) {
      const ids = records.map((r) => r.id)
      await deleteImageRecords(ids)
    }
    const count = await getImageRecordCount()
    expect(count).toBe(0)
  })

  it('returns correct count after adding records', async () => {
    await writeImageRecord({
      id: 'count-1',
      token: 1,
      data: fakeBlob,
      lastUsed: Date.now(),
    })
    await writeImageRecord({
      id: 'count-2',
      token: 2,
      data: fakeBlob,
      lastUsed: Date.now(),
    })
    const count = await getImageRecordCount()
    expect(count).toBeGreaterThanOrEqual(2)
  })
})

describe('getAllImageRecords', () => {
  it('returns all records that were added', async () => {
    await writeImageRecord({
      id: 'all-1',
      token: 1,
      data: fakeBlob,
      lastUsed: Date.now(),
    })
    await writeImageRecord({
      id: 'all-2',
      token: 2,
      data: fakeBlob,
      lastUsed: Date.now(),
    })
    const records = await getAllImageRecords()
    const ids = records.map((r) => r.id)
    expect(ids).toContain('all-1')
    expect(ids).toContain('all-2')
  })
})

describe('deleteImageRecords', () => {
  it('deletes specified records in a single transaction', async () => {
    await writeImageRecord({
      id: 'del-1',
      token: 11,
      data: fakeBlob,
      lastUsed: Date.now(),
    })
    await writeImageRecord({
      id: 'del-2',
      token: 12,
      data: fakeBlob,
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
