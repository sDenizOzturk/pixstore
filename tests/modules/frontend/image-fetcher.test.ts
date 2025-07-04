import { fetchEncodedImage } from '../../../src/frontend/image-fetcher'
import { registerCustomImageFetcher } from '../../../src/frontend/custom-image-fetcher'
import * as defaultFetcherModule from '../../../src/frontend/default-image-fetcher'

describe('fetchEncodedImage', () => {
  const parameters = {
    imageId: 'abc123',
    imageToken: 123,
    statelessProof: 'test-proof',
    context: undefined,
  }
  const defaultData = new Uint8Array([42])
  const customData = new Uint8Array([99])

  afterEach(() => {
    // Always unregister custom fetcher after each test to avoid cross-test pollution
    registerCustomImageFetcher(undefined)
    jest.restoreAllMocks()
  })

  it('uses default fetcher if no custom fetcher is registered', async () => {
    jest
      .spyOn(defaultFetcherModule, 'getDefaultImageFetcher')
      .mockReturnValue(async (params) => {
        expect(params).toEqual(parameters)
        return defaultData
      })
    const result = await fetchEncodedImage(parameters)
    expect(result).toEqual(defaultData)
  })

  it('uses custom fetcher if registered', async () => {
    registerCustomImageFetcher(async (params) => {
      expect(params).toEqual(parameters)
      return customData
    })
    const result = await fetchEncodedImage(parameters)
    expect(result).toEqual(customData)
  })
})
