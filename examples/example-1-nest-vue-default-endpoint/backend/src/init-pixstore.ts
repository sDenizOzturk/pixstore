// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { initPixstoreBackend } from '../../../../dist/backend';
import * as fs from 'fs';

// Path for storing Pixstore image files
const IMAGE_ROOT_DIR = 'rm-pixstore-images';

// SQLite database file path for Pixstore image records
const DATABASE_PATH = 'rm-pixstore.sqlite';

// Removes any old Pixstore DB file and image directory to ensure a clean state before initialization.
// This is intended for example/demo purposes. In production, you would not delete data like this.
export function clearOldPixstore() {
  // Remove the database file if it exists
  if (fs.existsSync(DATABASE_PATH)) {
    fs.rmSync(DATABASE_PATH);
  }

  // Remove the image root directory and all its contents if it exists
  if (fs.existsSync(IMAGE_ROOT_DIR)) {
    fs.rmSync(IMAGE_ROOT_DIR, { recursive: true, force: true });
  }
}

// The port on which the default Pixstore HTTP endpoint will listen
const DEFAULT_ENDPOINT_PORT = 4000;

// The CORS origin for the default endpoint;
// For local development, this should match your frontend's dev server (e.g. Vite).
const ACCESS_CONTROL_ALLOW_ORIGIN = 'http://localhost:5173';

/**
 * Initializes Pixstore backend with a clean database and image directory.
 * - Removes old data by calling clearOldPixstore()
 * - Calls initPixstoreBackend() with example config values
 * This function should be called once at startup (before seeding or serving any requests).
 */
export const initPixstore = () => {
  clearOldPixstore();
  initPixstoreBackend({
    imageRootDir: IMAGE_ROOT_DIR,
    databasePath: DATABASE_PATH,
    defaultEndpointListenPort: DEFAULT_ENDPOINT_PORT,
    accessControlAllowOrigin: ACCESS_CONTROL_ALLOW_ORIGIN,
  });
};
