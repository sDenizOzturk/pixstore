import {
  registerCustomImageFetcher,
  getCustomImageFetcher,
} from '../../../src/frontend/custom-image-fetcher'

describe('custom-image-fetcher', () => {
  it('registers and retrieves a custom fetcher', () => {
    const fetcher = async (_: string) => new Uint8Array([1])
    registerCustomImageFetcher(fetcher)
    expect(getCustomImageFetcher()).toBe(fetcher)
  })

  it('returns undefined if no custom fetcher is registered', () => {
    registerCustomImageFetcher(undefined as any)
    expect(getCustomImageFetcher()).toBeUndefined()
  })
})
