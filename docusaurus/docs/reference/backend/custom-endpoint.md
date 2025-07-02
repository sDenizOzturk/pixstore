---
id: custom-endpoint
title: Custom Endpoint Helper
sidebar_position: 3
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

The function on this page is exported from the `pixstore/backend` entrypoint:

```ts
import { customEndpointHelper } from 'pixstore/backend'
```

## `customEndpointHelper`

This function allows you to build your own custom image-serving endpoint for Pixstore.

It returns an image payload encoded in Pixstore's wire format (`Uint8Array`), which is directly consumable by the frontend.

If the image does not exist or another error occurs, this function returns null. Always check the result before sending a response.

If the default endpoint is enabled, this function throws an error to prevent accidental dual-endpoint usage.

---

### Description

```ts
export const customEndpointHelper = (
  id: string
): Promise<Uint8Array | null>
```

---

### Parameters

| Name | Type     | Description                              |
| ---- | -------- | ---------------------------------------- |
| `id` | `string` | The ID of the image to retrieve and send |

---

### Example

```ts
// Get encrypted wire-format image buffer
const payload = await customEndpointHelper(imageId)
if (!payload) {
  // Handle missing image or other error
  return res.status(404).json({ error: 'Image not found' })
}
res.send(payload)
```

---

### How it works?

<HowItWorksWarning />

```ts
export const customEndpointHelper = async (
  id: string,
): Promise<Uint8Array | null> => {
  return handleErrorAsync(async () => {
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
  })
}
```

---

📄 Source: [`src/backend/custom-endpoint.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/custom-endpoint.ts)
