import type { CustomImageFetcher } from '../../../src/types/image-fetcher.js'
import {
  registerCustomImageFetcher,
  getCustomImageFetcher,
} from '../../../src/frontend/custom-image-fetcher.js'

describe('custom-image-fetcher', () => {
  it('registers and retrieves a custom fetcher', () => {
    const fetcher: CustomImageFetcher = async (_) => new Uint8Array([1])
    registerCustomImageFetcher(fetcher)
    expect(getCustomImageFetcher()).toBe(fetcher)
  })

  it('returns undefined if no custom fetcher is registered', () => {
    registerCustomImageFetcher(undefined)
    expect(getCustomImageFetcher()).toBeUndefined()
  })
})
