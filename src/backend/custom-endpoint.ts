import { getWirePayload } from './image-service.js'
import { encodeWirePayload } from '../shared/wire-encoder.js'
import { isServerStarted } from './default-endpoint.js'
import { handleErrorAsync } from '../shared/handle-error.js'
import { PixstoreError } from '../shared/pixstore-error.js'
import { verifyStatelessProof } from './stateless-proof.js'
import { WirePayloadState } from '../types/wire-payload.js'

/**
 * Returns a Pixstore wire format encoded image payload (Uint8Array) for the given image ID.
 * Throws if the default endpoint is running, to prevent accidental dual endpoint usage.
 * Can be used in any custom endpoint handler to build a secure response.
 *
 * All security checks (stateless proof, image tag, etc.) are enforced before generating the payload.
 */
export const customEndpointHelper = async (
  imageId: string,
  clientToken: number,
  statelessProof: string,
): Promise<Uint8Array | null> => {
  return handleErrorAsync(async () => {
    // Prevent usage if the default endpoint is active (safety guard)
    if (isServerStarted()) {
      throw new PixstoreError(
        'Pixstore custom endpoint mode is not active. Please disable the default endpoint before using customEndpointHelper().',
      )
    }
    // Perform all security and wire checks
    return await endpointHelper(imageId, clientToken, statelessProof)
  })
}

/**
 * Generates an encoded Pixstore wire payload for the requested image ID.
 *
 * - Validates the provided statelessProof and clientToken before serving any image data.
 * - On any missing or invalid input, returns a payload with the appropriate WirePayloadState.
 * - If the stateless proof is valid, calls getWirePayload to return the correct payload variant
 *   (Success, Updated, NotFound).
 * - Catches any unexpected errors and returns an InternalError state.
 *
 * Always returns an encoded Uint8Array wire payload,
 * with the state as the first byte for protocol-agnostic error handling.
 */
export const endpointHelper = async (
  imageId: string | undefined,
  clientToken: number | undefined,
  statelessProof: string | undefined,
): Promise<Uint8Array> => {
  try {
    // Validate parameters
    if (!imageId)
      return encodeWirePayload({ state: WirePayloadState.MissingID })
    if (!statelessProof)
      return encodeWirePayload({ state: WirePayloadState.MissingProof })

    // Validate the stateless proof-of-access key (time-based)
    if (!verifyStatelessProof(imageId, statelessProof)) {
      return encodeWirePayload({ state: WirePayloadState.InvalidProof })
    }

    // Fetch the decrypted image and its metadata as a wire payload structure
    const wirePayload = await getWirePayload(imageId, clientToken)

    // Encode as Uint8Array in Pixstore wire format (consumed by the frontend)
    return encodeWirePayload(wirePayload)
  } catch {
    return encodeWirePayload({ state: WirePayloadState.InternalError })
  }
}
