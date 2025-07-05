---
id: shared-module
title: Shared Modules
sidebar_position: 3
---

import HowItWorksWarning from '@site/src/components/HowItWorksWarning'

This page documents the shared modules used across Pixstore frontend and backend.

All exports listed here are available from the main `pixstore/shared` entrypoint:

```ts
import { setCustomErrorHandler, getLastPixstoreError } from 'pixstore/shared'
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

/// <Inside the handleCatch>
else if (ERROR_HANDLING_MODE === 'custom') {
    if (customErrorHandler) {
      customErrorHandler(error)
      return null
    }
    // No custom handler set: this is a critical config error
    throw new Error('Custom error handler is not set')
  }
/// </ Inside the handleCatch>
```

---

## `getLastPixstoreError`

Returns the **most recent** `PixstoreError` handled by the API.
If no error has occurred, returns `null`.
Use this for debugging, advanced error reporting, or to provide more detail when a Pixstore function returns `null` or `false`.

---

### Description

```ts
export const getLastPixstoreError = (): PixstoreError | null
```

---

> **Note:**
> The `getLastPixstoreError()` function is only updated when `errorHandlingMode` is set to `'hybrid'` (the default) and when the error is an instance of `PixstoreError`.
> For all other error handling modes, or for non-Pixstore errors, this function will not be updated.

---

### Example

```ts
import { getImageRecord } from 'pixstore/backend'
import { getLastPixstoreError } from 'pixstore/shared'

const record = getImageRecord('image-123')
if (!record) {
  // Access the last error for detailed diagnostics
  const lastError = getLastPixstoreError()
  console.error('Pixstore error:', lastError)
}
```

---

### How it works?

<HowItWorksWarning />

```ts
/**
 * Returns the most recent PixstoreError handled by the API.
 * Resets only when a new error is handled.
 * For debugging, logging, and advanced error reporting.
 */
export const getLastPixstoreError = (): PixstoreError | null => {
  return _lastPixstoreError
}

/// <Inside the handleCatch>
if (ERROR_HANDLING_MODE === 'hybrid') {
  if (error instanceof PixstoreError) {
    // Set last PixstoreError
    _lastPixstoreError = error
    // Log PixstoreError as warning and return null
    console.warn(error)
    return null
  } else {
    // For all non-Pixstore errors, always throw
    throw error
  }
}
/// </ Inside the handleCatch>
```

---

📄 Source: [`src/shared/handle-error.js`](https://github.com/sDenizOzturk/pixstore/blob/main/src/shared/handle-error.js)
