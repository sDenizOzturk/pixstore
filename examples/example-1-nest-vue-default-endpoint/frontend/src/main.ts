import './assets/main.css'
// IMPORTANT: In this example, Pixstore types are imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreFrontend } from 'pixstore/frontend'
//
import { initPixstoreFrontend } from '../../../../dist/frontend'

import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'

export const DEFAULT_ENDPOINT_PORT = 4000
// Uses a very small image cache limit and cleanup batch so example users can easily observe
// Pixstore's automatic cache eviction and cleanup in action.
// (In production, these values should be much larger for performance.)
const FRONTEND_IMAGE_CACHE_LIMIT = 5 // Maximum images to cache in IndexedDB before eviction
const FRONTEND_CLEANUP_BATCH = 2 // Number of images to clean up in a single batch

// Initialize Pixstore frontend: must be called before using any Pixstore features.
initPixstoreFrontend({
  defaultEndpointConnectPort: DEFAULT_ENDPOINT_PORT,
  frontendImageCacheLimit: FRONTEND_IMAGE_CACHE_LIMIT,
  frontendCleanupBatch: FRONTEND_CLEANUP_BATCH,
})

const app = createApp(App)
app.use(createPinia())
app.mount('#app')
