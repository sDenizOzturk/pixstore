import { ImageFetcher } from '../types/image-fetcher.js'
import { getCustomImageFetcher } from './custom-image-fetcher.js'
import { getDefaultImageFetcher } from './default-image-fetcher.js'

/**
 * Fetches a raw encoded image payload using either a custom fetcher
 * (if registered) or the default Pixstore fetcher.
 * Always returns the wire-format Uint8Array for the given image id.
 */
export const fetchEncodedImage: ImageFetcher = async (...parameters) => {
  const customImageFetcher = getCustomImageFetcher()

  if (customImageFetcher) {
    return customImageFetcher(...parameters)
  }
  const defaultImageFetcher = getDefaultImageFetcher()
  return defaultImageFetcher(...parameters)
}
