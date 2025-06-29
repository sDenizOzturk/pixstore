/**
 * Jest global teardown script.
 * Runs after all tests complete.
 * Used for cleaning up test artifacts (database files, test folders, etc).
 * Only runs in test mode (IS_TEST).
 */

import fs from 'fs'
import path from 'path'
import { pixstoreConfig } from './shared/pixstore-config.js'
import { fileURLToPath } from 'url'
import { IS_TEST } from './shared/constants.js'
const DATABASE_PATH = pixstoreConfig.databasePath
const IMAGE_ROOT_DIR = pixstoreConfig.imageRootDir

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const rootDir = path.resolve(__dirname, '..')

export default async () => {
  console.log('globalTeardown running...')
  if (!IS_TEST) {
    console.log('Not in test mode (IS_TEST=false), skipping teardown.')
    return
  }

  removeTestDatabase()
  removeTestImageFolder()
}

/**
 * Removes the test database file.
 */
const removeTestDatabase = () => {
  const dbPath = path.resolve(rootDir, DATABASE_PATH)
  console.log('globalTeardown deleting:', dbPath)
  if (fs.existsSync(dbPath)) {
    fs.rmSync(dbPath, { force: true, recursive: true })
    console.log('✅ Test DB deleted')
  } else {
    console.log('⚠️ Test DB not found (already removed?)')
  }
}

/**
 * Removes the test image folder and its contents.
 */
const removeTestImageFolder = () => {
  const imageDir = path.resolve(rootDir, IMAGE_ROOT_DIR)
  console.log('globalTeardown deleting:', imageDir)
  if (fs.existsSync(imageDir)) {
    fs.rmSync(imageDir, { recursive: true, force: true })
    console.log('✅ Test image folder deleted')
  } else {
    console.log('⚠️ Test image folder not found (already removed?)')
  }
}
