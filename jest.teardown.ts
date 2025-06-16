/**
 * Jest global teardown script.
 * Runs after all tests complete.
 * Used for cleaning up test artifacts (database files, test folders, etc).
 * Only runs in test mode (IS_TEST).
 */

import fs from 'fs'
import path from 'path'
import { DATABASE_PATH, IS_TEST } from './src/shared/constants'

module.exports = async () => {
  if (!IS_TEST) {
    console.log('Not in test mode (IS_TEST=false), skipping teardown.')
    return
  }
  removeTestDatabase()

  //FUTURE WORK REMOVE TEST IMAGES FOLDER
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
