/**
 * Pixstore default image endpoint.
 *
 * Pure vanilla Node.js (zero dependency): No Express, no middleware, no external frameworks.
 * Provides a single GET endpoint to fetch encoded images from the store.
 *
 * Exports startDefaultEndpoint/stopDefaultEndpoint for manual lifecycle control.
 */

import http from 'http'
import { pixstoreConfig } from '../shared/pixstore-config.js'
import { IS_TEST } from '../shared/constants.js'
import { endpointHelper } from './custom-endpoint.js'

let server: http.Server

/**
 * Handles incoming HTTP requests for the Pixstore default endpoint.
 * - Matches GET requests to `${DEFAULT_ENDPOINT_ROUTE}/:id`
 * - Encodes and returns image payload or returns 404 on errors.
 */
const requestHandler = (
  req: http.IncomingMessage,
  res: http.ServerResponse,
) => {
  const ACCESS_CONTROL_ALLOW_ORIGIN = pixstoreConfig.accessControlAllowOrigin

  res.setHeader('Access-Control-Allow-Origin', ACCESS_CONTROL_ALLOW_ORIGIN)
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS')
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Content-Type, Authorization, x-pixstore-proof, x-pixstore-token',
  )

  // handle preflight
  if (req.method === 'OPTIONS') {
    res.writeHead(204)
    return res.end()
  }

  const DEFAULT_ENDPOINT_ROUTE = pixstoreConfig.defaultEndpointRoute

  // Only allow GET requests
  if (!req.url || req.method !== 'GET') {
    res.writeHead(404).end('Not found')
    return
  }

  const match = req.url.match(`^${DEFAULT_ENDPOINT_ROUTE}/(.+)$`)
  if (
    req.url === DEFAULT_ENDPOINT_ROUTE ||
    req.url === DEFAULT_ENDPOINT_ROUTE + '/'
  ) {
    res.writeHead(400, { 'Content-Type': 'text/plain' }).end('Missing image id')
    return
  }
  if (match) {
    const id = decodeURIComponent(match[1])
    const statelessProofHeader = req.headers['x-pixstore-proof']
    const statelessProof = Array.isArray(statelessProofHeader)
      ? statelessProofHeader[0]
      : statelessProofHeader
    const clientTokenHeader = req.headers['x-pixstore-token']
    const clientTokenString = Array.isArray(clientTokenHeader)
      ? clientTokenHeader[0]
      : clientTokenHeader
    const clientToken = clientTokenString
      ? Number(clientTokenString)
      : undefined

    /**
     * Always respond with HTTP 200 OK for all valid image requests.
     * Any error or status (such as NotFound, InvalidProof, or MissingToken)
     * is indicated by the first byte (state) of the binary response payload.
     * This protocol-agnostic approach keeps error handling simple and
     * consistent for all clients and custom integrations.
     */
    ;(async () => {
      const wirePayload = await endpointHelper(id, clientToken, statelessProof)
      res.writeHead(200, {
        'Content-Type': 'application/octet-stream',
        'Content-Length': String(wirePayload.length),
      })
      res.end(wirePayload)
    })()
    return
  }

  res.writeHead(404, { 'Content-Type': 'text/plain' }).end('Not found')
}

/**
 * Starts the HTTP server for the default Pixstore endpoint.
 * - Ensures only one server instance is created.
 * - Suppresses console output in test mode.
 * - Uses `unref()` so Jest or other processes can exit cleanly.
 */
export const startDefaultEndpoint = (): void => {
  const DEFAULT_ENDPOINT_HOST = pixstoreConfig.defaultEndpointListenHost
  const DEFAULT_ENDPOINT_PORT = pixstoreConfig.defaultEndpointListenPort

  if (server) return

  server = http
    .createServer(requestHandler)
    .listen(DEFAULT_ENDPOINT_PORT, DEFAULT_ENDPOINT_HOST, () => {
      if (!IS_TEST) {
        console.log(
          `Pixstore endpoint listening on ${DEFAULT_ENDPOINT_HOST}:${DEFAULT_ENDPOINT_PORT}`,
        )
      }
    })

  // Allow the process to exit if this is the only active handle
  server.unref()
}

/**
 * Stops the HTTP server instance.
 * - Returns a Promise that resolves when the server has closed.
 * - Safe to call multiple times.
 */
export const stopDefaultEndpoint = (): Promise<void> => {
  return new Promise((resolve, reject) => {
    if (!server) return resolve()
    server.close((err) => (err ? reject(err) : resolve()))
  })
}

/**
 * Returns true if the default endpoint server is currently started.
 * Useful to prevent accidental double-start or for debugging/status checks.
 */
export const isServerStarted = (): boolean => !!server
