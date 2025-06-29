// Import Pixstore backend initializer from the official package.
import { initPixstoreBackend } from '../../../../../dist/backend'
//import { initPixstoreBackend } from "pixstore/backend";
import * as fs from 'fs'

// Path for storing Pixstore image files
const IMAGE_ROOT_DIR = 'nba-pixstore-images'

// SQLite database file path for Pixstore image records
const DATABASE_PATH = 'nba-pixstore.sqlite'

// Removes any old Pixstore DB file and image directory to ensure a clean state before initialization.
// This is intended for example/demo purposes. In production, you would not delete data like this.
export function clearOldPixstore() {
  // Remove the database file if it exists
  if (fs.existsSync(DATABASE_PATH)) {
    fs.rmSync(DATABASE_PATH)
  }

  // Remove the image root directory and all its contents if it exists
  if (fs.existsSync(IMAGE_ROOT_DIR)) {
    fs.rmSync(IMAGE_ROOT_DIR, { recursive: true, force: true })
  }
}

// Disables the default Pixstore HTTP endpoint.
// Set to false when using a custom Express-based API instead of the built-in server.
const DEFAULT_ENDPOINT_ENABLED = false

/**
 * Initializes Pixstore backend with a clean database and image directory.
 * - Removes old data by calling clearOldPixstore()
 * - Calls initPixstoreBackend() with example config values
 * This function should be called once at startup (before seeding or serving any requests).
 */
export const initPixstore = () => {
  clearOldPixstore()
  initPixstoreBackend({
    imageRootDir: IMAGE_ROOT_DIR,
    databasePath: DATABASE_PATH,
    defaultEndpointEnabled: DEFAULT_ENDPOINT_ENABLED,
  })
}
