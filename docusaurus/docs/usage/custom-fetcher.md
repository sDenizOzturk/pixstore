---
id: custom-endpoint
title: Custom Endpoint & Fetcher
sidebar_position: 6
---

Pixstore includes a default image fetcher and a built-in backend HTTP endpoint.
With these defaults, images are fetched automatically with minimal configuration.

The [**default endpoint**](/docs/usage/default-endpoint) is secure by design: it verifies [**stateless proof**](/docs/usage/integration#stateless-proof-mechanism) for every request and only serves images that were explicitly authorized by your backend.
This mechanism protects your images from unauthorized access, even if someone knows the image ID.

If you need **additional protection**, such as user-specific access control (for example JWT tokens or roles) or if you want to use a different transport (like WebSocket or gRPC),
you can implement a [**custom image endpoint**](/docs/api-reference/backend/custom-endpoint#customendpointhelper) and register a [**custom fetcher**](/docs/api-reference/types#imagefetcher) on the frontend.

When you use a custom fetcher, Pixstore still enforces [**stateless proof**](/docs/usage/integration#stateless-proof-mechanism) validation,
ensuring that only valid and time-bound image requests are processed.
This means you can combine **Pixstore's built-in security** with your own logic for authentication, rate limiting, analytics and more, all while preserving encryption, token-based caching and metadata management.

---

## Creating a Custom Image Endpoint on the Backend

You can build your own image endpoint using any backend framework (e.g. Express, Fastify).
This gives you full control over authentication and authorization logic.

**Example: Express.js with JWT + role check**

```ts
import express from 'express'
import { customEndpointHelper } from 'pixstore/backend'

const app = express()

app.get('/player-image/:playerId/:imageId', async (req, res) => {
  const { playerId, imageId } = req.params
  const statelessProof = req.headers['x-pixstore-proof'] as string
  const clientTokenRaw = req.query.token ?? req.headers['x-pixstore-token']
  const clientToken = clientTokenRaw !== undefined ? Number(clientTokenRaw) : 0

  // Optional: check JWT token, user roles, etc.
  const user = verifyJwt(req.headers.authorization)
  if (!canAccessImage(user, playerId)) {
    return res.status(403).json({ error: 'Unauthorized' })
  }

  const payload = await customEndpointHelper(
    imageId,
    clientToken,
    statelessProof,
  )
  if (!payload) {
    return res.status(404).json({ error: 'Image not found' })
  }

  res.setHeader('Content-Type', 'application/octet-stream')
  res.send(payload)
})
```

---

## Registering a Custom Fetcher on the Frontend

To support your custom endpoint, register a custom fetcher during [`initPixstoreFrontend`](/docs/api-reference/frontend/initialization#initpixstorefrontend).

**Example: fetcher that adds Authorization and playerId**

```ts
import { initPixstoreFrontend } from 'pixstore/frontend'
import type { ImageFetcher } from 'pixstore/types'
import { useAuth } from './auth-store'

const customFetcher: ImageFetcher = async (record, context) => {
  const { playerId } = context as { playerId: string }
  const jwt = useAuth.getState().jwt
  const headers: Record<string, string> = {
    Authorization: `Bearer ${jwt}`,
    'x-pixstore-proof': record.statelessProof,
  }
  if (record.token !== undefined) {
    headers['x-pixstore-token'] = String(record.token)
  }

  const res = await fetch(`/player-image/${playerId}/${record.id}`, {
    method: 'GET',
    headers,
  })

  if (!res.ok) throw new Error('Failed to fetch image')
  const buffer = await res.arrayBuffer()
  return new Uint8Array(buffer)
}

initPixstoreFrontend(
  {
    // Pixstore config such as cache limits, error handling mode etc.
  },
  customFetcher,
)
```

:::note Context support
The second argument to your custom fetcher is a `context` object.
You can pass in values like `playerId`, user roles, etc. from your app code:

```ts
getImage(record, { playerId: 42 })
```

:::

---

## What can you do with custom endpoints?

- Enforce role-based access for each image
- Use custom headers, authentication, or request libraries
- Fetch images via non-HTTP protocols (WebSocket, gRPC, etc.)
- Integrate advanced logging, rate limiting, or caching logic
- Load from third-party storage systems (e.g. AWS S3)

Pixstore handles decryption, wire format, and local caching.
You control when and how images are served securely.

---

## Pixstore Wire Format

When you create a **custom endpoint** or a **custom fetcher**, all image data flows through Pixstore’s internal **wire format**.

This format ensures encrypted data, tokens, and decryption metadata are transmitted efficiently and securely, without exposing sensitive internals.

### Key rules:

- Your backend **must return** a binary `Uint8Array` payload (e.g. via `customEndpointHelper()`).
- Your custom fetcher **must return** the same `Uint8Array` payload to Pixstore.
- The format is always decoded on the frontend using Pixstore’s internal decoder.
- Every request should return HTTP `200`. **Errors** are expressed using a `state` field inside the binary payload.

Pixstore uses this layout internally to encode and decode wire payloads. You **must not** return plain JSON or raw image buffers, always use this binary format.

### Common `WirePayloadState` values:

| State          | Meaning                                          |
| -------------- | ------------------------------------------------ |
| `Success = 0`  | Image cached and valid, returns minimal response |
| `Updated = 1`  | Token mismatch, returns full metadata            |
| `NotFound = 2` | Image not found on server                        |
| `MissingProof` | Stateless proof was not provided                 |
| `InvalidProof` | Stateless proof was expired or invalid           |

> All custom endpoints should return status `200`, even in error cases. Pixstore decodes the `state` from the wire payload itself.

---

## Minimal vs Full Metadata Responses

Pixstore is optimized to send the **smallest possible payload** when the image is already cached and valid.

- If the `token` in your `imageRecord` matches the backend token, Pixstore returns a **minimal payload** containing only the encrypted image.
- If the token is outdated, Pixstore returns a **full payload** with updated encryption metadata (`meta`) and the new token.

This mechanism is fully automated, but only works correctly if the `clientToken` is passed to the backend.

> ⚠️ **Important:** When using a [custom image endpoint helper](/docs/api-reference/backend/custom-endpoint#customendpointhelper), always pass the `clientToken`.
> If this is omitted, Pixstore cannot determine whether the image is cached correctly, and will **always return full metadata**, increasing payload size and wasting resources.

A minimal response is ideal in nearly all cases.
Full metadata is only returned **if the image was updated recently**, and the frontend's token is stale.

---

## See also

- [API Reference – customEndpointHelper()](/docs/api-reference/backend/custom-endpoint)
- [API Reference – ImageFetcher](/docs/api-reference/types#imagefetcher)
- [Usage – Stateless proof mechanism](/docs/usage/integration#stateless-proof-mechanism)
