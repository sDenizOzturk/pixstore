import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint'
import { saveImageFromFile } from '../../../src/backend/image-service'
import { fetchEncodedImage } from '../../../src/frontend/default-fetcher'
import { decodeImagePayload } from '../../../src/shared/image-encoder'
import fs from 'fs/promises'
import path from 'path'
import { BackendImageRecord } from '../../../src/shared/models/backend-image-record'

const assetsDir = path.resolve(__dirname, '../../assets')
const TEST_IMAGE_PATH = path.join(assetsDir, 'antalya.jpg')

describe('fetchEncodedImage (integration)', () => {
  let record: BackendImageRecord
  beforeAll(async () => {
    startDefaultEndpoint()
    record = await saveImageFromFile(TEST_IMAGE_PATH)
  })

  afterAll(async () => {
    await stopDefaultEndpoint()
  })

  it('fetches and decodes the image as expected', async () => {
    const encoded = await fetchEncodedImage(record.id)
    const payload = decodeImagePayload(encoded)

    expect(payload.imageFormat).toBe('jpg')
    expect(payload.buffer).toBeInstanceOf(Uint8Array)
    expect(payload.buffer.length).toBeGreaterThan(0)

    const original = await fs.readFile(TEST_IMAGE_PATH)
    expect(payload.buffer.length).toBe(original.length)

    expect(payload.token).toBe(record.token)
  })

  it('throws if the image does not exist', async () => {
    await expect(fetchEncodedImage('fetcher:notfound')).rejects.toThrow(
      'Failed to fetch image',
    )
  })
})
