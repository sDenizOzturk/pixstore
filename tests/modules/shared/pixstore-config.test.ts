import 'fake-indexeddb/auto'

import { PixstoreConfig } from '../../../src/types/pixstore-config'
import { ImageFormat } from '../../../src/types/image-format'
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

  it('throws if defaultEndpointListenPort out of range', () => {
    expect(() => initPixstore({ defaultEndpointListenPort: 0 })).toThrow(
      'defaultEndpointListenPort must be an integer between 1 and 65535',
    )
    expect(() => initPixstore({ defaultEndpointListenPort: 70000 })).toThrow(
      'defaultEndpointListenPort must be an integer between 1 and 65535',
    )
  })

  it('throws if defaultEndpointConnectPort out of range', () => {
    expect(() => initPixstore({ defaultEndpointConnectPort: 0 })).toThrow(
      'defaultEndpointConnectPort must be an integer between 1 and 65535',
    )
    expect(() => initPixstore({ defaultEndpointConnectPort: 70000 })).toThrow(
      'defaultEndpointConnectPort must be an integer between 1 and 65535',
    )
  })
  it('throws if statelessKeyWindowLength is 0, negative, or non-numeric', () => {
    expect(() => initPixstore({ statelessKeyWindowLength: 0 })).toThrow(
      'statelessKeyWindowLength must be a positive integer (milliseconds) or -1 for non-expiring proof',
    )
    expect(() => initPixstore({ statelessKeyWindowLength: -5 })).toThrow(
      'statelessKeyWindowLength must be a positive integer (milliseconds) or -1 for non-expiring proof',
    )
    expect(() => initPixstore({ statelessKeyWindowLength: NaN })).toThrow(
      'statelessKeyWindowLength must be a positive integer (milliseconds) or -1 for non-expiring proof',
    )
    expect(() =>
      initPixstore({ statelessKeyWindowLength: 'abc' as any }),
    ).toThrow(
      'statelessKeyWindowLength must be a positive integer (milliseconds) or -1 for non-expiring proof',
    )
  })

  it('allows statelessKeyWindowLength = -1 (non-expiring) or positive integer', () => {
    expect(() => initPixstore({ statelessKeyWindowLength: -1 })).not.toThrow()
    expect(() =>
      initPixstore({ statelessKeyWindowLength: 60000 }),
    ).not.toThrow()
  })
})
