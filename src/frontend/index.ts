import type { PixstoreFrontendConfig } from '../types/pixstore-config.js'
import { initPixstore } from '../shared/pixstore-config.js'
import { registerCustomImageFetcher } from './custom-image-fetcher.js'
import type { ImageFetcher } from '../types/image-fetcher.js'

/**
 * Initializes the Pixstore frontend module with the given configuration.
 * Optionally, a custom image fetcher function can be provided.
 */
export const initPixstoreFrontend = (
  config: Partial<PixstoreFrontendConfig> = {},
  customImageFetcher?: ImageFetcher,
) => {
  // Apply user config to internal state
  initPixstore(config)

  // Register optional image fetcher override
  registerCustomImageFetcher(customImageFetcher)
}

// Export main image service functions for external use
export {
  getImage,
  deleteCachedImage,
  cachedImageExists,
} from './image-service.js'
