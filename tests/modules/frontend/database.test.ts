import 'fake-indexeddb/auto'
import {
  writeImageRecord,
  readImageRecord,
  deleteImageRecord,
  imageRecordExists,
} from '../../../src/frontend/database'
import { FrontendImageRecord } from '../../../src/shared/models/frontend-image-record'

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
