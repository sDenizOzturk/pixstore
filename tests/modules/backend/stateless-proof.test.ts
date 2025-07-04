import { customEndpointHelper } from '../../../src/backend/custom-endpoint.js'
import {
  startDefaultEndpoint,
  stopDefaultEndpoint,
} from '../../../src/backend/default-endpoint.js'
import { saveImage } from '../../../src/backend/image-service.js'
import fs from 'fs/promises'
import path from 'path'
import { sleep } from '../../utils/index.js'
import { initializeDatabase } from '../../../src/backend/database.js'
import { getCurrentStatelessProof } from '../../../src/backend/stateless-proof.js'

const assetDir = path.resolve(__dirname, '../../assets')
const ANTALYA_PATH = path.join(assetDir, 'antalya.jpg')

describe('customEndpointHelper', () => {
  let id: string

  beforeAll(async () => {
    initializeDatabase()
    const saved = await saveImage(await fs.readFile(ANTALYA_PATH), 'students')
    id = saved!.id
  })

  it('returns valid wire format payload when default endpoint is not running', async () => {
    const proof = getCurrentStatelessProof(id)
    // Yeni signature: customEndpointHelper(imageId: string, clientToken: number | null, statelessProof: string)
    // clientToken burada undefined ya da null olabilir.
    const payload = await customEndpointHelper(id, undefined, proof)
    expect(payload).toBeInstanceOf(Uint8Array)
    expect(payload!.length).toBeGreaterThan(8)
  })

  it('throws if default endpoint is running', async () => {
    startDefaultEndpoint()
    await sleep(50)
    const proof = getCurrentStatelessProof(id)
    await expect(customEndpointHelper(id, undefined, proof)).rejects.toThrow(
      /custom endpoint mode is not active|default endpoint/i,
    )
    await stopDefaultEndpoint()
  })
})
