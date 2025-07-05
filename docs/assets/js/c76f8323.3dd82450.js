'use strict'
;(self.webpackChunkdocusaurus = self.webpackChunkdocusaurus || []).push([
  [99],
  {
    3017: (e, n, t) => {
      t.r(n),
        t.d(n, {
          assets: () => a,
          contentTitle: () => c,
          default: () => u,
          frontMatter: () => d,
          metadata: () => i,
          toc: () => l,
        })
      const i = JSON.parse(
        '{"id":"reference/frontend/initialization","title":"Initialization","description":"The function on this page is exported from the pixstore/frontend entrypoint:","source":"@site/docs/reference/frontend/init.md","sourceDirName":"reference/frontend","slug":"/reference/frontend/initialization","permalink":"/pixstore/docs/reference/frontend/initialization","draft":false,"unlisted":false,"editUrl":"https://github.com/sDenizOzturk/pixstore/tree/main/docusaurus/docs/reference/frontend/init.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"initialization","title":"Initialization","sidebar_position":1},"sidebar":"tutorialSidebar","previous":{"title":"Frontend Module","permalink":"/pixstore/docs/category/frontend-module"},"next":{"title":"Image Service","permalink":"/pixstore/docs/reference/frontend/image-service"}}',
      )
      var r = t(4848),
        o = t(8453),
        s = t(3141)
      const d = {
          id: 'initialization',
          title: 'Initialization',
          sidebar_position: 1,
        },
        c = void 0,
        a = {},
        l = [
          {
            value: '<code>initPixstoreFrontend</code>',
            id: 'initpixstorefrontend',
            level: 2,
          },
          { value: 'Description', id: 'description', level: 3 },
          { value: 'Parameters', id: 'parameters', level: 3 },
          { value: 'CustomImageFetcher', id: 'customimagefetcher', level: 3 },
          { value: 'Example', id: 'example', level: 3 },
          { value: 'How it works?', id: 'how-it-works', level: 3 },
        ]
      function h(e) {
        const n = {
          a: 'a',
          admonition: 'admonition',
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
          ...(0, o.R)(),
          ...e.components,
        }
        return (0, r.jsxs)(r.Fragment, {
          children: [
            (0, r.jsxs)(n.p, {
              children: [
                'The function on this page is exported from the ',
                (0, r.jsx)(n.code, { children: 'pixstore/frontend' }),
                ' entrypoint:',
              ],
            }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "import { initPixstoreFrontend } from 'pixstore/frontend'\n",
              }),
            }),
            '\n',
            (0, r.jsx)(n.h2, {
              id: 'initpixstorefrontend',
              children: (0, r.jsx)(n.code, {
                children: 'initPixstoreFrontend',
              }),
            }),
            '\n',
            (0, r.jsx)(n.p, {
              children:
                'Initializes the Pixstore frontend module with optional configuration and an optional custom image fetcher.',
            }),
            '\n',
            (0, r.jsx)(n.p, {
              children:
                'This is the main entry point to configure the frontend image cache, database name/version, and network behavior.',
            }),
            '\n',
            (0, r.jsx)(n.hr, {}),
            '\n',
            (0, r.jsx)(n.h3, { id: 'description', children: 'Description' }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const initPixstoreFrontend = (\n  config?: Partial<PixstoreFrontendConfig>,\n  customImageFetcher?: CustomImageFetcher\n): void\n',
              }),
            }),
            '\n',
            (0, r.jsx)(n.hr, {}),
            '\n',
            (0, r.jsx)(n.h3, { id: 'parameters', children: 'Parameters' }),
            '\n',
            (0, r.jsxs)(n.table, {
              children: [
                (0, r.jsx)(n.thead, {
                  children: (0, r.jsxs)(n.tr, {
                    children: [
                      (0, r.jsx)(n.th, { children: 'Name' }),
                      (0, r.jsx)(n.th, { children: 'Type' }),
                      (0, r.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, r.jsxs)(n.tbody, {
                  children: [
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          children: (0, r.jsx)(n.code, { children: 'config' }),
                        }),
                        (0, r.jsxs)(n.td, {
                          children: [
                            (0, r.jsx)(n.code, { children: 'Partial<' }),
                            (0, r.jsx)(n.a, {
                              href: '../types#pixstorefrontendconfig',
                              children: (0, r.jsx)(n.code, {
                                children: 'PixstoreFrontendConfig',
                              }),
                            }),
                            (0, r.jsx)(n.code, { children: '>' }),
                          ],
                        }),
                        (0, r.jsx)(n.td, {
                          children:
                            'Optional overrides for internal frontend configuration.',
                        }),
                      ],
                    }),
                    (0, r.jsxs)(n.tr, {
                      children: [
                        (0, r.jsx)(n.td, {
                          children: (0, r.jsx)(n.code, {
                            children: 'customImageFetcher',
                          }),
                        }),
                        (0, r.jsx)(n.td, {
                          children: (0, r.jsx)(n.a, {
                            href: '#customimagefetcher',
                            children: (0, r.jsx)(n.code, {
                              children: 'CustomImageFetcher',
                            }),
                          }),
                        }),
                        (0, r.jsx)(n.td, {
                          children:
                            'Optional function to override how images are fetched.',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, r.jsx)(n.hr, {}),
            '\n',
            (0, r.jsx)(n.h3, {
              id: 'customimagefetcher',
              children: 'CustomImageFetcher',
            }),
            '\n',
            (0, r.jsxs)(n.p, {
              children: [
                'The optional ',
                (0, r.jsx)(n.code, { children: 'customImageFetcher' }),
                ' parameter allows you to override how images are fetched in the frontend.',
              ],
            }),
            '\n',
            (0, r.jsxs)(n.p, {
              children: [
                'By default, Pixstore sends a ',
                (0, r.jsx)(n.code, { children: 'GET' }),
                ' request to the configured default endpoint (',
                (0, r.jsx)(n.code, { children: 'defaultEndpointConnectHost' }),
                ', ',
                (0, r.jsx)(n.code, { children: 'Port' }),
                ', and ',
                (0, r.jsx)(n.code, { children: 'Route' }),
                ').',
              ],
            }),
            '\n',
            (0, r.jsx)(n.p, {
              children:
                'If you want to implement a custom download mechanism (e.g. with tokens, cookies, or alternative URLs), you can provide your own function:',
            }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'type CustomImageFetcher = (id: string) => Promise<Uint8Array>\n',
              }),
            }),
            '\n',
            (0, r.jsx)(n.p, {
              children:
                'This function will be used by Pixstore internally instead of the default fetcher.',
            }),
            '\n',
            (0, r.jsxs)(n.admonition, {
              type: 'caution',
              children: [
                (0, r.jsxs)(n.p, {
                  children: [
                    'If you provide a ',
                    (0, r.jsx)(n.code, { children: 'customImageFetcher' }),
                    ', you must also implement a custom backend endpoint using ',
                    (0, r.jsx)(n.code, { children: 'customEndpointHelper' }),
                    '.',
                  ],
                }),
                (0, r.jsx)(n.p, {
                  children:
                    'Otherwise, the default image-fetching logic is bypassed and Pixstore cannot retrieve images through the default route, even if it is enabled.',
                }),
              ],
            }),
            '\n',
            (0, r.jsx)(n.hr, {}),
            '\n',
            (0, r.jsx)(n.h3, { id: 'example', children: 'Example' }),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "// Define a custom image fetcher function\nconst customImageFetcher = async (id: string) => {\n  // Add custom authorization header\n  const jwt = getJwtFromYourAuthSystem()\n\n  // Construct your own image endpoint URL\n  const res = await fetch(`https://your-api.com/your-route/${id}`, {\n    headers: { Authorization: `Bearer ${jwt}` },\n  })\n\n  // Convert response to Uint8Array if successful\n  if (!res.ok) throw new Error('Failed to fetch image')\n  const arrayBuffer = await res.arrayBuffer()\n  return new Uint8Array(arrayBuffer)\n}\n\n// Initialize Pixstore frontend with custom fetcher and optional config overrides\ninitPixstoreFrontend(\n  {\n    frontendImageCacheLimit: 2000,\n    frontendCleanupBatch: 100,\n  },\n  customImageFetcher,\n)\n",
              }),
            }),
            '\n',
            (0, r.jsx)(n.hr, {}),
            '\n',
            (0, r.jsx)(n.h3, { id: 'how-it-works', children: 'How it works?' }),
            '\n',
            (0, r.jsx)(s.A, {}),
            '\n',
            (0, r.jsx)(n.pre, {
              children: (0, r.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Initializes the Pixstore frontend module with the given configuration.\n * Optionally, a custom image fetcher function can be provided.\n */\nexport const initPixstoreFrontend = (\n  config: Partial<PixstoreFrontendConfig> = {},\n  customImageFetcher?: CustomImageFetcher,\n) => {\n  // Validates user config (e.g. cleanupBatch must be < cacheLimit)\n  // Then applies it to the internal Pixstore state\n  initPixstore(config)\n\n  // Register optional image fetcher override\n  registerCustomImageFetcher(customImageFetcher)\n}\n',
              }),
            }),
            '\n',
            (0, r.jsx)(n.hr, {}),
            '\n',
            (0, r.jsxs)(n.p, {
              children: [
                '\ud83d\udcc4 Source: ',
                (0, r.jsx)(n.a, {
                  href: 'https://github.com/sDenizOzturk/pixstore/blob/main/src/frontend/index.ts',
                  children: (0, r.jsx)(n.code, {
                    children: 'src/frontend/index.ts',
                  }),
                }),
              ],
            }),
          ],
        })
      }
      function u(e = {}) {
        const { wrapper: n } = { ...(0, o.R)(), ...e.components }
        return n
          ? (0, r.jsx)(n, { ...e, children: (0, r.jsx)(h, { ...e }) })
          : h(e)
      }
    },
    3141: (e, n, t) => {
      t.d(n, { A: () => r })
      t(6540)
      var i = t(4848)
      const r = () =>
        (0, i.jsxs)('div', {
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
            (0, i.jsx)('strong', {
              children:
                '\u26a0\ufe0f This section shows internal implementation details.',
            }),
            (0, i.jsx)('br', {}),
            'It is intended for contributors or users who want to understand the inner workings of Pixstore.',
            (0, i.jsx)('br', {}),
            'Typical users do not need to modify or interact with this code directly.',
          ],
        })
    },
    8453: (e, n, t) => {
      t.d(n, { R: () => s, x: () => d })
      var i = t(6540)
      const r = {},
        o = i.createContext(r)
      function s(e) {
        const n = i.useContext(o)
        return i.useMemo(
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
              ? e.components(r)
              : e.components || r
            : s(e.components)),
          i.createElement(o.Provider, { value: n }, e.children)
        )
      }
    },
  },
])
