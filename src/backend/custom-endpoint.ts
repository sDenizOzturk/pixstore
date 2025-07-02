import { getWirePayload } from './image-service.js'
import { encodeWirePayload } from '../shared/wire-encoder.js'
import { isServerStarted } from './default-endpoint.js'
import { handleErrorAsync } from '../shared/handle-error.js'

/**
 * Returns a Pixstore wire format encoded image payload (Uint8Array) for the given image id.
 * Throws if the default endpoint is running, to prevent accidental double endpoint use.
 * Can be used in any custom endpoint handler to build a response.
 */
export const customEndpointHelper = async (
  id: string,
): Promise<Uint8Array | null> => {
  return handleErrorAsync(async () => {
    // Prevent usage if the default endpoint is active (safety guard)
    if (isServerStarted()) {
      throw new Error(
        'Pixstore custom endpoint mode is not active. Please disable the default endpoint before using customEndpointHelper().',
      )
    }

    // Fetch decrypted image and metadata as a wire payload structure
    const wirePayload = await getWirePayload(id)

    // Encode it as Uint8Array in Pixstore wire format (used by frontend to decode)
    return encodeWirePayload(wirePayload)
  })
}
