import { pixstoreConfig } from '../shared/pixstore-config.js'
import { PixstoreError } from '../shared/pixstore-error.js'

/**
 * Fetches a raw encoded image payload from the Pixstore backend.
 *
 * This performs a direct HTTP GET request to the default image endpoint using
 * the wire format protocol: [1 byte format][8 byte token][N bytes buffer].
 */
const defaultImageFetcher = async (id: string): Promise<Uint8Array> => {
  const DEFAULT_ENDPOINT_PORT = pixstoreConfig.defaultEndpointConnectPort
  const DEFAULT_ENDPOINT_ROUTE = pixstoreConfig.defaultEndpointRoute
  const SERVER_HOST = pixstoreConfig.defaultEndpointConnectHost
  // Construct the full URL using constants
  const url = `http://${SERVER_HOST}:${DEFAULT_ENDPOINT_PORT}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(id)}`

  // Perform the HTTP request
  const res = await fetch(url)

  // Ensure the response is OK (200-level)
  if (!res.ok) {
    throw new PixstoreError(
      `Failed to fetch image: ${res.status} ${res.statusText}`,
    )
  }

  // Read and convert response body to Uint8Array
  const buffer = await res.arrayBuffer()
  const uint8 = new Uint8Array(buffer)

  return uint8
}

export const getDefaultImageFetcher = () => defaultImageFetcher
