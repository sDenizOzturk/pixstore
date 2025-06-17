/**
 * Jest global teardown script.
 * Runs after all tests complete.
 * Used for cleaning up test artifacts (database files, test folders, etc).
 * Only runs in test mode (IS_TEST).
 */

import fs from 'fs'
import path from 'path'
import { DATABASE_PATH, IMAGE_ROOT_DIR, IS_TEST } from './src/constants'

module.exports = async () => {
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
  const dbPath = path.resolve(__dirname, DATABASE_PATH)
  console.log('globalTeardown running, deleting:', dbPath)
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
  const imageDir = path.resolve(__dirname, IMAGE_ROOT_DIR)
  console.log('globalTeardown running, deleting image folder:', imageDir)
  if (fs.existsSync(imageDir)) {
    fs.rmSync(imageDir, { recursive: true, force: true })
    console.log('✅ Test image folder deleted')
  } else {
    console.log('⚠️ Test image folder not found (already removed?)')
  }
}
