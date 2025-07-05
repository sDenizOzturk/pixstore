'use strict'
;(self.webpackChunkdocusaurus = self.webpackChunkdocusaurus || []).push([
  [976],
  {
    2053: (e, n, i) => {
      i.r(n),
        i.d(n, {
          assets: () => l,
          contentTitle: () => a,
          default: () => h,
          frontMatter: () => o,
          metadata: () => r,
          toc: () => d,
        })
      const r = JSON.parse(
        '{"id":"introduction","title":"Introduction","description":"Pixstore is a modern, high-performance, and secure image storage & caching library for Node.js backends and browser frontends. It is built entirely with Vanilla TypeScript, with no reliance on external frameworks or heavy runtime dependencies.","source":"@site/docs/intro.md","sourceDirName":".","slug":"/introduction","permalink":"/pixstore/docs/introduction","draft":false,"unlisted":false,"editUrl":"https://github.com/sDenizOzturk/pixstore/tree/main/docusaurus/docs/intro.md","tags":[],"version":"current","sidebarPosition":1,"frontMatter":{"id":"introduction","title":"Introduction","sidebar_position":1},"sidebar":"tutorialSidebar","next":{"title":"API Reference","permalink":"/pixstore/docs/category/api-reference"}}',
      )
      var s = i(4848),
        t = i(8453)
      const o = {
          id: 'introduction',
          title: 'Introduction',
          sidebar_position: 1,
        },
        a = 'Introduction',
        l = {},
        d = [
          { value: 'Key Features', id: 'key-features', level: 2 },
          { value: 'Why Pixstore?', id: 'why-pixstore', level: 2 },
          { value: 'Compatibility', id: 'compatibility', level: 2 },
        ]
      function c(e) {
        const n = {
          h1: 'h1',
          h2: 'h2',
          header: 'header',
          hr: 'hr',
          li: 'li',
          p: 'p',
          strong: 'strong',
          ul: 'ul',
          ...(0, t.R)(),
          ...e.components,
        }
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(n.header, {
              children: (0, s.jsx)(n.h1, {
                id: 'introduction',
                children: 'Introduction',
              }),
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                (0, s.jsx)(n.strong, { children: 'Pixstore' }),
                ' is a modern, high-performance, and secure image storage & caching library for Node.js backends and browser frontends. It is built entirely with ',
                (0, s.jsx)(n.strong, { children: 'Vanilla TypeScript' }),
                ', with no reliance on external frameworks or heavy runtime dependencies.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'It enables encrypted, reliable, and scalable image serving for all modern web apps. Pixstore is designed to be minimal, predictable, and easy to integrate into any stack, from plain JavaScript apps to complex full-stack frameworks.',
            }),
            '\n',
            (0, s.jsx)(n.h2, { id: 'key-features', children: 'Key Features' }),
            '\n',
            (0, s.jsxs)(n.ul, {
              children: [
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Universal API:' }),
                    ' Use the same methods on frontend & backend',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Automatic caching' }),
                    ' in browser (IndexedDB) and backend (SQLite)',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, {
                      children: 'Efficient, scalable image serving',
                    }),
                    ' for demanding applications',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, {
                      children: 'End-to-end AES-GCM encryption',
                    }),
                    ' for maximum data security',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Per-image unique key:' }),
                    ' Each image is encrypted with a unique key',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Minimal dependencies' }),
                    ' for easy integration',
                  ],
                }),
                '\n',
                (0, s.jsx)(n.li, {
                  children: (0, s.jsx)(n.strong, {
                    children: 'Full TypeScript support',
                  }),
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Production-ready:' }),
                    ' Fully tested with E2E scenarios',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Easy extensibility:' }),
                    ' Custom endpoint/fetcher',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, { id: 'why-pixstore', children: 'Why Pixstore?' }),
            '\n',
            (0, s.jsxs)(n.ul, {
              children: [
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Unified solution:' }),
                    ' Handle both backend and frontend image storage with a single API.',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Built-in encryption:' }),
                    ' Protect your users\u2019 images at rest and in transit.',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Minimal setup:' }),
                    ' Get started with just a few lines of code.',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Future-proof:' }),
                    ' Actively maintained, with support for new features and storage backends.',
                  ],
                }),
                '\n',
              ],
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'Pixstore is ideal for projects that need secure, scalable and fast image handling, from personal projects to large-scale, production web applications.',
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'compatibility',
              children: 'Compatibility',
            }),
            '\n',
            (0, s.jsxs)(n.ul, {
              children: [
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Node.js:' }),
                    ' v16+ (tested on LTS versions)',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Frameworks:' }),
                    ' Works with React, Vue, Next.js, Express, NestJS, etc.',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Browsers:' }),
                    ' Chrome, Firefox, Safari, Edge (last 2 major versions)',
                  ],
                }),
                '\n',
                (0, s.jsxs)(n.li, {
                  children: [
                    (0, s.jsx)(n.strong, { children: 'Module format:' }),
                    ' ES Modules (ESM) only',
                  ],
                }),
                '\n',
              ],
            }),
          ],
        })
      }
      function h(e = {}) {
        const { wrapper: n } = { ...(0, t.R)(), ...e.components }
        return n
          ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(c, { ...e }) })
          : c(e)
      }
    },
    8453: (e, n, i) => {
      i.d(n, { R: () => o, x: () => a })
      var r = i(6540)
      const s = {},
        t = r.createContext(s)
      function o(e) {
        const n = r.useContext(t)
        return r.useMemo(
          function () {
            return 'function' == typeof e ? e(n) : { ...n, ...e }
          },
          [n, e],
        )
      }
      function a(e) {
        let n
        return (
          (n = e.disableParentContext
            ? 'function' == typeof e.components
              ? e.components(s)
              : e.components || s
            : o(e.components)),
          r.createElement(t.Provider, { value: n }, e.children)
        )
      }
    },
  },
])
