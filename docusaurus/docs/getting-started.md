---
id: getting-started
title: Getting Started
sidebar_position: 2
---

Pixstore is published on npm and can be installed easily:

```bash
npm install pixstore
```

Pixstore is modular and **cannot be imported as a single package**:

```ts
import Pixstore from 'pixstore' // ❌ This will NOT work
```

Instead, **import from one of the following entrypoints based on your needs**:

## `pixstore/backend`

For backend (Node.js) usage: image storage, database, HTTP server, etc.

```ts
import { initPixstoreBackend } from 'pixstore/backend'
```

> For a full list of available exports [API Reference/Backend Module](./category/backend-module).

## `pixstore/frontend`

For browser (frontend) usage: image cache, fetching, and storage in IndexedDB.

```ts
import { initPixstoreFrontend } from 'pixstore/frontend'
```

> For a full list of available exports [API Reference/Frontend Module](./category/frontend-module).

## `pixstore/shared`

For code shared between backend and frontend, such as error handling and utilities.

```ts
import { setCustomErrorHandler } from 'pixstore/shared'
```

> For a full list of available exports [API Reference/Shared Module](./api-reference/shared-module).

## `pixstore/types`

For TypeScript types and interfaces.
Use anywhere for type safety.

```ts
import type { ImageRecord } from 'pixstore/types'
```

> For a full list of available exports [API Reference/Types](./api-reference/types).
