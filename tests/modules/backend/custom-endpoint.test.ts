import { customEndpointHelper } from '../../../src/backend/custom-endpoint.js'
import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint.js'
import { saveImage } from '../../../src/backend/image-service.js'
import fs from 'fs/promises'
import path from 'path'
import { sleep } from '../../utils'
import { initializeDatabase } from '../../../src/backend/database.js'

const assetDir = path.resolve(__dirname, '../../assets')
const ANTALYA_PATH = path.join(assetDir, 'antalya.jpg')

describe('customEndpointHelper', () => {
  let id: string

  beforeAll(async () => {
    initializeDatabase()
    // Save a test image to backend and keep the ID
    const saved = await saveImage(await fs.readFile(ANTALYA_PATH), 'students')
    id = saved.id
  })

  it('returns valid wire format payload when default endpoint is not running', async () => {
    const payload = await customEndpointHelper(id)
    // Payload must be a Uint8Array and at least 9 bytes (wire format minimum)
    expect(payload).toBeInstanceOf(Uint8Array)
    expect(payload.length).toBeGreaterThan(8)
  })

  it('throws if default endpoint is running', async () => {
    startDefaultEndpoint()
    await sleep(50)
    await expect(customEndpointHelper(id)).rejects.toThrow(
      /custom endpoint mode is not active|default endpoint/i,
    )
    await stopDefaultEndpoint()
  })
})
