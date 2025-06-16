import { IMAGE_ROOT_DIR, IMAGE_EXTENSION } from '../shared/constants'
import { imageRecordExists } from './database'

/**
 * Generates a unique image ID with optional directory prefix.
 * Example: students:kth1m9c4n8l2a7vz
 */
export const createUniqueId = async (dir?: string): Promise<string> => {
  let id: string
  let exists: boolean

  do {
    const timestamp = Date.now().toString(36)
    const random = Math.random().toString(36).substring(2, 10)
    id = `${timestamp}${random}`
    if (dir) {
      const dirClean = dir
        .trim()
        .toLowerCase()
        .replace(/[^a-z0-9_-]/g, '')
      id = `${dirClean}:${id}`
    }
    exists = await imageRecordExists(id)
  } while (exists)

  return id
}

/**
 * Converts an image ID to canonical file path.
 * Example: students:kth1m9c4n8l2a7vz → images/students/kth1m9c4n8l2a7vz.webp
 */
export const toFilePath = (id: string): string => {
  const [prefix, key] = id.split(':')
  if (!prefix || !key)
    return `${IMAGE_ROOT_DIR}/unknown/${id}${IMAGE_EXTENSION}`
  return `${IMAGE_ROOT_DIR}/${prefix}/${key}${IMAGE_EXTENSION}`
}
