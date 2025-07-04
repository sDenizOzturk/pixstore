// IMPORTANT: In this example, Pixstore is imported directly from a local build path for demonstration purposes.
// In real projects, you should install Pixstore via npm and import as follows:
//
//   import { initPixstoreBackend } from 'pixstore/backend'
//
import { initPixstoreFrontend } from '../../../../dist/frontend'
import type { ImageFetcher } from '../../../../dist/types'
import { useAuth } from './store/auth'
import { API_BASE } from './constants'

// Uses a very small image cache limit and cleanup batch so example users can easily observe
// Pixstore's automatic cache eviction and cleanup in action.
// (In production, these values should be much larger for performance.)
const FRONTEND_IMAGE_CACHE_LIMIT = 11 // Maximum images to cache in IndexedDB before eviction
const FRONTEND_CLEANUP_BATCH = 2 // Number of images to clean up in a single batch

/**
 * --- CRITICAL ---
 * Initializes Pixstore frontend and registers a custom image fetcher.
 * The custom fetcher allows sending the playerId and JWT to the backend for secure image access.
 * This is REQUIRED to support custom image endpoint and role-based access.
 */
const customImageFetcher: ImageFetcher = async ({
  imageId,
  imageToken,
  statelessProof,
  context,
}) => {
  const { playerId } = context
  const jwt = useAuth.getState().jwt

  const headers: Record<string, string> = {
    Authorization: `Bearer ${jwt}`,
    // Pixstore endpointleri için zorunlu
    'x-pixstore-proof': statelessProof,
  }
  if (imageToken !== undefined) {
    headers['x-pixstore-token'] = String(imageToken)
  }

  const res = await fetch(`${API_BASE}/player-image/${playerId}/${imageId}`, {
    method: 'GET',
    headers,
  })

  if (!res.ok) throw new Error('Failed to fetch image')
  const arrayBuffer = await res.arrayBuffer()
  return new Uint8Array(arrayBuffer)
}

export const initPixstore = () => {
  // Initialize Pixstore frontend: must be called before using any Pixstore features.
  initPixstoreFrontend(
    {
      frontendImageCacheLimit: FRONTEND_IMAGE_CACHE_LIMIT,
      frontendCleanupBatch: FRONTEND_CLEANUP_BATCH,
      errorHandlingMode: 'throw',
    },
    customImageFetcher,
  )
}
