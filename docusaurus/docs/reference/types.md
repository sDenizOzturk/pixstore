---
id: types
title: Types
sidebar_position: 4
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

This page documents the shared type definitions used across Pixstore frontend and backend.

Some types on this page are internal and not exported.

All exported types can be imported from the `pixstore/types` entrypoint:

```ts
import type { ImageRecord } from 'pixstore/types'
```

---

# Exported Types

## `ImageRecord`

Represents a reference to an image stored in Pixstore, including the ID, access token, and decryption metadata.

Used to fetch and decrypt images on the frontend.

### Definition

```ts
export interface ImageRecord {
  id: string
  token: number
  meta: ImageDecryptionMeta
}
```

### Fields

| Name    | Type                                          | Description                                     |
| ------- | --------------------------------------------- | ----------------------------------------------- |
| `id`    | `string`                                      | Unique identifier of the image                  |
| `token` | `number`                                      | Used for cache validation and versioning        |
| `meta`  | [`ImageDecryptionMeta`](#imagedecryptionmeta) | Decryption metadata: key, IV, tag, format, etc. |

---

📄 Source: [`src/types/image-record.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/types/image-record.ts)

---

# Internal Types

## `ImageDecryptionMeta`

Metadata required to decrypt an encrypted image in Pixstore.

This object is used internally and included as part of each `ImageRecord`.

### Definition

```ts
export interface ImageDecryptionMeta {
  key: string // Base64-encoded AES-GCM encryption key
  iv: string // Initialization vector (IV) for AES-GCM, base64-encoded
  tag: string // Authentication tag for AES-GCM, base64-encoded
}
```

### Fields

| Name  | Type     | Description                               |
| ----- | -------- | ----------------------------------------- |
| `key` | `string` | Base64-encoded AES-GCM encryption key     |
| `iv`  | `string` | Base64-encoded initialization vector (IV) |
| `tag` | `string` | Base64-encoded authentication tag         |

---

📄 Source: [`src/types/image-record.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/types/image-record.ts)

---

## `PixstoreBackendConfig`

Configuration object for customizing Pixstore’s backend storage, server, and error handling.

All fields are optional; any missing values are filled using Pixstore’s internal `defaultConfig`.

### Definition

```ts
export interface PixstoreBackendConfig {
  imageFormats: readonly ImageFormat[]
  imageRootDir: string
  databasePath: string
  defaultEndpointEnabled: boolean
  defaultEndpointListenHost: string
  defaultEndpointListenPort: number
  defaultEndpointRoute: string
  accessControlAllowOrigin: string
  errorHandlingMode: ErrorHandlingMode
}
```

### Fields

| Property                    | Type                                      | Default (non-test)        | Description                                                     |
| --------------------------- | ----------------------------------------- | ------------------------- | --------------------------------------------------------------- |
| `imageFormats`              | `ImageFormat[]`                           | `['png', 'jpeg', 'webp']` | Allowed image formats                                           |
| `imageRootDir`              | `string`                                  | `'pixstore-images'`       | Folder where images are saved                                   |
| `databasePath`              | `string`                                  | `'./.pixstore.sqlite'`    | Path to SQLite metadata DB                                      |
| `defaultEndpointEnabled`    | `boolean`                                 | `true`                    | Whether to expose the default GET image endpoint                |
| `defaultEndpointRoute`      | `string`                                  | `'/pixstore-image'`       | Route path for the default image endpoint                       |
| `defaultEndpointListenHost` | `string`                                  | `'0.0.0.0'`               | Host/IP where the image endpoint HTTP server listens            |
| `defaultEndpointListenPort` | `number`                                  | `3001`                    | Port where the image endpoint HTTP server listens               |
| `accessControlAllowOrigin`  | `string`                                  | `'*'`                     | CORS `Access-Control-Allow-Origin` header for the default route |
| `errorHandlingMode`         | [`ErrorHandlingMode`](#errorhandlingmode) | `'hybrid'`                | Error handling strategy for Pixstore API calls.                 |

---

> ℹ️ When running in test mode (`IS_TEST === true`), values like paths and ports are automatically randomized or sandboxed.

---

📄 Source: [`src/types/pixstore-config.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/types/pixstore-config.ts)

---

## `PixstoreFrontendConfig`

Configuration object for customizing Pixstore’s frontend image caching, database, and endpoint connection.

All fields are optional; any missing values are filled using Pixstore’s internal `defaultConfig`.

### Definition

```ts
export interface PixstoreFrontendConfig {
  imageFormats: readonly ImageFormat[]
  frontendDbName: string
  frontendDbVersion: number
  imageStoreName: string
  frontendImageCacheLimit: number
  frontendCleanupBatch: number
  defaultEndpointConnectHost: string
  defaultEndpointConnectPort: number
  defaultEndpointRoute: string
  errorHandlingMode: ErrorHandlingMode
}
```

### Fields

| Property                     | Type                                      | Default (non-test)        | Description                                                                |
| ---------------------------- | ----------------------------------------- | ------------------------- | -------------------------------------------------------------------------- |
| `imageFormats`               | `ImageFormat[]`                           | `['png', 'jpeg', 'webp']` | Allowed image formats                                                      |
| `frontendDbName`             | `string`                                  | `'pixstore'`              | IndexedDB database name                                                    |
| `frontendDbVersion`          | `number`                                  | `1`                       | IndexedDB schema version                                                   |
| `imageStoreName`             | `string`                                  | `'images'`                | Object store name for image records                                        |
| `frontendImageCacheLimit`    | `number`                                  | `1000`                    | Maximum number of images to keep in the local cache                        |
| `frontendCleanupBatch`       | `number`                                  | `50`                      | Number of items to remove per cleanup cycle when limit is exceeded         |
| `defaultEndpointConnectHost` | `string`                                  | `'unknown'`               | Host to contact for image fetching (used if no custom fetcher is provided) |
| `defaultEndpointConnectPort` | `number`                                  | `3001`                    | Port to contact for image fetching                                         |
| `defaultEndpointRoute`       | `string`                                  | `'/pixstore-image'`       | Route to contact for image fetching                                        |
| `errorHandlingMode`          | [`ErrorHandlingMode`](#errorhandlingmode) | `'hybrid'`                | Error handling strategy for Pixstore API calls.                            |

---

> ℹ️ In test mode (`IS_TEST === true`), database names and limits are automatically sandboxed.

---

📄 Source: [`src/types/pixstore-config.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/types/pixstore-config.ts)

---

## `ErrorHandlingMode`

Enumerates the possible error handling strategies for Pixstore API calls.

Used in Pixstore configuration to control error propagation and reporting across all modules.

**Note:** This type is internal and not exported. It cannot be imported directly.

### Definition

```ts
export type ErrorHandlingMode =
  | 'hybrid'
  | 'throw'
  | 'warn'
  | 'silent'
  | 'custom'
```

### Fields

| Value    | Description                                                                                      |
| -------- | ------------------------------------------------------------------------------------------------ |
| `hybrid` | Logs and returns `null` for `PixstoreError` (expected errors); throws all other errors.(default) |
| `throw`  | Throws all errors (default in test environments).                                                |
| `warn`   | Logs any error and returns `null`.                                                               |
| `silent` | Ignores any error and returns `null`.                                                            |
| `custom` | Calls a user-provided error handler; all error logic must be handled in your handler.            |

---

📄 Source: [`src/types/error-handling-mode.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/types/error-handling-mode.ts)

📄 Source: [`src/shared/handle-error.js`](https://github.com/sDenizOzturk/pixstore/blob/main/src/shared/handle-error.js)
