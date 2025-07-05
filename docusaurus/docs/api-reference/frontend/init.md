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
  customImageFetcher?: ImageFetcher
): void
```

---

### Parameters

| Name                 | Type                                                                                      | Description                                             |
| -------------------- | ----------------------------------------------------------------------------------------- | ------------------------------------------------------- |
| `config`             | `Partial<`[`PixstoreFrontendConfig`](/docs/api-reference/types#pixstorefrontendconfig)`>` | Optional overrides for internal frontend configuration. |
| `customImageFetcher` | [`ImageFetcher`](/docs/api-reference/types#imagefetcher)                                  | Optional function to override how images are fetched.   |

---

### Example

```ts
import { initPixstoreFrontend } from 'pixstore/frontend'
import type { ImageFetcher } from 'pixstore/types'

// Custom fetcher supports full secure protocol (token, statelessProof)
const customImageFetcher: ImageFetcher = async (record, context) => {
  const { id: imageId, token: imageToken, statelessProof } = record
  const jwt = getJwtFromYourAuthSystem()

  const res = await fetch(`https://your-api.com/your-route/${imageId}`, {
    headers: {
      Authorization: `Bearer ${jwt}`,
      'x-pixstore-token': String(imageToken),
      'x-pixstore-proof': statelessProof,
    },
  })

  if (!res.ok) throw new Error('Failed to fetch image')
  const arrayBuffer = await res.arrayBuffer()
  return new Uint8Array(arrayBuffer)
}

// Usage
initPixstoreFrontend(
  {
    frontendImageCacheLimit: 2000,
    frontendCleanupBatch: 100,
  },
  customImageFetcher,
)
```

:::caution
If you provide a `customImageFetcher`, you must also implement a custom backend endpoint using `customEndpointHelper`.

Otherwise, the default image-fetching logic is bypassed and Pixstore cannot retrieve images through the default route, even if it is enabled.
:::

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
  customImageFetcher?: ImageFetcher,
) => {
  // Apply user config to internal state
  initPixstore(config)

  // Register optional image fetcher override
  registerCustomImageFetcher(customImageFetcher)
}
```

---

📄 Source: [`src/frontend/index.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/frontend/index.ts)
