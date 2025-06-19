import { ImageFormat } from './shared/models/image-format'

export const IS_TEST = process.env.NODE_ENV === 'test'

export const DATABASE_PATH =
  process.env.NODE_ENV === 'test'
    ? './.pixstore-test.sqlite'
    : './.pixstore.sqlite'

export const IMAGE_FORMATS = ['png', 'webp', 'jpg', 'jpeg'] as const

export const IMAGE_FORMAT_TO_BYTE = new Map<ImageFormat, number>()

export const BYTE_TO_IMAGE_FORMAT = new Map<number, ImageFormat>()

export const IMAGE_EXTENSION = '.pixstore-image'

export const IMAGE_ROOT_DIR = IS_TEST
  ? 'pixstore-test-images'
  : 'pixstore-images'

export const DEFAULT_ENDPOINT_HOST = IS_TEST ? '127.0.0.1' : '0.0.0.0'

export const DEFAULT_ENDPOINT_PORT = 3001

export const DEFAULT_ENDPOINT_ROUTE = '/pixstore-image'

export const FRONTEND_DB_NAME = IS_TEST ? 'pixstore-test' : 'pixstore'

export const FRONTEND_DB_VERSION = 1

export const IMAGE_STORE_NAME = 'images'

export const TEMP_IMAGE_STORE_NAME = 'images_temp'
