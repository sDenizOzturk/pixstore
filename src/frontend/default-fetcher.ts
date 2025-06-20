import {
  DEFAULT_ENDPOINT_PORT,
  DEFAULT_ENDPOINT_ROUTE,
  SERVER_HOST,
} from '../constants'

/**
 * Fetches a raw encoded image payload from the Pixstore backend.
 *
 * This performs a direct HTTP GET request to the default image endpoint using
 * the wire format protocol: [1 byte format][8 byte token][N bytes buffer].
 */
export const fetchEncodedImage = async (id: string): Promise<Uint8Array> => {
  // Construct the full URL using constants
  const url = `http://${SERVER_HOST}:${DEFAULT_ENDPOINT_PORT}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(id)}`

  // Perform the HTTP request
  const res = await fetch(url)

  // Ensure the response is OK (200-level)
  if (!res.ok) {
    throw new Error(`Failed to fetch image: ${res.status} ${res.statusText}`)
  }

  // Read and convert response body to Uint8Array
  const buffer = await res.arrayBuffer()
  const uint8 = new Uint8Array(buffer)

  // Sanity check: payload must include format(1) + token(8)
  if (uint8.length < 9) {
    throw new Error('Invalid payload: too short')
  }

  return uint8
}
