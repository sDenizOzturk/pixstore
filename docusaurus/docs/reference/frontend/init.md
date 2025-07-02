---
id: initialization
title: Initialization
sidebar_position: 1
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

The function on this page is exported from the `pixstore/frontend` entrypoint:

```ts
import { initPixstoreFrontend } from 'pixstore/frontend'
```

## `initPixstoreFrontend`

Initializes the Pixstore frontend module with optional configuration and an optional custom image fetcher.

This is the main entry point to configure the frontend image cache, database name/version, and network behavior.

---

### Description

```ts
export const initPixstoreFrontend = (
  config?: Partial<PixstoreFrontendConfig>,
  customImageFetcher?: CustomImageFetcher
): void
```

---

### Parameters

| Name                 | Type                                                                     | Description                                             |
| -------------------- | ------------------------------------------------------------------------ | ------------------------------------------------------- |
| `config`             | `Partial<`[`PixstoreFrontendConfig`](../types#pixstorefrontendconfig)`>` | Optional overrides for internal frontend configuration. |
| `customImageFetcher` | [`CustomImageFetcher`](#customimagefetcher)                              | Optional function to override how images are fetched.   |

---

### CustomImageFetcher

The optional `customImageFetcher` parameter allows you to override how images are fetched in the frontend.

By default, Pixstore sends a `GET` request to the configured default endpoint (`defaultEndpointConnectHost`, `Port`, and `Route`).

If you want to implement a custom download mechanism (e.g. with tokens, cookies, or alternative URLs), you can provide your own function:

```ts
type CustomImageFetcher = (id: string) => Promise<Uint8Array>
```

This function will be used by Pixstore internally instead of the default fetcher.

:::caution
If you provide a `customImageFetcher`, you must also implement a custom backend endpoint using `customEndpointHelper`.

Otherwise, the default image-fetching logic is bypassed and Pixstore cannot retrieve images through the default route, even if it is enabled.
:::

---

### Example

```ts
// Define a custom image fetcher function
const customImageFetcher = async (id: string) => {
  // Add custom authorization header
  const jwt = getJwtFromYourAuthSystem()

  // Construct your own image endpoint URL
  const res = await fetch(`https://your-api.com/your-route/${id}`, {
    headers: { Authorization: `Bearer ${jwt}` },
  })

  // Convert response to Uint8Array if successful
  if (!res.ok) throw new Error('Failed to fetch image')
  const arrayBuffer = await res.arrayBuffer()
  return new Uint8Array(arrayBuffer)
}

// Initialize Pixstore frontend with custom fetcher and optional config overrides
initPixstoreFrontend(
  {
    frontendImageCacheLimit: 2000,
    frontendCleanupBatch: 100,
  },
  customImageFetcher,
)
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Initializes the Pixstore frontend module with the given configuration.
 * Optionally, a custom image fetcher function can be provided.
 */
export const initPixstoreFrontend = (
  config: Partial<PixstoreFrontendConfig> = {},
  customImageFetcher?: CustomImageFetcher,
) => {
  // Validates user config (e.g. cleanupBatch must be < cacheLimit)
  // Then applies it to the internal Pixstore state
  initPixstore(config)

  // Register optional image fetcher override
  registerCustomImageFetcher(customImageFetcher)
}
```

---

📄 Source: [`src/frontend/index.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/frontend/index.ts)
