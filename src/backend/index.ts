import type { PixstoreBackendConfig } from '../types/pixstore-config.js'
import { initPixstore, pixstoreConfig } from '../shared/pixstore-config.js'
import { initializeDatabase } from './database.js'
import { startDefaultEndpoint } from './default-endpoint.js'

/**
 * Initializes the Pixstore backend module with the given configuration.
 * Starts the default endpoint if enabled.
 */
export const initPixstoreBackend = (
  config: Partial<PixstoreBackendConfig> = {},
) => {
  // Validates user config (e.g. cleanupBatch must be < cacheLimit)
  // Then applies it to the internal Pixstore state
  initPixstore(config)

  // Prepares the database for storing image metadata
  initializeDatabase()

  // If enabled, starts the default image-serving HTTP endpoint
  if (pixstoreConfig.defaultEndpointEnabled) {
    startDefaultEndpoint()
  }
}

// Export backend image service functions and types
export {
  getImageRecord,
  saveImage,
  saveImageFromFile,
  updateImage,
  updateImageFromFile,
  deleteImage,
  imageExists,
} from './image-service.js'

// Export helper for creating custom endpoints
export { customEndpointHelper } from './custom-endpoint.js'
