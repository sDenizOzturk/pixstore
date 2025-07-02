'use strict'
;(self.webpackChunkdocusaurus = self.webpackChunkdocusaurus || []).push([
  [114],
  {
    949: (e, r, n) => {
      n.r(r),
        n.d(r, {
          assets: () => l,
          contentTitle: () => a,
          default: () => u,
          frontMatter: () => i,
          metadata: () => s,
          toc: () => c,
        })
      const s = JSON.parse(
        '{"id":"reference/shared","title":"Shared Modules","description":"This page documents the shared modules used across Pixstore frontend and backend.","source":"@site/docs/reference/shared.md","sourceDirName":"reference","slug":"/reference/shared","permalink":"/pixstore/docs/reference/shared","draft":false,"unlisted":false,"editUrl":"https://github.com/sDenizOzturk/pixstore/tree/main/docusaurus/docs/reference/shared.md","tags":[],"version":"current","sidebarPosition":3,"frontMatter":{"id":"shared","title":"Shared Modules","sidebar_position":3},"sidebar":"tutorialSidebar","previous":{"title":"Image Service","permalink":"/pixstore/docs/reference/frontend/image-service"},"next":{"title":"Types","permalink":"/pixstore/docs/reference/types"}}',
      )
      var o = n(4848),
        t = n(8453),
        d = n(3141)
      const i = { id: 'shared', title: 'Shared Modules', sidebar_position: 3 },
        a = void 0,
        l = {},
        c = [
          {
            value: '<code>setCustomErrorHandler</code>',
            id: 'setcustomerrorhandler',
            level: 2,
          },
          { value: 'Description', id: 'description', level: 3 },
          { value: 'Parameters', id: 'parameters', level: 3 },
          { value: 'Example', id: 'example', level: 3 },
          { value: 'How it works?', id: 'how-it-works', level: 3 },
        ]
      function h(e) {
        const r = {
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
          ...(0, t.R)(),
          ...e.components,
        }
        return (0, o.jsxs)(o.Fragment, {
          children: [
            (0, o.jsx)(r.p, {
              children:
                'This page documents the shared modules used across Pixstore frontend and backend.',
            }),
            '\n',
            (0, o.jsxs)(r.p, {
              children: [
                'All exports listed here are available from the main ',
                (0, o.jsx)(r.code, { children: 'pixstore/shared' }),
                ' entrypoint:',
              ],
            }),
            '\n',
            (0, o.jsx)(r.pre, {
              children: (0, o.jsx)(r.code, {
                className: 'language-ts',
                children:
                  "import { setCustomErrorHandler } from 'pixstore/shared'\n",
              }),
            }),
            '\n',
            (0, o.jsx)(r.hr, {}),
            '\n',
            (0, o.jsx)(r.h2, {
              id: 'setcustomerrorhandler',
              children: (0, o.jsx)(r.code, {
                children: 'setCustomErrorHandler',
              }),
            }),
            '\n',
            (0, o.jsx)(r.p, {
              children:
                'Registers a custom error handler function for all Pixstore API calls, affecting both frontend and backend modules.',
            }),
            '\n',
            (0, o.jsxs)(r.p, {
              children: [
                'When ',
                (0, o.jsx)(r.code, { children: 'errorHandlingMode' }),
                ' is set to ',
                (0, o.jsx)(r.code, { children: "'custom'" }),
                ', your handler will be called on every error (sync or async) thrown by Pixstore, instead of throwing or logging.',
              ],
            }),
            '\n',
            (0, o.jsx)(r.p, {
              children:
                'This allows you to integrate with your own logging, alerting, or error tracking systems, or to gracefully handle specific Pixstore errors.',
            }),
            '\n',
            (0, o.jsx)(r.hr, {}),
            '\n',
            (0, o.jsx)(r.h3, { id: 'description', children: 'Description' }),
            '\n',
            (0, o.jsx)(r.pre, {
              children: (0, o.jsx)(r.code, {
                className: 'language-ts',
                children:
                  'export const setCustomErrorHandler = (handler: (error: unknown) => void) => void\n',
              }),
            }),
            '\n',
            (0, o.jsx)(r.hr, {}),
            '\n',
            (0, o.jsx)(r.h3, { id: 'parameters', children: 'Parameters' }),
            '\n',
            (0, o.jsxs)(r.table, {
              children: [
                (0, o.jsx)(r.thead, {
                  children: (0, o.jsxs)(r.tr, {
                    children: [
                      (0, o.jsx)(r.th, { children: 'Name' }),
                      (0, o.jsx)(r.th, { children: 'Type' }),
                      (0, o.jsx)(r.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, o.jsx)(r.tbody, {
                  children: (0, o.jsxs)(r.tr, {
                    children: [
                      (0, o.jsx)(r.td, { children: 'handler' }),
                      (0, o.jsx)(r.td, {
                        children: (0, o.jsx)(r.code, {
                          children: '(error: unknown) => void',
                        }),
                      }),
                      (0, o.jsx)(r.td, {
                        children:
                          'Custom error handler to call when errors occur.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, o.jsx)(r.hr, {}),
            '\n',
            (0, o.jsx)(r.h3, { id: 'example', children: 'Example' }),
            '\n',
            (0, o.jsx)(r.pre, {
              children: (0, o.jsx)(r.code, {
                className: 'language-ts',
                children:
                  "/**\n * Example: Write all Pixstore errors to a log file (custom logging integration)\n */\nimport fs from 'fs'\nimport { setCustomErrorHandler } from 'pixstore/shared'\n\n// Register a global Pixstore error handler that writes every error to disk\nsetCustomErrorHandler((err) => {\n  // Format error with timestamp and message\n  const message = `[${new Date().toISOString()}] Pixstore error: ${String(err)}\\n`\n  // Append the error to a log file (sync for demo/demo purposes)\n  fs.appendFileSync('pixstore-errors.log', message)\n})\n",
              }),
            }),
            '\n',
            (0, o.jsx)(r.hr, {}),
            '\n',
            (0, o.jsx)(r.h3, { id: 'how-it-works', children: 'How it works?' }),
            '\n',
            (0, o.jsx)(d.A, {}),
            '\n',
            (0, o.jsx)(r.pre, {
              children: (0, o.jsx)(r.code, {
                className: 'language-ts',
                children:
                  "/**\n * Stores the current Pixstore custom error handler function.\n * Used when errorHandlingMode is set to 'custom'.\n */\nlet customErrorHandler: CustomErrorHandler | undefined\n\n/**\n * Registers a custom error handler for Pixstore error handling.\n * Used only if errorHandlingMode is set to 'custom'.\n */\nexport const setCustomErrorHandler = (\n  newErrorHandler: CustomErrorHandler | undefined,\n) => {\n  // Store the user-provided error handler for centralized error processing\n  customErrorHandler = newErrorHandler\n}\n",
              }),
            }),
            '\n',
            (0, o.jsx)(r.hr, {}),
            '\n',
            (0, o.jsxs)(r.p, {
              children: [
                '\ud83d\udcc4 Source: ',
                (0, o.jsx)(r.a, {
                  href: 'https://github.com/sDenizOzturk/pixstore/blob/main/src/shared/handle-error.js',
                  children: (0, o.jsx)(r.code, {
                    children: 'src/shared/handle-error.js',
                  }),
                }),
              ],
            }),
          ],
        })
      }
      function u(e = {}) {
        const { wrapper: r } = { ...(0, t.R)(), ...e.components }
        return r
          ? (0, o.jsx)(r, { ...e, children: (0, o.jsx)(h, { ...e }) })
          : h(e)
      }
    },
    3141: (e, r, n) => {
      n.d(r, { A: () => o })
      n(6540)
      var s = n(4848)
      const o = () =>
        (0, s.jsxs)('div', {
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
            (0, s.jsx)('strong', {
              children:
                '\u26a0\ufe0f This section shows internal implementation details.',
            }),
            (0, s.jsx)('br', {}),
            'It is intended for contributors or users who want to understand the inner workings of Pixstore.',
            (0, s.jsx)('br', {}),
            'Typical users do not need to modify or interact with this code directly.',
          ],
        })
    },
    8453: (e, r, n) => {
      n.d(r, { R: () => d, x: () => i })
      var s = n(6540)
      const o = {},
        t = s.createContext(o)
      function d(e) {
        const r = s.useContext(t)
        return s.useMemo(
          function () {
            return 'function' == typeof e ? e(r) : { ...r, ...e }
          },
          [r, e],
        )
      }
      function i(e) {
        let r
        return (
          (r = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(o)
              : e.components || o
            : d(e.components)),
          s.createElement(t.Provider, { value: r }, e.children)
        )
      }
    },
  },
])
