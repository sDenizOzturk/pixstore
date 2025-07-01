---
id: initialization
title: Initialization
sidebar_position: 1
---

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

| Name   | Type                             | Description                                     |
| ------ | -------------------------------- | ----------------------------------------------- |
| config | `Partial<PixstoreBackendConfig>` | Optional runtime configuration for the backend. |

#### PixstoreBackendConfig

The `PixstoreBackendConfig` object allows you to customize how Pixstore behaves in the backend environment.
All fields are optional; missing values are filled using the internal `defaultConfig`.

| Property                    | Type            | Default (non-test)        | Description                                                     |
| --------------------------- | --------------- | ------------------------- | --------------------------------------------------------------- |
| `imageFormats`              | `ImageFormat[]` | `['png', 'jpeg', 'webp']` | Allowed image formats                                           |
| `imageRootDir`              | `string`        | `'pixstore-images'`       | Folder where images are saved                                   |
| `databasePath`              | `string`        | `'./.pixstore.sqlite'`    | Path to SQLite metadata DB                                      |
| `defaultEndpointEnabled`    | `boolean`       | `true`                    | Whether to expose the default GET image endpoint                |
| `defaultEndpointRoute`      | `string`        | `'/pixstore-image'`       | Route path for the default image endpoint                       |
| `defaultEndpointListenHost` | `string`        | `'0.0.0.0'`               | Host/IP where the image endpoint HTTP server listens            |
| `defaultEndpointListenPort` | `number`        | `3001`                    | Port where the image endpoint HTTP server listens               |
| `accessControlAllowOrigin`  | `string`        | `'*'`                     | CORS `Access-Control-Allow-Origin` header for the default route |

> ℹ️ When running in test mode (`IS_TEST === true`), values like paths and ports are automatically randomized or sandboxed.

---

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
