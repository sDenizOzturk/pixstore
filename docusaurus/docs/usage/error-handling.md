---
id: error-handling
title: Error Handling
sidebar_position: 8
---

Pixstore allows you to configure how errors are handled during all API operations (both frontend and backend).  
This is controlled by the [`errorHandlingMode`](//docs/api-reference/types#errorhandlingmode) option passed to
[`initPixstoreFrontend`](/docs/api-reference/frontend/initialization) or
[`initPixstoreBackend`](/docs/api-reference/backend/initialization).

## Available Modes

| Mode     | Description                                                                                                                   | What you should do                                                                                |
| -------- | ----------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------- |
| `throw`  | Always throws exceptions.                                                                                                     | Use `try/catch`.                                                                                  |
| `hybrid` | Logs expected errors (e.g. image not found), returns `null`. Throws on unexpected internal errors. (default)                  | Optionally use [`getLastPixstoreError()`](/docs/api-reference/shared-module#getlastpixstoreerror) |
| `warn`   | Logs all errors, always returns `null`.                                                                                       | Useful for debugging silently.                                                                    |
| `silent` | Ignores all errors silently, always returns `null`.                                                                           | Use in production fallback flows.                                                                 |
| `custom` | Forwards all errors to your handler via [`setCustomErrorHandler()`](/docs/api-reference/shared-module#setcustomerrorhandler). | You **must** define a handler.                                                                    |

---

## Example 1: `throw` mode with try/catch

This is the most strict mode. Pixstore will throw errors immediately.
You must use `try/catch` to handle failures.

```ts
initPixstoreFrontend({
  errorHandlingMode: 'throw',
})

try {
  const blob = await getImage(imageRecord)
  // Use the image
} catch (error) {
  console.error('Image fetch failed:', error)
}
```

---

## Example 2: `hybrid` mode with getLastPixstoreError()

This is the **default** mode. Expected errors return `null`, but you can inspect the cause using [`getLastPixstoreError()`](/docs/api-reference/shared-module#getlastpixstoreerror).

```ts
initPixstoreFrontend({
  errorHandlingMode: 'hybrid',
})

const blob = await getImage(imageRecord)

if (!blob) {
  const err = getLastPixstoreError()
  console.warn('Could not load image:', err?.message)
}
```

---

## Example 3: `custom` mode with a custom handler

In `custom` mode, Pixstore calls your error handler for every error.
You have full control, but you **must** register a handler via [`setCustomErrorHandler()`](/docs/api-reference/shared-module#setcustomerrorhandler).

```ts
initPixstoreFrontend({
  errorHandlingMode: 'custom',
})

setCustomErrorHandler((err) => {
  if (err.name === 'PixstoreError') {
    console.warn('Handled expected error:', err.message)
  } else {
    throw err // Or forward to monitoring tools
  }
})
```

---

> For most applications, the default `'hybrid'` mode is a good balance between usability and debuggability.
