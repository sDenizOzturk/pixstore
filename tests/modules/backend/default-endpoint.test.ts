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
const DEFAULT_ENDPOINT_HOST = pixstoreConfig.defaultEndpointHost
const DEFAULT_ENDPOINT_ROUTE = pixstoreConfig.defaultEndpointRoute
const DEFAULT_ENDPOINT_PORT = pixstoreConfig.defaultEndpointPort

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

  it('should save, fetch, update, fetch and delete correctly', async () => {
    // Save original image
    const record1 = await saveImage(buffer1, 'students')
    imageId = record1.id
    originalToken = record1.token

    // Fetch original via endpoint
    let res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`,
    )
    expect(res.status).toBe(200)
    let raw = new Uint8Array(await res.arrayBuffer())
    let {
      encrypted: fetched1,
      token: token1,
      meta: meta1,
    } = decodeWirePayload(raw)
    expect(fetched1.length).toBeGreaterThan(0)
    expect(token1).toBe(originalToken)
    expect(Number(res.headers.get('x-token'))).toBe(originalToken)
    expect(meta1).toBeDefined()

    // Update with new image
    const record2 = await updateImage(imageId, buffer2, 'students')
    expect(record2.token).not.toBe(originalToken)

    // Fetch updated via endpoint
    res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`,
    )
    expect(res.status).toBe(200)
    raw = new Uint8Array(await res.arrayBuffer())
    const {
      encrypted: fetched2,
      token: token2,
      meta: meta2,
    } = decodeWirePayload(raw)
    expect(fetched2.length).toBeGreaterThan(0)
    expect(token2).toBe(record2.token)
    expect(Number(res.headers.get('x-token'))).toBe(record2.token)
    expect(meta2).toBeDefined()

    // Delete and ensure 404
    expect(await deleteImage(imageId)).toBe(true)
    res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`,
    )
    expect(res.status).toBe(404)
  })

  it('should return 404 for non-existent id', async () => {
    const res = await fetch(
      `${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent('doesnotexist')}`,
    )
    expect(res.status).toBe(404)
  })

  it('should return 400 for missing image id', async () => {
    // /pixstore-image
    let res = await fetch(`${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}`)
    expect(res.status).toBe(400)

    // /pixstore-image/
    res = await fetch(`${BASE_URL}${DEFAULT_ENDPOINT_ROUTE}/`)
    expect(res.status).toBe(400)
  })
})
