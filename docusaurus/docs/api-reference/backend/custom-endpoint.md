---
id: custom-endpoint
title: Custom Endpoint Helper
sidebar_position: 3
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

## `customEndpointHelper`

This function enables you to build a **secure custom image endpoint** for Pixstore.
It **validates access** (statelessProof, clientToken) and returns a binary image payload in Pixstore wire format (`Uint8Array`) for direct frontend consumption.

If the image does not exist or access is invalid, the returned payload will have an appropriate `WirePayloadState` (see protocol docs).

**If the default endpoint is enabled, this function throws an error.**

---

### Description

```ts
export const customEndpointHelper = async (
  imageId: string,
  clientToken: number,
  statelessProof: string,
): Promise<Uint8Array | null>

```

---

### Parameters

| Name             | Type                  | Description                                            |
| ---------------- | --------------------- | ------------------------------------------------------ |
| `imageId`        | `string`              | The ID of the image to fetch                           |
| `clientToken`    | `number \| undefined` | The client's current token (from ImageRecord)          |
| `statelessProof` | `string`              | Stateless proof string (from getCurrentStatelessProof) |

---

### Example (Express handler)

```ts
// Express handler for serving Pixstore images in custom endpoint mode
app.get('/image/:imageId', async (req, res) => {
  // Extract imageId from the URL path
  const imageId = req.params.imageId

  // Parse clientToken (from header or query)
  const clientToken = Number(clientTokenRaw)

  // Parse statelessProof (from header or query)
  const statelessProof = req.headers['x-pixstore-proof']
    ? String(req.headers['x-pixstore-proof'])
    : ''

  // --- CRITICAL: Pixstore security integration ---
  // Always use customEndpointHelper for image serving;
  // Never serve image files or database blobs directly!
  // This ensures protocol and security guarantees.

  // Call Pixstore to generate wire-format payload
  const payload = await customEndpointHelper(
    imageId,
    clientToken,
    statelessProof,
  )

  // Always send HTTP 200; all errors/statuses are encoded in the first byte
  res.send(payload)
})
```

> **Note:**
> Never serve raw images or DB blobs directly. Always use `customEndpointHelper` to enforce all access rules and security checks!

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Returns a Pixstore wire format encoded image payload (Uint8Array) for the given image ID.
 * Throws if the default endpoint is running, to prevent accidental dual endpoint usage.
 * Can be used in any custom endpoint handler to build a secure response.
 *
 * All security checks (stateless proof, image tag, etc.) are enforced before generating the payload.
 */
export const customEndpointHelper = async (
  imageId: string,
  clientToken: number,
  statelessProof: string,
): Promise<Uint8Array | null> => {
  return handleErrorAsync(async () => {
    // Prevent usage if the default endpoint is active (safety guard)
    if (isServerStarted()) {
      throw new PixstoreError(
        'Pixstore custom endpoint mode is not active. Please disable the default endpoint before using customEndpointHelper().',
      )
    }
    // Perform all security and wire checks
    return await endpointHelper(imageId, clientToken, statelessProof)
  })
}

/**
 * Generates an encoded Pixstore wire payload for the requested image ID.
 *
 * - Validates the provided statelessProof and clientToken before serving any image data.
 * - On any missing or invalid input, returns a payload with the appropriate WirePayloadState.
 * - If the stateless proof is valid, calls getWirePayload to return the correct payload variant
 *   (Success, Updated, NotFound).
 * - Catches any unexpected errors and returns an InternalError state.
 *
 * Always returns an encoded Uint8Array wire payload,
 * with the state as the first byte for protocol-agnostic error handling.
 */
export const endpointHelper = async (
  imageId: string | undefined,
  clientToken: number | undefined,
  statelessProof: string | undefined,
): Promise<Uint8Array> => {
  try {
    // Validate parameters
    if (!imageId)
      return encodeWirePayload({ state: WirePayloadState.MissingID })
    if (!statelessProof)
      return encodeWirePayload({ state: WirePayloadState.MissingProof })

    // Validate the stateless proof-of-access key (time-based)
    if (!verifyStatelessProof(imageId, statelessProof)) {
      return encodeWirePayload({ state: WirePayloadState.InvalidProof })
    }

    // Fetch the decrypted image and its metadata as a wire payload structure
    const wirePayload = await getWirePayload(imageId, clientToken)

    // Encode as Uint8Array in Pixstore wire format (consumed by the frontend)
    return encodeWirePayload(wirePayload)
  } catch {
    return encodeWirePayload({ state: WirePayloadState.InternalError })
  }
}
```

---

### Security & Error Handling

- If `statelessProof` or `clientToken` are invalid, the returned payload will have the correct error `WirePayloadState`.
- If an unexpected error occurs, a payload with state `InternalError` is returned.
- The function returns `null` only if a critical error is caught by `handleErrorAsync`.

---

📄 Source: [`src/backend/custom-endpoint.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/custom-endpoint.ts)
