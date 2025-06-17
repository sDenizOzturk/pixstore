import { ImageFormat } from './shared/models/image-format'

export const IS_TEST = process.env.NODE_ENV === 'test'

export const DATABASE_PATH =
  process.env.NODE_ENV === 'test'
    ? './.pixstore-test.sqlite'
    : './.pixstore.sqlite'

export const IMAGE_FORMATS = ['png', 'webp', 'jpg', 'jpeg'] as const

export const IMAGE_FORMAT: ImageFormat = 'webp'

export const IMAGE_EXTENSION = `.${IMAGE_FORMAT}`

export const IMAGE_ROOT_DIR = IS_TEST
  ? 'pixstore-test-images'
  : 'pixstore-images'

export const DEFAULT_ENDPOINT_HOST = IS_TEST ? '127.0.0.1' : '0.0.0.0'

export const DEFAULT_ENDPOINT_PORT = 3001

export const DEFAULT_ENDPOINT_ROUTE = '/pixstore-image'
