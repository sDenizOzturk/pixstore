---
id: shared
title: Shared Modules
sidebar_position: 3
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

This page documents the shared modules used across Pixstore frontend and backend.

All exports listed here are available from the main `pixstore/shared` entrypoint:

```ts
import { setCustomErrorHandler } from 'pixstore/shared'
```

---

## `setCustomErrorHandler`

Registers a custom error handler function for all Pixstore API calls, affecting both frontend and backend modules.

When `errorHandlingMode` is set to `'custom'`, your handler will be called on every error (sync or async) thrown by Pixstore, instead of throwing or logging.

This allows you to integrate with your own logging, alerting, or error tracking systems, or to gracefully handle specific Pixstore errors.

---

### Description

```ts
export const setCustomErrorHandler = (handler: (error: unknown) => void) => void
```

---

### Parameters

| Name    | Type                       | Description                                     |
| ------- | -------------------------- | ----------------------------------------------- |
| handler | `(error: unknown) => void` | Custom error handler to call when errors occur. |

---

### Example

```ts
/**
 * Example: Write all Pixstore errors to a log file (custom logging integration)
 */
import fs from 'fs'
import { setCustomErrorHandler } from 'pixstore/shared'

// Register a global Pixstore error handler that writes every error to disk
setCustomErrorHandler((err) => {
  // Format error with timestamp and message
  const message = `[${new Date().toISOString()}] Pixstore error: ${String(err)}\n`
  // Append the error to a log file (sync for demo/demo purposes)
  fs.appendFileSync('pixstore-errors.log', message)
})
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Stores the current Pixstore custom error handler function.
 * Used when errorHandlingMode is set to 'custom'.
 */
let customErrorHandler: CustomErrorHandler | undefined

/**
 * Registers a custom error handler for Pixstore error handling.
 * Used only if errorHandlingMode is set to 'custom'.
 */
export const setCustomErrorHandler = (
  newErrorHandler: CustomErrorHandler | undefined,
) => {
  // Store the user-provided error handler for centralized error processing
  customErrorHandler = newErrorHandler
}
```

---

📄 Source: [`src/shared/handle-error.ts`](https://github.com/sDenizOzturk/pixstore/blob/main/src/shared/handle-error.ts)
