import type { PixstoreFrontendConfig } from '../types/pixstore-config.js'
import { initPixstore } from '../shared/pixstore-config.js'
import { registerCustomImageFetcher } from './custom-image-fetcher.js'

/**
 * Initializes the Pixstore frontend module with the given configuration.
 * Optionally, a custom image fetcher function can be provided.
 */
export const initPixstoreFrontend = (
  config: Partial<PixstoreFrontendConfig> = {},
  customImageFetcher?: (id: string) => Promise<Uint8Array>,
) => {
  initPixstore(config)
  if (customImageFetcher) {
    registerCustomImageFetcher(customImageFetcher)
  }
}
// Export main image service functions for external use
export { getImage, getCachedImage, deleteCachedImage } from './image-service.js'
