import { customEndpointHelper } from '../../../src/backend/custom-endpoint.js'
import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint.js'
import {
  saveImage,
  getImageRecord,
} from '../../../src/backend/image-service.js'
import fs from 'fs/promises'
import path from 'path'
import { sleep } from '../../utils'
import { initializeDatabase } from '../../../src/backend/database.js'
import { getCurrentStatelessProof } from '../../../src/backend/stateless-proof.js'

const assetDir = path.resolve(__dirname, '../../assets')
const ANTALYA_PATH = path.join(assetDir, 'antalya.jpg')

describe('customEndpointHelper', () => {
  let id: string

  beforeAll(async () => {
    initializeDatabase()
    // Save a test image to backend and keep the ID
    const saved = await saveImage(await fs.readFile(ANTALYA_PATH), 'students')
    id = saved!.id
    const imageRecord = getImageRecord(id)
  })

  it('returns valid wire format payload when default endpoint is not running', async () => {
    const proof = getCurrentStatelessProof(id)
    const payload = await customEndpointHelper(id, 0, proof)
    expect(payload).toBeInstanceOf(Uint8Array)
    expect(payload!.length).toBeGreaterThan(8)
  })

  it('throws if default endpoint is running', async () => {
    startDefaultEndpoint()
    await sleep(50)
    const proof = getCurrentStatelessProof(id)
    await expect(customEndpointHelper(id, 0, proof)).rejects.toThrow(
      /custom endpoint mode is not active|default endpoint/i,
    )
    await stopDefaultEndpoint()
  })
})
