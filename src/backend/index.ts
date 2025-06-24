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
  initPixstore(config)
  initializeDatabase()
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
  getImage,
} from './image-service.js'

// Export helper for creating custom endpoints
export { customEndpointHelper } from './custom-endpoint.js'
