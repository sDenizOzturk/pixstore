import type { CustomImageFetcher } from '../types/custom-image-fetcher.js'

/**
 * Stores the current custom fetcher function if registered by the user.
 */
let customImageFetcher: CustomImageFetcher | undefined

/**
 * Registers a custom fetcher function for image retrieval.
 * When set, this function will be used instead of the default fetcher.
 */
export const registerCustomImageFetcher = (
  fetcher: CustomImageFetcher | undefined,
) => {
  customImageFetcher = fetcher
}

/**
 * Returns the registered custom fetcher function, if any.
 */
export const getCustomImageFetcher = () => customImageFetcher
