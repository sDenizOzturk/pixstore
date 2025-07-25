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

  // ports must be in valid range
  const validatePort = (name: string, port: number | undefined) => {
    if (
      port !== undefined &&
      (!Number.isInteger(port) || port < 1 || port > 65535)
    ) {
      throw new Error(`${name} must be an integer between 1 and 65535`)
    }
  }

  validatePort('defaultEndpointListenPort', config.defaultEndpointListenPort)
  validatePort('defaultEndpointConnectPort', config.defaultEndpointConnectPort)

  // statelessKeyWindowLength must be -1 (no expiry) or a positive integer (ms)
  if (config.statelessKeyWindowLength !== undefined) {
    const val = config.statelessKeyWindowLength
    if (val !== -1 && (!Number.isFinite(val) || val <= 0)) {
      throw new Error(
        'statelessKeyWindowLength must be a positive integer (milliseconds) or -1 for non-expiring proof',
      )
    }
  }
}

const DEFAULT_ENDPOINT_TEST_PORT = 10000 + Math.floor(Math.random() * 50000)

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
  statelessKeyWindowLength: IS_TEST ? 200 : 20000,

  defaultEndpointEnabled: true,
  defaultEndpointRoute: '/pixstore-image',
  defaultEndpointListenHost: IS_TEST ? '127.0.0.1' : '0.0.0.0',
  defaultEndpointListenPort: IS_TEST ? DEFAULT_ENDPOINT_TEST_PORT : 3001,

  defaultEndpointConnectHost: IS_TEST ? '127.0.0.1' : 'unknown',
  defaultEndpointConnectPort: IS_TEST ? DEFAULT_ENDPOINT_TEST_PORT : 3001,
  frontendDbName: IS_TEST ? 'pixstore-test' : 'pixstore',
  frontendDbVersion: 1,
  imageStoreName: 'images',
  frontendImageCacheLimit: IS_TEST ? 50 : 1000,
  frontendCleanupBatch: IS_TEST ? 5 : 50,
  accessControlAllowOrigin: '*',
  errorHandlingMode: IS_TEST ? 'throw' : 'hybrid',
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
