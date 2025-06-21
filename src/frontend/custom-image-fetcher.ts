/**
 * Stores the current custom fetcher function if registered by the user.
 */
let customImageFetcher: ((id: string) => Promise<Uint8Array>) | undefined

/**
 * Registers a custom fetcher function for image retrieval.
 * When set, this function will be used instead of the default fetcher.
 */
export const registerCustomImageFetcher = (
  fetcher: (id: string) => Promise<Uint8Array>,
) => {
  customImageFetcher = fetcher
}

/**
 * Returns the registered custom fetcher function, if any.
 */
export const getCustomImageFetcher = () => customImageFetcher
