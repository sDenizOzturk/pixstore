import { getWirePayload } from './image-service.js'
import { encodeWirePayload } from '../shared/wire-encoder.js'
import { isServerStarted } from './default-endpoint.js'

/**
 * Returns a Pixstore wire format encoded image payload (Uint8Array) for the given image id.
 * Throws if the default endpoint is running, to prevent accidental double endpoint use.
 * Can be used in any custom endpoint handler to build a response.
 */
export const customEndpointHelper = async (id: string): Promise<Uint8Array> => {
  if (isServerStarted()) {
    throw new Error(
      'Pixstore custom endpoint mode is not active. Please disable the default endpoint before using customEndpointHelper().',
    )
  }
  const wirePayload = await getWirePayload(id)
  return encodeWirePayload(wirePayload)
}
