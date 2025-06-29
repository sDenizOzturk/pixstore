import '../../utils/frontend-crypto-polyfill.js'

import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint'
import { saveImageFromFile } from '../../../src/backend/image-service'
import { fetchEncodedImage } from '../../../src/frontend/image-fetcher'
import { decodeWirePayload } from '../../../src/shared/wire-encoder'
import fs from 'fs/promises'
import path from 'path'
import { ImageRecord } from '../../../src/types/image-record'
import { initializeDatabase } from '../../../src/backend/database'
import { byteToImageFormat } from '../../../src/shared/format-image'
import { decryptImage } from '../../../src/frontend/image-decryption.js'

const assetsDir = path.resolve(__dirname, '../../assets')
const TEST_IMAGE_PATH = path.join(assetsDir, 'antalya.jpg')

beforeAll(() => {
  initializeDatabase()
  startDefaultEndpoint()
})
afterAll(async () => {
  await stopDefaultEndpoint()
})

describe('fetchEncodedImage (integration)', () => {
  let record: ImageRecord
  beforeAll(async () => {
    record = await saveImageFromFile(TEST_IMAGE_PATH)
  })

  it('fetches and decodes the image as expected', async () => {
    const encoded = await fetchEncodedImage(record.id)

    const { encrypted, meta, token } = decodeWirePayload(encoded)

    expect(meta).toBeDefined()
    expect(encrypted).toBeInstanceOf(Uint8Array)
    expect(encrypted.length).toBeGreaterThan(0)

    expect(token).toBe(record.token)

    expect(meta.key).toEqual(record.meta.key)
    expect(meta.iv).toEqual(record.meta.iv)
    expect(meta.tag).toEqual(record.meta.tag)

    const decrypted = await decryptImage(encrypted, meta)

    expect(decrypted.format).toBe('jpg')
    expect(decrypted.buffer).toBeInstanceOf(Uint8Array)
    expect(decrypted.buffer.length).toBeGreaterThan(0)

    const original = await fs.readFile(TEST_IMAGE_PATH)
    expect(decrypted.buffer.length).toEqual(original.length)
    expect(token).toBe(record.token)
  })

  it('throws if the image does not exist', async () => {
    await expect(fetchEncodedImage('fetcher:notfound')).rejects.toThrow(
      'Failed to fetch image',
    )
  })
})
