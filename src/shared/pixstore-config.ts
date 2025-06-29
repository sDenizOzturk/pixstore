import type { ImageFormat } from '../types/image-format.js'
import type { PixstoreConfig } from '../types/pixstore-config.js'
import { DEFAULT_IMAGE_FORMATS } from './constants.js'

const IS_TEST = true

/**
 * Utility to build encoding maps for supported image formats.
 * Assigns a unique byte to each format (1-based; 0 is reserved).
 */
const buildFormatMaps = (formats: readonly ImageFormat[]) => {
  const imageFormatToByte = new Map<ImageFormat, number>()
  const byteToImageFormat = new Map<number, ImageFormat>()
  formats.forEach((imageFormat, imageID) => {
    imageFormatToByte.set(imageFormat, imageID + 1)
    byteToImageFormat.set(imageID + 1, imageFormat)
  })
  return { imageFormatToByte, byteToImageFormat }
}

/**
 * Validates user-provided config overrides for Pixstore.
 * Throws an error if any value is invalid, conflicting, or out of range.
 * Checks required field relationships, non-empty string constraints, and numeric ranges.
 */
const validateConfig = (config: Partial<PixstoreConfig>): void => {
  // ensure cleanup batch is smaller than cache limit
  const newLimit =
    config.frontendImageCacheLimit ?? pixstoreConfig.frontendImageCacheLimit
  const newBatch =
    config.frontendCleanupBatch ?? pixstoreConfig.frontendCleanupBatch
  if (newBatch >= newLimit) {
    throw new Error(
      'frontendCleanupBatch must be smaller than frontendImageCacheLimit',
    )
  }

  // folder names must not be empty
  if (config.imageRootDir !== undefined && config.imageRootDir.trim() === '') {
    throw new Error('imageRootDir cannot be empty')
  }
  if (
    config.imageStoreName !== undefined &&
    config.imageStoreName.trim() === ''
  ) {
    throw new Error('imageStoreName cannot be empty')
  }

  // port must be in valid range
  if (config.defaultEndpointPort !== undefined) {
    const port = config.defaultEndpointPort
    if (!Number.isInteger(port) || port < 1 || port > 65535) {
      throw new Error(
        'defaultEndpointPort must be an integer between 1 and 65535',
      )
    }
  }
}

/**
 * The default Pixstore configuration object.
 * All values can be overridden at runtime using `initPixstore`.
 */
export const defaultConfig: PixstoreConfig = {
  imageFormats: DEFAULT_IMAGE_FORMATS,
  ...buildFormatMaps(DEFAULT_IMAGE_FORMATS),
  imageExtension: '.pixstore-image',
  imageRootDir: IS_TEST ? 'pixstore-test-images' : 'pixstore-images',

  databasePath: IS_TEST ? './.pixstore-test.sqlite' : './.pixstore.sqlite',
  defaultEndpointHost: IS_TEST ? '127.0.0.1' : '0.0.0.0',
  defaultEndpointEnabled: true,
  defaultEndpointPort: IS_TEST
    ? 10000 + Math.floor(Math.random() * 50000)
    : 3001,
  defaultEndpointRoute: '/pixstore-image',

  backendApiHost: IS_TEST ? '127.0.0.1' : 'unknown',
  frontendDbName: IS_TEST ? 'pixstore-test' : 'pixstore',
  frontendDbVersion: 1,
  imageStoreName: 'images',
  frontendImageCacheLimit: IS_TEST ? 50 : 1000,
  frontendCleanupBatch: IS_TEST ? 5 : 50,
  accessControlAllowOrigin: '*',
}

/**
 * The global Pixstore config instance.
 * All modules should import and use this object for configuration.
 */
export const pixstoreConfig: PixstoreConfig = { ...defaultConfig }

/**
 * Allows overriding any configuration value at runtime.
 * Safe to call multiple times; always merges on top of previous config.
 * If imageFormats is changed, encoding maps are automatically updated.
 */
export const initPixstore = (config: Partial<PixstoreConfig> = {}) => {
  validateConfig(config)
  let maps = {}
  if (config.imageFormats) {
    maps = buildFormatMaps(config.imageFormats)
  }
  Object.assign(pixstoreConfig, config, maps)
}
