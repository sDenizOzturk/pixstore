import { PixstoreBackendConfig } from '../models/pixstore-config'
import { initPixstore, pixstoreConfig } from '../shared/pixstore-config'
import { startDefaultEndpoint } from './default-endpoint'

/**
 * Initializes the Pixstore backend module with the given configuration.
 * Starts the default endpoint if enabled.
 */
export const initPixstoreBackend = (
  config: Partial<PixstoreBackendConfig> = {},
) => {
  initPixstore(config)
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
} from './image-service'

// Export backend image record type
export type { ImageRecord } from '../models/image-record'

// Export helper for creating custom endpoints
export { customEndpointHelper } from './custom-endpoint'
