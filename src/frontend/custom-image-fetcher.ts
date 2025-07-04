import type { ImageFetcher } from '../types/image-fetcher.js'

/**
 * Stores the current custom fetcher function if registered by the user.
 */
let customImageFetcher: ImageFetcher | undefined

/**
 * Registers a custom fetcher function for image retrieval.
 * When set, this function will be used instead of the default fetcher.
 */
export const registerCustomImageFetcher = (
  fetcher: ImageFetcher | undefined,
) => {
  if (customImageFetcher && fetcher) {
    console.warn('Overwriting existing custom image fetcher.')
  }
  customImageFetcher = fetcher
}

/**
 * Returns the registered custom fetcher function, if any.
 */
export const getCustomImageFetcher = () => customImageFetcher
