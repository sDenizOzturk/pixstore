import { getCustomImageFetcher } from './custom-image-fetcher.js'
import { getDefaultImageFetcher } from './default-image-fetcher.js'

/**
 * Fetches a raw encoded image payload using either a custom fetcher
 * (if registered) or the default Pixstore fetcher.
 * Always returns the wire-format Uint8Array for the given image id.
 */
export const fetchEncodedImage = async (id: string): Promise<Uint8Array> => {
  const customImageFetcher = getCustomImageFetcher()

  const imageFetcher = customImageFetcher
    ? customImageFetcher
    : getDefaultImageFetcher()

  return imageFetcher(id)
}
