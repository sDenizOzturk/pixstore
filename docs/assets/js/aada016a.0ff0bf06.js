'use strict'
;(self.webpackChunkdocusaurus = self.webpackChunkdocusaurus || []).push([
  [726],
  {
    3141: (e, n, t) => {
      t.d(n, { A: () => o })
      t(6540)
      var r = t(4848)
      const o = () =>
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
    7130: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => a,
          contentTitle: () => c,
          default: () => u,
          frontMatter: () => d,
          metadata: () => r,
          toc: () => l,
        })
      const r = JSON.parse(
        '{"id":"reference/backend/custom-endpoint","title":"Custom Endpoint Helper","description":"The function on this page is exported from the pixstore/backend entrypoint:","source":"@site/docs/reference/backend/custom-endpoint.md","sourceDirName":"reference/backend","slug":"/reference/backend/custom-endpoint","permalink":"/pixstore/docs/reference/backend/custom-endpoint","draft":false,"unlisted":false,"editUrl":"https://github.com/sDenizOzturk/pixstore/tree/main/docusaurus/docs/reference/backend/custom-endpoint.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"id":"custom-endpoint","title":"Custom Endpoint Helper","sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Image Service","permalink":"/pixstore/docs/reference/backend/image-service"},"next":{"title":"Frontend Module","permalink":"/pixstore/docs/category/frontend-module"}}',
      )
      var o = t(4848),
        s = t(8453),
        i = t(3141)
      const d = {
          id: 'custom-endpoint',
          title: 'Custom Endpoint Helper',
          sidebar_position: 3,
        },
        c = void 0,
        a = {},
        l = [
          {
            value: '<code>customEndpointHelper</code>',
            id: 'customendpointhelper',
            level: 2,
          },
          { value: 'Description', id: 'description', level: 3 },
          { value: 'Parameters', id: 'parameters', level: 3 },
          { value: 'Example', id: 'example', level: 3 },
          { value: 'How it works?', id: 'how-it-works', level: 3 },
        ]
      function p(e) {
        const n = {
          a: 'a',
          code: 'code',
          h2: 'h2',
          h3: 'h3',
          hr: 'hr',
          p: 'p',
          pre: 'pre',
          table: 'table',
          tbody: 'tbody',
          td: 'td',
          th: 'th',
          thead: 'thead',
          tr: 'tr',
          ...(0, s.R)(),
          ...e.components,
        }
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsxs)(n.p, {
              children: [
                'The function on this page is exported from the ',
                (0, o.jsx)(n.code, { children: 'pixstore/backend' }),
                ' entrypoint:',
              ],
            }),
            '\n',
            (0, o.jsx)(n.pre, {
              children: (0, o.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "import { customEndpointHelper } from 'pixstore/backend'\n",
              }),
            }),
            '\n',
            (0, o.jsx)(n.h2, {
              id: 'customendpointhelper',
              children: (0, o.jsx)(n.code, {
                children: 'customEndpointHelper',
              }),
            }),
            '\n',
            (0, o.jsx)(n.p, {
              children:
                'This function allows you to build your own custom image-serving endpoint for Pixstore.',
            }),
            '\n',
            (0, o.jsxs)(n.p, {
              children: [
                "It returns an image payload encoded in Pixstore's wire format (",
                (0, o.jsx)(n.code, { children: 'Uint8Array' }),
                '), which is directly consumable by the frontend.',
              ],
            }),
            '\n',
            (0, o.jsx)(n.p, {
              children:
                'If the image does not exist or another error occurs, this function returns null. Always check the result before sending a response.',
            }),
            '\n',
            (0, o.jsx)(n.p, {
              children:
                'If the default endpoint is enabled, this function throws an error to prevent accidental dual-endpoint usage.',
            }),
            '\n',
            (0, o.jsx)(n.hr, {}),
            '\n',
            (0, o.jsx)(n.h3, { id: 'description', children: 'Description' }),
            '\n',
            (0, o.jsx)(n.pre, {
              children: (0, o.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const customEndpointHelper = (\n  id: string\n): Promise<Uint8Array | null>\n',
              }),
            }),
            '\n',
            (0, o.jsx)(n.hr, {}),
            '\n',
            (0, o.jsx)(n.h3, { id: 'parameters', children: 'Parameters' }),
            '\n',
            (0, o.jsxs)(n.table, {
              children: [
                (0, o.jsx)(n.thead, {
                  children: (0, o.jsxs)(n.tr, {
                    children: [
                      (0, o.jsx)(n.th, { children: 'Name' }),
                      (0, o.jsx)(n.th, { children: 'Type' }),
                      (0, o.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, o.jsx)(n.tbody, {
                  children: (0, o.jsxs)(n.tr, {
                    children: [
                      (0, o.jsx)(n.td, {
                        children: (0, o.jsx)(n.code, { children: 'id' }),
                      }),
                      (0, o.jsx)(n.td, {
                        children: (0, o.jsx)(n.code, { children: 'string' }),
                      }),
                      (0, o.jsx)(n.td, {
                        children: 'The ID of the image to retrieve and send',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, o.jsx)(n.hr, {}),
            '\n',
            (0, o.jsx)(n.h3, { id: 'example', children: 'Example' }),
            '\n',
            (0, o.jsx)(n.pre, {
              children: (0, o.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "// Get encrypted wire-format image buffer\nconst payload = await customEndpointHelper(imageId)\nif (!payload) {\n  // Handle missing image or other error\n  return res.status(404).json({ error: 'Image not found' })\n}\nres.send(payload)\n",
              }),
            }),
            '\n',
            (0, o.jsx)(n.hr, {}),
            '\n',
            (0, o.jsx)(n.h3, { id: 'how-it-works', children: 'How it works?' }),
            '\n',
            (0, o.jsx)(i.A, {}),
            '\n',
            (0, o.jsx)(n.pre, {
              children: (0, o.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "export const customEndpointHelper = async (\n  id: string,\n): Promise<Uint8Array | null> => {\n  return handleErrorAsync(async () => {\n    // Prevent usage if the default endpoint is active (safety guard)\n    if (isServerStarted()) {\n      throw new Error(\n        'Pixstore custom endpoint mode is not active. Please disable the default endpoint before using customEndpointHelper().',\n      )\n    }\n\n    // Fetch decrypted image and metadata as a wire payload structure\n    const wirePayload = await getWirePayload(id)\n\n    // Encode it as Uint8Array in Pixstore wire format (used by frontend to decode)\n    return encodeWirePayload(wirePayload)\n  })\n}\n",
              }),
            }),
            '\n',
            (0, o.jsx)(n.hr, {}),
            '\n',
            (0, o.jsxs)(n.p, {
              children: [
                '\ud83d\udcc4 Source: ',
                (0, o.jsx)(n.a, {
                  href: 'https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/custom-endpoint.ts',
                  children: (0, o.jsx)(n.code, {
                    children: 'src/backend/custom-endpoint.ts',
                  }),
                }),
              ],
            }),
          ],
        })
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, s.R)(), ...e.components }
        return n
          ? (0, o.jsx)(n, { ...e, children: (0, o.jsx)(p, { ...e }) })
          : p(e)
      }
    },
    8453: (e, n, t) => {
      t.d(n, { R: () => i, x: () => d })
      var r = t(6540)
      const o = {},
        s = r.createContext(o)
      function i(e) {
        const n = r.useContext(s)
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e }
          },
          [n, e],
        )
      }
      function d(e) {
        let n
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(o)
              : e.components || o
            : i(e.components)),
          r.createElement(s.Provider, { value: n }, e.children)
        )
      }
    },
  },
])
