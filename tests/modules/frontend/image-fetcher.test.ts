import { fetchEncodedImage } from '../../../src/frontend/image-fetcher'
import { registerCustomImageFetcher } from '../../../src/frontend/custom-image-fetcher'
import * as defaultFetcherModule from '../../../src/frontend/default-image-fetcher'

describe('fetchEncodedImage', () => {
  const imageRecord = {
    id: 'abc123',
    token: 123,
    statelessProof: 'test-proof',
    meta: {
      key: 'test-key',
      iv: 'test-iv',
      tag: 'test-tag',
    },
  }
  const defaultData = new Uint8Array([42])
  const customData = new Uint8Array([99])

  afterEach(() => {
    registerCustomImageFetcher(undefined)
    jest.restoreAllMocks()
  })

  it('uses default fetcher if no custom fetcher is registered', async () => {
    jest
      .spyOn(defaultFetcherModule, 'getDefaultImageFetcher')
      .mockReturnValue(async (params) => {
        expect(params).toEqual(imageRecord)
        return defaultData
      })
    const result = await fetchEncodedImage(imageRecord)
    expect(result).toEqual(defaultData)
  })

  it('uses custom fetcher if registered', async () => {
    registerCustomImageFetcher(async (params) => {
      expect(params).toEqual(imageRecord)
      return customData
    })
    const result = await fetchEncodedImage(imageRecord)
    expect(result).toEqual(customData)
  })
})
