---
id: types
title: Shared Types
sidebar_position: 3
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

# Shared Types

This page documents the shared type definitions used across Pixstore frontend and backend.

All types on this page are exported from the main `pixstore` entrypoint:

```ts
import type { ImageRecord } from 'pixstore'
```

---

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

| Name    | Type                  | Description                                     |
| ------- | --------------------- | ----------------------------------------------- |
| `id`    | `string`              | Unique identifier of the image                  |
| `token` | `number`              | Used for cache validation and versioning        |
| `meta`  | `ImageDecryptionMeta` | Decryption metadata: key, IV, tag, format, etc. |

---

### How it works?

<HowItWorksWarning />

```ts
// Metadata required to decrypt an encrypted image
export interface ImageDecryptionMeta {
  key: string // Base64-encoded AES-GCM encryption key
  iv: string // Initialization vector (IV) for AES-GCM, base64-encoded
  tag: string // Authentication tag for AES-GCM, base64-encoded
}

// Reference object representing an image in Pixstore
export interface ImageRecord {
  id: string // Unique ID used to locate and identify the image
  token: number // Used for cache validation and version control
  meta: ImageDecryptionMeta // Metadata required to decrypt the image
}
```

---

📄 Source: [`src/types/image-record.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/types/image-record.ts)
