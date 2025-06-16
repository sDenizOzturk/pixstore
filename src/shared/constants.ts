export const IS_TEST = process.env.NODE_ENV === 'test'

export const DATABASE_PATH =
  process.env.NODE_ENV === 'test'
    ? './.pixstore-test.sqlite'
    : './.pixstore.sqlite'

export const IMAGE_EXTENSION = '.webp'

export const IMAGE_ROOT_DIR = 'pixstore-images'
