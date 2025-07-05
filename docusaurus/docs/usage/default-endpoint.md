---
id: default-endpoint
title: Default Endpoint & Fetcher
sidebar_position: 5
---

Pixstore provides a default backend endpoint and a built-in fetcher for secure and easy image retrieval with minimal configuration.

By default, encrypted images can be served and fetched automatically between backend and frontend. This works as long as you pass a valid [`imageRecord`](/docs/api-reference/types#imagerecord) object and configure the backend host on the frontend.

You do not need to write custom routes or fetch logic for standard use cases.  
All request validation, including [stateless proof generation and validation](/docs/usage/integration#stateless-proof-mechanism), happens automatically behind the scenes.

## How it works

- The backend exposes an HTTP endpoint for encrypted image requests, typically at `/pixstore-image/:id`.
- The frontend uses the default fetcher to call this endpoint using a valid [`imageRecord`](/docs/api-reference/types#imagerecord).
- Each request includes a short-lived [`statelessProof`](/docs/usage/integration#stateless-proof-mechanism) that authorizes access to the image.
- The backend validates the proof and responds with encrypted image data in Pixstore wire format (Pixstore’s internal binary wire format).
- The frontend decodes, decrypts, and caches the image automatically using the metadata provided in the record.

## Configuration options

You can customize both the backend endpoint and the frontend fetcher with these config options:

### Backend (`initPixstoreBackend`)

- `defaultEndpointListenHost`: Hostname or IP to bind the HTTP server (default: `"0.0.0.0"`)
- `defaultEndpointListenPort`: Port to listen on (default: `7482`)
- `defaultEndpointRoute`: The route where images are served (default: `"/pixstore-image"`)
- `accessControlAllowOrigin`: CORS header value to allow cross-origin requests (default: `"*"`)
- `statelessKeyWindowLength`: Controls how long a stateless proof remains valid (in milliseconds).  
  Use `-1` to disable proof validation entirely (for testing or internal tools).

### Frontend (`initPixstoreFrontend`)

- `defaultEndpointConnectHost`: The backend host to connect to (required if using the default fetcher)
- `defaultEndpointConnectPort`: The backend port to connect to (default: `7482`)
- `defaultEndpointRoute`: The route to request images from (default: `"/pixstore-image"`)

## Example usage

**Backend:**

```ts
import { initPixstoreBackend } from 'pixstore/backend'

initPixstoreBackend({
  defaultEndpointListenHost: '0.0.0.0',
  defaultEndpointListenPort: 8000,
  defaultEndpointRoute: '/my-image-endpoint',
  accessControlAllowOrigin: 'https://my-frontend-app.com',
})
```

**Frontend:**

```ts
import { initPixstoreFrontend } from 'pixstore/frontend'

initPixstoreFrontend({
  defaultEndpointConnectHost: 'https://my-api.com',
  defaultEndpointConnectPort: 8000,
  defaultEndpointRoute: '/my-image-endpoint',
})
```

## Notes

- The default fetcher only works if the backend default endpoint is enabled.
- If you disable the default endpoint, you must provide your own image endpoint and a custom fetcher.
- You must pass a valid [`imageRecord`](/docs/api-reference/types#imagerecord) to use the default fetcher. Without it, image requests will fail.
- Each request includes a [`statelessProof`](/docs/usage/integration#stateless-proof-mechanism) automatically. The backend validates this proof before serving any image data.
- CORS must be set correctly if your frontend and backend are on different domains.
- The default fetcher does not handle user authentication or access control. For protected images, use a custom endpoint and fetcher.

---

For more details, see the [API Reference](/docs/api-reference/backend/init-pixstore-backend) and advanced configuration guides.
