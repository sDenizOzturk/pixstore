import 'fake-indexeddb/auto'

import { PixstoreConfig } from '../../../src/models/pixstore-config'
import { ImageFormat } from '../../../src/models/image-format'
import {
  pixstoreConfig,
  initPixstore,
  defaultConfig,
} from '../../../src/shared/pixstore-config'

describe('Pixstore config system', () => {
  beforeEach(() => {
    // reset to defaults before each test
    Object.assign(pixstoreConfig, defaultConfig)
  })

  it('starts with defaultConfig values', () => {
    expect(pixstoreConfig).toEqual(defaultConfig)
  })

  it('overrides simple values correctly', () => {
    initPixstore({ databasePath: '/tmp/custom.db', frontendDbVersion: 42 })
    expect(pixstoreConfig.databasePath).toBe('/tmp/custom.db')
    expect(pixstoreConfig.frontendDbVersion).toBe(42)
    // other values remain default
    expect(pixstoreConfig.imageExtension).toBe(defaultConfig.imageExtension)
  })

  it('rebuilds encoding maps when imageFormats changed', () => {
    const newFormats = ['png'] as const
    initPixstore({ imageFormats: newFormats })
    // only one format => byte 1 => reverse map same
    expect(pixstoreConfig.imageFormats).toEqual(newFormats)
    expect(pixstoreConfig.imageFormatToByte.get('png')).toBe(1)
    expect(pixstoreConfig.byteToImageFormat.get(1)).toBe('png')
    // old format should no longer be present
    expect(pixstoreConfig.imageFormatToByte.has('webp')).toBe(false)
  })

  it('throws if frontendCleanupBatch >= frontendImageCacheLimit', () => {
    expect(() =>
      initPixstore({ frontendCleanupBatch: 100, frontendImageCacheLimit: 50 }),
    ).toThrow(
      'frontendCleanupBatch must be smaller than frontendImageCacheLimit',
    )
  })

  it('throws if imageRootDir is empty string', () => {
    expect(() => initPixstore({ imageRootDir: '' })).toThrow(
      'imageRootDir cannot be empty',
    )
  })

  it('throws if imageStoreName is empty string', () => {
    expect(() => initPixstore({ imageStoreName: ' ' })).toThrow(
      'imageStoreName cannot be empty',
    )
  })

  it('throws if defaultEndpointPort out of range', () => {
    expect(() => initPixstore({ defaultEndpointPort: 0 })).toThrow(
      'defaultEndpointPort must be an integer between 1 and 65535',
    )
    expect(() => initPixstore({ defaultEndpointPort: 70000 })).toThrow(
      'defaultEndpointPort must be an integer between 1 and 65535',
    )
  })
})
