import { getImage } from './image-service'
import { encodeImagePayload } from '../shared/image-encoder'
import { isServerStarted } from './default-endpoint'

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
  const image = await getImage(id)
  return encodeImagePayload(image)
}
