'use strict'
;(self.webpackChunkdocusaurus = self.webpackChunkdocusaurus || []).push([
  [74],
  {
    2957: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => o,
          contentTitle: () => c,
          default: () => x,
          frontMatter: () => s,
          metadata: () => r,
          toc: () => l,
        })
      const r = JSON.parse(
        '{"id":"reference/frontend/image-service","title":"Image Service","description":"This module provides high-level functions to retrieve and manage encrypted images on the frontend.","source":"@site/docs/reference/frontend/image-service.md","sourceDirName":"reference/frontend","slug":"/reference/frontend/image-service","permalink":"/pixstore/docs/reference/frontend/image-service","draft":false,"unlisted":false,"editUrl":"https://github.com/sDenizOzturk/pixstore/tree/main/docusaurus/docs/reference/frontend/image-service.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"id":"image-service","title":"Image Service","sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Initialization","permalink":"/pixstore/docs/reference/frontend/initialization"},"next":{"title":"Shared Modules","permalink":"/pixstore/docs/reference/shared"}}',
      )
      var d = t(4848),
        i = t(8453),
        a = t(3141)
      const s = {
          id: 'image-service',
          title: 'Image Service',
          sidebar_position: 2,
        },
        c = 'Image Service',
        o = {},
        l = [
          { value: '<code>getImage</code>', id: 'getimage', level: 2 },
          { value: 'Description', id: 'description', level: 3 },
          { value: 'Parameters', id: 'parameters', level: 3 },
          { value: 'Example', id: 'example', level: 3 },
          { value: 'How it works?', id: 'how-it-works', level: 3 },
          {
            value: '<code>deleteCachedImage</code>',
            id: 'deletecachedimage',
            level: 2,
          },
          { value: 'Description', id: 'description-1', level: 3 },
          { value: 'Parameters', id: 'parameters-1', level: 3 },
          { value: 'Example', id: 'example-1', level: 3 },
          { value: 'How it works?', id: 'how-it-works-1', level: 3 },
          {
            value: '<code>cachedImageExists</code>',
            id: 'cachedimageexists',
            level: 2,
          },
          { value: 'Description', id: 'description-2', level: 3 },
          { value: 'Parameters', id: 'parameters-2', level: 3 },
          { value: 'Example', id: 'example-2', level: 3 },
          { value: 'How it works?', id: 'how-it-works-2', level: 3 },
        ]
      function h(e) {
        const n = {
          a: 'a',
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          header: 'header',
          hr: 'hr',
          p: 'p',
          pre: 'pre',
          strong: 'strong',
          table: 'table',
          tbody: 'tbody',
          td: 'td',
          th: 'th',
          thead: 'thead',
          tr: 'tr',
          ...(0, i.R)(),
          ...e.components,
        }
        return (0, d.jsxs)(d.Fragment, {
          children: [
            (0, d.jsx)(n.header, {
              children: (0, d.jsx)(n.h1, {
                id: 'image-service',
                children: 'Image Service',
              }),
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children:
                'This module provides high-level functions to retrieve and manage encrypted images on the frontend.',
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children:
                'It automatically fetches the image from the backend (using either the default endpoint or a custom fetcher), decrypts it using AES-GCM, and caches the result in IndexedDB for future access.',
            }),
            '\n',
            (0, d.jsxs)(n.p, {
              children: [
                'All functions are exported from the ',
                (0, d.jsx)(n.code, { children: 'pixstore/frontend' }),
                ' entrypoint:',
              ],
            }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "import {\n  getImage,\n  deleteCachedImage,\n  cachedImageExists,\n} from 'pixstore/frontend'\n",
              }),
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children: 'Each function is described in detail below.',
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h2, {
              id: 'getimage',
              children: (0, d.jsx)(n.code, { children: 'getImage' }),
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children:
                'Retrieves and decrypts an image using token-based cache validation.',
            }),
            '\n',
            (0, d.jsxs)(n.p, {
              children: [
                'If the image is already cached in IndexedDB ',
                (0, d.jsx)(n.strong, { children: 'and' }),
                ' the token matches, it is decrypted and returned directly.\nOtherwise, the image is fetched from the backend in encrypted wire format, decoded, cached, and then decrypted before returning as a ',
                (0, d.jsx)(n.code, { children: 'Blob' }),
                '.',
              ],
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'description', children: 'Description' }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const getImage = (\n  record: ImageRecord,\n  context?: any\n): Promise<Blob | null>\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'parameters', children: 'Parameters' }),
            '\n',
            (0, d.jsxs)(n.table, {
              children: [
                (0, d.jsx)(n.thead, {
                  children: (0, d.jsxs)(n.tr, {
                    children: [
                      (0, d.jsx)(n.th, { children: 'Name' }),
                      (0, d.jsx)(n.th, { children: 'Type' }),
                      (0, d.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, d.jsxs)(n.tbody, {
                  children: [
                    (0, d.jsxs)(n.tr, {
                      children: [
                        (0, d.jsx)(n.td, {
                          children: (0, d.jsx)(n.code, { children: 'record' }),
                        }),
                        (0, d.jsx)(n.td, {
                          children: (0, d.jsx)(n.code, {
                            children: 'ImageRecord',
                          }),
                        }),
                        (0, d.jsxs)(n.td, {
                          children: [
                            'Metadata object received from backend (',
                            (0, d.jsx)(n.code, { children: 'id' }),
                            ', ',
                            (0, d.jsx)(n.code, { children: 'token' }),
                            ', and ',
                            (0, d.jsx)(n.code, { children: 'meta' }),
                            ')',
                          ],
                        }),
                      ],
                    }),
                    (0, d.jsxs)(n.tr, {
                      children: [
                        (0, d.jsx)(n.td, {
                          children: (0, d.jsx)(n.code, { children: 'context' }),
                        }),
                        (0, d.jsx)(n.td, {
                          children: (0, d.jsx)(n.code, { children: 'any?' }),
                        }),
                        (0, d.jsx)(n.td, {
                          children:
                            'Optional data passed to a custom image fetcher (if configured on frontend)',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'example', children: 'Example' }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'const blob = await getImage(imageRecord)\nif (blob) {\n  const url = URL.createObjectURL(blob)\n  // ...use in <img> or wherever\n} else {\n  // show fallback, placeholder, etc.\n}\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'how-it-works', children: 'How it works?' }),
            '\n',
            (0, d.jsx)(a.A, {}),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Retrieves image data using token-based cache validation.\n * Returns the cached Blob if token matches; otherwise fetches, updates, and returns new Blob.\n */\nexport const getImage = async (\n  record: ImageRecord,\n  context?: unknown,\n): Promise<Blob | null> => {\n  return handleErrorAsync(async () => {\n    // Attempt to read the cached image from IndexedDB by ID\n    const { id, token, meta } = record\n    const cached = await readImageRecord(id)\n\n    // If a cached image exists and the token matches, return it immediately\n    if (cached && cached.token === token) {\n      const indexedDBRecord = await readImageRecord(id)\n      const encrypted = indexedDBRecord!.encrypted\n\n      // Decrypt the image using the extracted encrypted data and meta\n      const imagePayload = await decryptImage(encrypted, meta)\n\n      // Return the up-to-date Blob for rendering\n      return decryptedPayloadToBlob(imagePayload)\n    }\n\n    // Otherwise, fetch the latest encoded image from the backend\n    const encoded = await fetchEncodedImage(record.id, context)\n\n    // Decode the wire payload to extract encrypted data, meta, and token\n    const decodedWirePayload = decodeWirePayload(encoded)\n\n    // Prepare the IndexedDB record with fresh encrypted data and token\n    const indexedDBRecord: IndexedDBImageRecord = {\n      id,\n      encrypted: decodedWirePayload.encrypted,\n      token: decodedWirePayload.token,\n      lastUsed: Date.now(),\n    }\n\n    // Save the updated image into the local cache\n    await writeImageRecord(indexedDBRecord)\n\n    // Decrypt the image using the encrypted data and meta from the wire payload.\n    // The `record.meta` is not used, using stale meta could break decryption if the image was recently updated.\n    const imagePayload = await decryptImage(\n      decodedWirePayload.encrypted,\n      decodedWirePayload.meta,\n    )\n\n    // Return the up-to-date Blob for rendering\n    return decryptedPayloadToBlob(imagePayload)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h2, {
              id: 'deletecachedimage',
              children: (0, d.jsx)(n.code, { children: 'deleteCachedImage' }),
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children:
                'Removes an image from the local IndexedDB cache by its ID.\nUseful when you want to manually clear outdated or unused images from the frontend cache.',
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'description-1', children: 'Description' }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const deleteCachedImage = (\n  id: string\n): Promise<void | null>\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'parameters-1', children: 'Parameters' }),
            '\n',
            (0, d.jsxs)(n.table, {
              children: [
                (0, d.jsx)(n.thead, {
                  children: (0, d.jsxs)(n.tr, {
                    children: [
                      (0, d.jsx)(n.th, { children: 'Name' }),
                      (0, d.jsx)(n.th, { children: 'Type' }),
                      (0, d.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, d.jsx)(n.tbody, {
                  children: (0, d.jsxs)(n.tr, {
                    children: [
                      (0, d.jsx)(n.td, {
                        children: (0, d.jsx)(n.code, { children: 'id' }),
                      }),
                      (0, d.jsx)(n.td, {
                        children: (0, d.jsx)(n.code, { children: 'string' }),
                      }),
                      (0, d.jsx)(n.td, {
                        children: 'ID of the cached image to delete.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'example-1', children: 'Example' }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'await deleteCachedImage(imageId)\n// Optional: update UI or local state\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, {
              id: 'how-it-works-1',
              children: 'How it works?',
            }),
            '\n',
            (0, d.jsx)(a.A, {}),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Removes a cached image from IndexedDB.\n */\nexport const deleteCachedImage = async (id: string): Promise<void | null> => {\n  return handleErrorAsync(async () => {\n    // Deletes the image record (by ID) from the local IndexedDB cache\n    await deleteImageRecord(id)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h2, {
              id: 'cachedimageexists',
              children: (0, d.jsx)(n.code, { children: 'cachedImageExists' }),
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children:
                'Checks whether a cached image exists in the local IndexedDB by its ID.',
            }),
            '\n',
            (0, d.jsx)(n.p, {
              children:
                'This can be used to conditionally load or invalidate image data before making a network request.',
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'description-2', children: 'Description' }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const cachedImageExists = (\n  id: string\n): Promise<boolean | null>\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'parameters-2', children: 'Parameters' }),
            '\n',
            (0, d.jsxs)(n.table, {
              children: [
                (0, d.jsx)(n.thead, {
                  children: (0, d.jsxs)(n.tr, {
                    children: [
                      (0, d.jsx)(n.th, { children: 'Name' }),
                      (0, d.jsx)(n.th, { children: 'Type' }),
                      (0, d.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, d.jsx)(n.tbody, {
                  children: (0, d.jsxs)(n.tr, {
                    children: [
                      (0, d.jsx)(n.td, {
                        children: (0, d.jsx)(n.code, { children: 'id' }),
                      }),
                      (0, d.jsx)(n.td, {
                        children: (0, d.jsx)(n.code, { children: 'string' }),
                      }),
                      (0, d.jsx)(n.td, {
                        children: 'ID of the image to check in the cache.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, { id: 'example-2', children: 'Example' }),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "const exists = await cachedImageExists(imageId)\n\nif (exists) {\n  console.log('Image is available locally.')\n} else {\n  console.log('Image needs to be fetched.')\n}\n",
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsx)(n.h3, {
              id: 'how-it-works-2',
              children: 'How it works?',
            }),
            '\n',
            (0, d.jsx)(a.A, {}),
            '\n',
            (0, d.jsx)(n.pre, {
              children: (0, d.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Returns true if a cached image exists in IndexedDB for the given id.\n */\nexport const cachedImageExists = async (\n  id: string,\n): Promise<boolean | null> => {\n  return handleErrorAsync(async () => {\n    // Checks IndexedDB for an image record with the specified ID\n    return await imageRecordExists(id)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, d.jsx)(n.hr, {}),
            '\n',
            (0, d.jsxs)(n.p, {
              children: [
                '\ud83d\udcc4 Source: ',
                (0, d.jsx)(n.a, {
                  href: 'https://github.com/sDenizOzturk/pixstore/blob/main/src/frontend/image-service.ts',
                  children: (0, d.jsx)(n.code, {
                    children: 'src/frontend/image-service.ts',
                  }),
                }),
              ],
            }),
          ],
        })
      }
      function x(e = {}) {
        const { wrapper: n } = { ...(0, i.R)(), ...e.components }
        return n
          ? (0, d.jsx)(n, { ...e, children: (0, d.jsx)(h, { ...e }) })
          : h(e)
      }
    },
    3141: (e, n, t) => {
      t.d(n, { A: () => d })
      t(6540)
      var r = t(4848)
      const d = () =>
        (0, r.jsxs)('div', {
          style: {
            backgroundColor: '#fff4e5',
            padding: '1em',
            borderLeft: '4px solid #f5a623',
            marginBottom: '1em',
            borderRadius: '4px',
            fontSize: '0.8em',
            lineHeight: '1.4',
            color: '#333',
          },
          children: [
            (0, r.jsx)('strong', {
              children:
                '\u26a0\ufe0f This section shows internal implementation details.',
            }),
            (0, r.jsx)('br', {}),
            'It is intended for contributors or users who want to understand the inner workings of Pixstore.',
            (0, r.jsx)('br', {}),
            'Typical users do not need to modify or interact with this code directly.',
          ],
        })
    },
    8453: (e, n, t) => {
      t.d(n, { R: () => a, x: () => s })
      var r = t(6540)
      const d = {},
        i = r.createContext(d)
      function a(e) {
        const n = r.useContext(i)
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e }
          },
          [n, e],
        )
      }
      function s(e) {
        let n
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(d)
              : e.components || d
            : a(e.components)),
          r.createElement(i.Provider, { value: n }, e.children)
        )
      }
    },
  },
])
