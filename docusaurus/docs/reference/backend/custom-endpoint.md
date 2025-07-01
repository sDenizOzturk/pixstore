---
id: custom-endpoint
title: Custom Endpoint Helper
sidebar_position: 3
---

The function on this page is exported from the `pixstore/backend` entrypoint:

```ts
import { customEndpointHelper } from 'pixstore/backend'
```

## `customEndpointHelper`

This function allows you to build your own custom image-serving endpoint for Pixstore.

It returns an image payload encoded in Pixstore's wire format (`Uint8Array`), which is directly consumable by the frontend.

If the default endpoint is enabled, this function throws an error to prevent accidental dual-endpoint usage.

---

### Description

```ts
export const customEndpointHelper = (
  id: string
): Promise<Uint8Array>
```

---

### Parameters

| Name | Type     | Description                              |
| ---- | -------- | ---------------------------------------- |
| `id` | `string` | The ID of the image to retrieve and send |

---

### Example

```ts
try {
  // Get encrypted wire-format image buffer
  const payload = await customEndpointHelper(imageId)

  // Return to client as binary
  res.send(payload)
} catch {
  // Handle missing image or endpoint conflict
  res.status(404).json({ error: 'Image not found' })
}
```

---

### How it works?

```ts
/**
 * Returns a Pixstore wire format encoded image payload (Uint8Array) for the given image id.
 * Throws if the default endpoint is running, to prevent accidental double endpoint use.
 * Can be used in any custom endpoint handler to build a response.
 */
export const customEndpointHelper = async (id: string): Promise<Uint8Array> => {
  // Prevent usage if the default endpoint is active (safety guard)
  if (isServerStarted()) {
    throw new Error(
      'Pixstore custom endpoint mode is not active. Please disable the default endpoint before using customEndpointHelper().',
    )
  }

  // Fetch decrypted image and metadata as a wire payload structure
  const wirePayload = await getWirePayload(id)

  // Encode it as Uint8Array in Pixstore wire format (used by frontend to decode)
  return encodeWirePayload(wirePayload)
}
```

---

📄 Source: [`src/backend/custom-endpoint.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/custom-endpoint.ts)
