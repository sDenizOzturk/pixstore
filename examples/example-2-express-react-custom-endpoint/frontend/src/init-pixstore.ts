// Import Pixstore backend initializer from the official package.
import { initPixstoreFrontend } from "pixstore/frontend";
import { useAuth } from "./store/auth";
import { API_BASE } from "./constants";

// Uses a very small image cache limit and cleanup batch so example users can easily observe
// Pixstore's automatic cache eviction and cleanup in action.
// (In production, these values should be much larger for performance.)
const FRONTEND_IMAGE_CACHE_LIMIT = 11; // Maximum images to cache in IndexedDB before eviction
const FRONTEND_CLEANUP_BATCH = 2; // Number of images to clean up in a single batch

/**
 * --- CRITICAL ---
 * Initializes Pixstore frontend and registers a custom image fetcher.
 * The custom fetcher allows sending the playerId and JWT to the backend for secure image access.
 * This is REQUIRED to support custom image endpoint and role-based access.
 */
export const initPixstore = () => {
  const customImageFetcher = async (
    imageId: string,
    context: { playerId: number }
  ) => {
    const jwt = useAuth.getState().jwt;
    const { playerId } = context;

    const res = await fetch(`${API_BASE}/player-image/${playerId}/${imageId}`, {
      headers: { Authorization: `Bearer ${jwt}` },
    });

    if (!res.ok) throw new Error("Failed to fetch image");
    const arrayBuffer = await res.arrayBuffer();
    return new Uint8Array(arrayBuffer);
  };

  // Initialize Pixstore frontend: must be called before using any Pixstore features.
  initPixstoreFrontend(
    {
      frontendImageCacheLimit: FRONTEND_IMAGE_CACHE_LIMIT,
      frontendCleanupBatch: FRONTEND_CLEANUP_BATCH,
    },
    customImageFetcher
  );
};
