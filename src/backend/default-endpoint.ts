/**
 * Pixstore default image endpoint.
 *
 * Pure vanilla Node.js (zero dependency): No Express, no middleware, no external frameworks.
 * Provides a single GET endpoint to fetch encoded images from the store.
 *
 * Exports startDefaultEndpoint/stopDefaultEndpoint for manual lifecycle control.
 */

import http from 'http'
import { getImage } from './image-service.js'
import { encodeImagePayload } from '../shared/image-encoder.js'
import { pixstoreConfig, IS_TEST } from '../shared/pixstore-config.js'

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
    ;(async () => {
      try {
        const image = await getImage(id)
        const payload = encodeImagePayload(image)

        res.writeHead(200, {
          'Content-Type': 'application/octet-stream',
          'Content-Length': String(payload.length),
          'X-Token': String(image.token),
        })
        res.end(payload)
      } catch (err) {
        res
          .writeHead(404, { 'Content-Type': 'text/plain' })
          .end('Image not found')
      }
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
  const DEFAULT_ENDPOINT_HOST = pixstoreConfig.defaultEndpointHost
  const DEFAULT_ENDPOINT_PORT = pixstoreConfig.defaultEndpointPort

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
