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
import { initializeDatabase } from '../../../src/backend/database'
import { decryptImage } from '../../../src/frontend/image-decryption.js'
import { getCurrentStatelessProof } from '../../../src/backend/stateless-proof.js'
import { WirePayloadState } from '../../../src/types/wire-payload.js'

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
  let record: Awaited<ReturnType<typeof saveImageFromFile>>
  beforeAll(async () => {
    record = await saveImageFromFile(TEST_IMAGE_PATH)
    if (!record) throw new Error('Test image could not be saved!')
  })
  it('fetches and decodes the image as expected', async () => {
    const statelessProof = getCurrentStatelessProof(record!.id)
    const encoded = await fetchEncodedImage({
      imageId: record!.id,
      imageToken: record!.token,
      statelessProof,
    })
    const decoded = decodeWirePayload(encoded)

    expect([WirePayloadState.Success, WirePayloadState.Updated]).toContain(
      decoded.state,
    )

    if (decoded.state === WirePayloadState.Updated) {
      expect(decoded.meta).toBeDefined()
      expect(decoded.token).toBe(record!.token)
      expect(decoded.meta.key).toEqual(record!.meta.key)
      expect(decoded.meta.iv).toEqual(record!.meta.iv)
      expect(decoded.meta.tag).toEqual(record!.meta.tag)

      expect(decoded.encrypted).toBeInstanceOf(Uint8Array)
      expect(decoded.encrypted.length).toBeGreaterThan(0)

      const decrypted = await decryptImage(decoded.encrypted, decoded.meta)
      expect(decrypted.format).toBe('jpg')
      expect(decrypted.buffer).toBeInstanceOf(Uint8Array)
      expect(decrypted.buffer.length).toBeGreaterThan(0)

      const original = await fs.readFile(TEST_IMAGE_PATH)
      expect(decrypted.buffer.length).toEqual(original.length)
      expect(decoded.token).toBe(record!.token)
    }

    if (decoded.state === WirePayloadState.Success) {
      expect(decoded.encrypted).toBeInstanceOf(Uint8Array)
      expect(decoded.encrypted.length).toBeGreaterThan(0)

      const decrypted = await decryptImage(decoded.encrypted, record!.meta)
      expect(decrypted.format).toBe('jpg')
      expect(decrypted.buffer).toBeInstanceOf(Uint8Array)
      expect(decrypted.buffer.length).toBeGreaterThan(0)

      const original = await fs.readFile(TEST_IMAGE_PATH)
      expect(decrypted.buffer.length).toEqual(original.length)
      expect(decoded.state).toBe(WirePayloadState.Success)
    }
  })

  it('returns NotFound or InvalidProof state for a non-existent image', async () => {
    const fakeId = 'fetcher:notfound'
    const proof = getCurrentStatelessProof(fakeId)
    const encoded = await fetchEncodedImage({
      imageId: fakeId,
      imageToken: undefined,
      statelessProof: proof,
    })
    const decoded = decodeWirePayload(encoded)
    expect([
      WirePayloadState.NotFound,
      WirePayloadState.InvalidProof,
    ]).toContain(decoded.state)
  })
})
