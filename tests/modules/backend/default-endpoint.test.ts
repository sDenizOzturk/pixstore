import fs from 'fs'
import path from 'path'
import {
  saveImage,
  updateImage,
  deleteImage,
} from '../../../src/backend/image-service.js'

import { decodeWirePayload } from '../../../src/shared/wire-encoder.js'
import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint.js'

import { pixstoreConfig } from '../../../src/shared/pixstore-config.js'
import { initializeDatabase } from '../../../src/backend/database.js'
import { WirePayloadState } from '../../../src/types/wire-payload.js'
import { getCurrentStatelessProof } from '../../../src/backend/stateless-proof.js'

const DEFAULT_ENDPOINT_HOST = pixstoreConfig.defaultEndpointConnectHost
const DEFAULT_ENDPOINT_ROUTE = pixstoreConfig.defaultEndpointRoute
const DEFAULT_ENDPOINT_PORT = pixstoreConfig.defaultEndpointConnectPort

beforeAll(() => {
  initializeDatabase()
  startDefaultEndpoint()
})
afterAll(async () => await stopDefaultEndpoint())

const BASE_URL = `http://${DEFAULT_ENDPOINT_HOST}:${DEFAULT_ENDPOINT_PORT}`
const assetDir = path.resolve(__dirname, '../..', 'assets')

describe('Pixstore default endpoint – single file update flow', () => {
  const originalFile = '1-pixel.webp'
  const updatedFile = '1-pixel.png'
  let imageId: string
  let originalToken: number

  const buffer1 = fs.readFileSync(path.join(assetDir, originalFile))
  const buffer2 = fs.readFileSync(path.join(assetDir, updatedFile))

  it('should save, fetch, update, fetch and delete correctly (wire protocol)', async () => {
    // 1) Save original image
    const record1 = await saveImage(buffer1, 'students')
    imageId = record1!.id
    originalToken = record1!.token

    // 2) Fetch original via endpoint
    let res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`,
      {
        headers: {
          'x-pixstore-proof': getCurrentStatelessProof(imageId),
        },
      },
    )
    expect(res.status).toBe(200)
    let wirePayload = new Uint8Array(await res.arrayBuffer())
    let decoded = decodeWirePayload(wirePayload)

    // State should be Success or Updated (per protocol)
    expect([WirePayloadState.Success, WirePayloadState.Updated]).toContain(
      decoded.state,
    )
    // Check fields
    if (decoded.state === WirePayloadState.Success) {
      expect(decoded.encrypted).toBeDefined()
    } else if (decoded.state === WirePayloadState.Updated) {
      expect(decoded.encrypted).toBeDefined()
      expect(decoded.token).toBe(originalToken)
      expect(decoded.meta).toBeDefined()
    }

    // 3) Update with new image
    const record2 = await updateImage(imageId, buffer2)
    expect(record2!.token).not.toBe(originalToken)

    // 4) Fetch updated via endpoint
    res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`,
      {
        headers: {
          'x-pixstore-proof': getCurrentStatelessProof(imageId),
        },
      },
    )
    expect(res.status).toBe(200)
    wirePayload = new Uint8Array(await res.arrayBuffer())
    decoded = decodeWirePayload(wirePayload)
    expect([WirePayloadState.Success, WirePayloadState.Updated]).toContain(
      decoded.state,
    )
    if (decoded.state === WirePayloadState.Success) {
      expect(decoded.encrypted).toBeDefined()
    } else if (decoded.state === WirePayloadState.Updated) {
      expect(decoded.encrypted).toBeDefined()
      expect(decoded.token).toBe(record2!.token)
      expect(decoded.meta).toBeDefined()
    }

    // 5) Delete and ensure NotFound state
    expect(await deleteImage(imageId)).toBe(true)
    res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`,
      {
        headers: {
          'x-pixstore-proof': getCurrentStatelessProof(imageId),
        },
      },
    )
    expect(res.status).toBe(200)
    wirePayload = new Uint8Array(await res.arrayBuffer())
    decoded = decodeWirePayload(wirePayload)
    expect(decoded.state).toBe(WirePayloadState.NotFound)
  })

  it('should return NotFound state for non-existent id', async () => {
    const fakeId = 'doesnotexist'
    const proof = getCurrentStatelessProof(fakeId)
    const res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(fakeId)}`,
      {
        headers: {
          'x-pixstore-proof': proof,
        },
      },
    )
    expect(res.status).toBe(200)
    const wirePayload = new Uint8Array(await res.arrayBuffer())
    const decoded = decodeWirePayload(wirePayload)
    expect(decoded.state).toBe(WirePayloadState.NotFound)
  })

  it('should return 400 for missing image id', async () => {
    let res = await fetch(`${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}`)
    expect(res.status).toBe(400)

    res = await fetch(`${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/`)
    expect(res.status).toBe(400)
  })
})
