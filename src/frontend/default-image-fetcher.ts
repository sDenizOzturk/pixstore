import { pixstoreConfig } from '../shared/pixstore-config.js'
import { PixstoreError } from '../shared/pixstore-error.js'
import type { ImageFetcher } from '../types/image-fetcher.js'

/**
 * Fetches a raw encoded image payload from the Pixstore backend default endpoint.
 *
 * This performs a direct HTTP GET request to the default image endpoint using
 * the current wire protocol (status byte, token, stateless proof in headers).
 */
const defaultImageFetcher: ImageFetcher = async (
  parameters,
): Promise<Uint8Array> => {
  const {
    imageId,
    imageToken,
    statelessProof,
    // context (optional, ignored here)
  } = parameters

  const DEFAULT_ENDPOINT_PORT = pixstoreConfig.defaultEndpointConnectPort
  const DEFAULT_ENDPOINT_ROUTE = pixstoreConfig.defaultEndpointRoute
  const SERVER_HOST = pixstoreConfig.defaultEndpointConnectHost

  // Construct the full URL using constants and provided imageId
  const url = `http://${SERVER_HOST}:${DEFAULT_ENDPOINT_PORT}${DEFAULT_ENDPOINT_ROUTE}/${encodeURIComponent(imageId)}`

  // Prepare headers for proof and token (only if defined)
  const headers: Record<string, string> = {}
  if (statelessProof) headers['x-pixstore-proof'] = statelessProof
  if (imageToken !== undefined) headers['x-pixstore-token'] = String(imageToken)

  // Perform the HTTP request
  const res = await fetch(url, { method: 'GET', headers })

  // Ensure the response is OK (200-level)
  if (!res.ok) {
    throw new PixstoreError(
      `Failed to fetch image: ${res.status} ${res.statusText}`,
    )
  }

  // Read and convert response body to Uint8Array
  const buffer = await res.arrayBuffer()
  return new Uint8Array(buffer)
}

export const getDefaultImageFetcher = () => defaultImageFetcher
