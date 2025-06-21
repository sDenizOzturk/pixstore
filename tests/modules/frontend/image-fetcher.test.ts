import { fetchEncodedImage } from '../../../src/frontend/image-fetcher'
import { registerCustomImageFetcher } from '../../../src/frontend/custom-image-fetcher'
import * as defaultFetcherModule from '../../../src/frontend/default-image-fetcher'

describe('fetchEncodedImage', () => {
  const testId = 'abc123'
  const defaultData = new Uint8Array([42])
  const customData = new Uint8Array([99])
  it('uses default fetcher if no custom fetcher is registered', async () => {
    jest
      .spyOn(defaultFetcherModule, 'getDefaultImageFetcher')
      .mockReturnValue(async (id: string) => {
        expect(id).toBe(testId)
        return defaultData
      })
    const result = await fetchEncodedImage(testId)
    expect(result).toEqual(defaultData)
  })

  it('uses custom fetcher if registered', async () => {
    registerCustomImageFetcher(async (id) => {
      expect(id).toBe(testId)
      return customData
    })
    const result = await fetchEncodedImage(testId)
    expect(result).toEqual(customData)
  })
})
