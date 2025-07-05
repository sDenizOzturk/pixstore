---
id: initialization
title: Initialization
sidebar_position: 1
---

# Initialization

Learn how to set up Pixstore for both backend (Node.js) and frontend (browser) environments.  
This guide covers the minimal setup required to get Pixstore working in your app.

---

## Backend Initialization

To use Pixstore on the server side, import and call `initPixstoreBackend`.
You can provide custom configuration or use defaults.

:::note Required!
You **must** call `initPixstoreBackend()` _once_ before using any Pixstore backend features.
It should be the very first Pixstore call in your app (before saving or fetching any images).
:::

```ts
import { initPixstoreBackend } from 'pixstore/backend'

// Minimal setup (uses default config)
initPixstoreBackend()

// Or with custom options
initPixstoreBackend({
  imageRootDir: 'my-images',
  databasePath: './data/pixstore.sqlite',
})
```

- This prepares the SQLite database and image storage directory.
- If `defaultEndpointEnabled` is true (default), Pixstore exposes an HTTP endpoint for image serving.

> **Tip:**
> If you disable the default endpoint, you must provide your own image endpoint (see [Custom Endpoints](./custom-endpoint)).

> **For all configuration options, see** [PixstoreBackendConfig Type](../api-reference/types#pixstorebackendconfig).

---

## Frontend Initialization

On the browser side, import and call `initPixstoreFrontend`.
You can optionally customize cache settings or IndexedDB names.

:::note Required!
You **must** call `initPixstoreFrontend()` _once_ before using any Pixstore functions on the frontend.
It should be the very first Pixstore call in your browser app, before attempting to cache or fetch images.
:::

```ts
import { initPixstoreFrontend } from 'pixstore/frontend'

// Minimal setup (uses default config)
initPixstoreFrontend()

// Or with custom options
initPixstoreFrontend({
  frontendImageCacheLimit: 200,
  frontendDbName: 'custom-pixstore',
  defaultEndpointConnectHost: 'https://your-api-host',
})
```

- This prepares the IndexedDB database for image caching.
- You can safely call `initPixstoreFrontend` early in your app (e.g., at startup).

:::warning Critical!
If you use default fetcher, you **must** set `defaultEndpointConnectHost: string`.
:::

> **For all configuration options, see** [PixstoreFrontendConfig Type](../api-reference/types#pixstorefrontendconfig).

---

## What happens under the hood?

- **Backend:** Creates necessary folders and tables, starts the HTTP endpoint if enabled.
- **Frontend:** Sets up browser database, cache limits, and network settings.
- Both modules validate your config and fall back to safe defaults if you skip options.
