---
id: initialization
title: Initialization
sidebar_position: 1
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

The function on this page is exported from the `pixstore/backend` entrypoint:

```ts
import { initPixstoreBackend } from 'pixstore/backend'
```

## `initPixstoreBackend`

Initializes the Pixstore backend module with optional runtime configuration.

This is the main entry point to set up Pixstore on the server side.

It configures the internal state, prepares the metadata database, and optionally starts the default HTTP endpoint.

---

### Description

```ts
export const initPixstoreBackend = (
  config: Partial<PixstoreBackendConfig> = {}
): void
```

### Parameters

| Name   | Type                                                                   | Description                                     |
| ------ | ---------------------------------------------------------------------- | ----------------------------------------------- |
| config | `Partial<`[`PixstoreBackendConfig`](../types#pixstorebackendconfig)`>` | Optional runtime configuration for the backend. |

### Example

```ts
import { initPixstoreBackend } from 'pixstore/backend'

initPixstoreBackend({
  defaultEndpointEnabled: false,
})
```

This will initialize the database and disable default image endpoint.

:::caution
If you disable the default endpoint just like this example
you **must** implement your own image-serving endpoint using `customEndpointHelper`.

Otherwise, the frontend mechanism of this library can not fetch images automatically
:::

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Initializes the Pixstore backend module with the given configuration.
 * Starts the default endpoint if enabled.
 */
export const initPixstoreBackend = (
  config: Partial<PixstoreBackendConfig> = {},
) => {
  // Validates user config (e.g. cleanupBatch must be < cacheLimit)
  // Then applies it to the internal Pixstore state
  initPixstore(config)

  // Prepares the database for storing image metadata
  initializeDatabase()

  // If enabled, starts the default image-serving HTTP endpoint
  if (pixstoreConfig.defaultEndpointEnabled) {
    startDefaultEndpoint()
  }
}
```

---

📄 Source: [`src/backend/index.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/index.ts)
