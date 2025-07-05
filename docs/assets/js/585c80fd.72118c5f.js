'use strict'
;(self.webpackChunkdocusaurus = self.webpackChunkdocusaurus || []).push([
  [994],
  {
    2666: (e, n, i) => {
      i.r(n),
        i.d(n, {
          assets: () => l,
          contentTitle: () => c,
          default: () => m,
          frontMatter: () => d,
          metadata: () => r,
          toc: () => o,
        })
      const r = JSON.parse(
        '{"id":"reference/backend/image-service","title":"Image Service","description":"This module provides high-level functions to store, retrieve, update, and delete encrypted images on the backend.","source":"@site/docs/reference/backend/image-service.md","sourceDirName":"reference/backend","slug":"/reference/backend/image-service","permalink":"/pixstore/docs/reference/backend/image-service","draft":false,"unlisted":false,"editUrl":"https://github.com/sDenizOzturk/pixstore/tree/main/docusaurus/docs/reference/backend/image-service.md","tags":[],"version":"current","sidebarPosition":2,"frontMatter":{"id":"image-service","title":"Image Service","sidebar_position":2},"sidebar":"tutorialSidebar","previous":{"title":"Initialization","permalink":"/pixstore/docs/reference/backend/initialization"},"next":{"title":"Custom Endpoint Helper","permalink":"/pixstore/docs/reference/backend/custom-endpoint"}}',
      )
      var s = i(4848),
        a = i(8453),
        t = i(3141)
      const d = {
          id: 'image-service',
          title: 'Image Service',
          sidebar_position: 2,
        },
        c = 'Image Service',
        l = {},
        o = [
          {
            value: '<code>getImageRecord</code>',
            id: 'getimagerecord',
            level: 2,
          },
          { value: 'Description', id: 'description', level: 3 },
          { value: 'Parameters', id: 'parameters', level: 3 },
          { value: 'Example', id: 'example', level: 3 },
          { value: 'How it works?', id: 'how-it-works', level: 3 },
          { value: '<code>saveImage</code>', id: 'saveimage', level: 2 },
          { value: 'Description', id: 'description-1', level: 3 },
          { value: 'Parameters', id: 'parameters-1', level: 3 },
          { value: 'Example', id: 'example-1', level: 3 },
          { value: 'How it works?', id: 'how-it-works-1', level: 3 },
          {
            value: '<code>saveImageFromFile</code>',
            id: 'saveimagefromfile',
            level: 2,
          },
          { value: 'Description', id: 'description-2', level: 3 },
          { value: 'Parameters', id: 'parameters-2', level: 3 },
          { value: 'Example', id: 'example-2', level: 3 },
          { value: 'How it works?', id: 'how-it-works-2', level: 3 },
          { value: '<code>updateImage</code>', id: 'updateimage', level: 2 },
          { value: 'Description', id: 'description-3', level: 3 },
          { value: 'Parameters', id: 'parameters-3', level: 3 },
          { value: 'Example', id: 'example-3', level: 3 },
          { value: 'How it works?', id: 'how-it-works-3', level: 3 },
          {
            value: '<code>updateImageFromFile</code>',
            id: 'updateimagefromfile',
            level: 2,
          },
          { value: 'Description', id: 'description-4', level: 3 },
          { value: 'Parameters', id: 'parameters-4', level: 3 },
          { value: 'Example', id: 'example-4', level: 3 },
          { value: 'How it works?', id: 'how-it-works-4', level: 3 },
          { value: '<code>deleteImage</code>', id: 'deleteimage', level: 2 },
          { value: 'Description', id: 'description-5', level: 3 },
          { value: 'Parameters', id: 'parameters-5', level: 3 },
          { value: 'Example', id: 'example-5', level: 3 },
          { value: 'How it works?', id: 'how-it-works-5', level: 3 },
          { value: '<code>imageExists</code>', id: 'imageexists', level: 2 },
          { value: 'Description', id: 'description-6', level: 3 },
          { value: 'Parameters', id: 'parameters-6', level: 3 },
          { value: 'Example', id: 'example-6', level: 3 },
          { value: 'How it works?', id: 'how-it-works-6', level: 3 },
        ]
      function h(e) {
        const n = {
          a: 'a',
          br: 'br',
          code: 'code',
          h1: 'h1',
          h2: 'h2',
          h3: 'h3',
          header: 'header',
          hr: 'hr',
          p: 'p',
          pre: 'pre',
          table: 'table',
          tbody: 'tbody',
          td: 'td',
          th: 'th',
          thead: 'thead',
          tr: 'tr',
          ...(0, a.R)(),
          ...e.components,
        }
        return (0, s.jsxs)(s.Fragment, {
          children: [
            (0, s.jsx)(n.header, {
              children: (0, s.jsx)(n.h1, {
                id: 'image-service',
                children: 'Image Service',
              }),
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'This module provides high-level functions to store, retrieve, update, and delete encrypted images on the backend.',
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'It operates on binary buffers, handles AES-GCM encryption internally, and manages image metadata via SQLite.',
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'All functions are exported from the ',
                (0, s.jsx)(n.code, { children: 'pixstore/backend' }),
                ' entrypoint:',
              ],
            }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "import {\n  getImageRecord,\n  saveImage,\n  saveImageFromFile,\n  updateImage,\n  updateImageFromFile,\n  deleteImage,\n  imageExists,\n} from 'pixstore/backend'\n",
              }),
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children: 'Each function is described in detail below.',
            }),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'getimagerecord',
              children: (0, s.jsx)(n.code, { children: 'getImageRecord' }),
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'Retrieves the metadata for an image previously saved to the backend.',
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'Returns an ',
                (0, s.jsx)(n.code, { children: 'ImageRecord' }),
                " object containing the image's ",
                (0, s.jsx)(n.code, { children: 'id' }),
                ', ',
                (0, s.jsx)(n.code, { children: 'token' }),
                ', and ',
                (0, s.jsx)(n.code, { children: 'imageFormat' }),
                ', or ',
                (0, s.jsx)(n.code, { children: 'null' }),
                ' if the image does not exist in the database.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const getImageRecord = (id: string): ImageRecord | null\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsx)(n.tbody, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.td, {
                        children: (0, s.jsx)(n.code, { children: 'id' }),
                      }),
                      (0, s.jsx)(n.td, {
                        children: (0, s.jsx)(n.code, { children: 'string' }),
                      }),
                      (0, s.jsx)(n.td, {
                        children: 'The unique ID of the image.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'const imageRecord = getImageRecord(imageId)\n\nif (!imageRecord) {\n  // Image not found\n}\n\n// Send this to the frontend.\n// The Pixstore frontend needs imageRecord to fetch and decrypt the actual image.\nconst player: BasketballPlayer = {\n  ...playerRecord,\n  imageRecord,\n}\n\nres.json(player)\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'how-it-works', children: 'How it works?' }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Returns the image record (id + token) from the database\n * Returns null if not found\n */\nexport const getImageRecord = (id: string): ImageRecord | null => {\n  return handleErrorSync(() => {\n    // Reads imageRecord from database (includes id, token, and meta fields)\n    return readImageRecord(id)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'saveimage',
              children: (0, s.jsx)(n.code, { children: 'saveImage' }),
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'Creates and saves a new image using an in-memory ',
                (0, s.jsx)(n.code, { children: 'Buffer' }),
                '.',
                (0, s.jsx)(n.br, {}),
                '\n',
                'The image is encrypted using AES-GCM, written to disk, and registered in the metadata database.',
              ],
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'This function generates a unique ',
                (0, s.jsx)(n.code, { children: 'id' }),
                ' for the image, optionally namespaced by a ',
                (0, s.jsx)(n.code, { children: 'dir' }),
                '.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description-1', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const saveImage = (\n  buffer: Buffer,\n  dir?: string\n): Promise<ImageRecord | null>\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters-1', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsxs)(n.tbody, {
                  children: [
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'buffer' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'Buffer' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children:
                            'Raw binary data of the image. Will be encrypted before storage.',
                        }),
                      ],
                    }),
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'dir' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'string?' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children:
                            'Optional namespace or folder scope for the image ID.',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example-1', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "const imageRecord = await saveImage(imageBuffer, 'players')\n\nif (!imageRecord) {\n  // Image could not be saved\n}\n\n// Send this to the frontend.\n// The Pixstore frontend needs imageRecord to fetch and decrypt the actual image.\nconst player: BasketballPlayer = {\n  ...playerRecord,\n  imageRecord,\n}\n\nres.json(player)\n",
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, {
              id: 'how-it-works-1',
              children: 'How it works?',
            }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Saves an image buffer to disk and creates a corresponding database record.\n * If writing to the database fails, the saved file is deleted to maintain consistency.\n */\nexport const saveImage = async (\n  buffer: Buffer,\n  dir?: string,\n): Promise<ImageRecord | null> => {\n  return handleErrorAsync(async () => {\n    // Generate a unique ID for this image, optionally scoped by dir\n    const id = createUniqueId(dir)\n\n    // Write the encrypted image and metadata\n    return await writeImage(id, buffer, dir)\n  })\n}\n\n/**\n * Writes an image buffer to disk and updates or creates its database record.\n * If writing to the database fails, the file is deleted to maintain consistency.\n */\nconst writeImage = async (\n  id: string,\n  buffer: Buffer,\n  dir?: string,\n): Promise<ImageRecord> => {\n  // Encrypt the buffer using AES-GCM and get encryption metadata\n  const { encrypted, meta } = encryptImage(buffer)\n\n  // Save the encrypted image buffer to disk\n  await saveImageFile(id, encrypted)\n\n  try {\n    // Write image metadata (token, key, iv, tag) to the database\n    return writeImageRecord(id, meta)\n  } catch (err) {\n    // If writing metadata fails, delete the saved image to avoid inconsistency\n    deleteImageFile(id)\n    throw err\n  }\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'saveimagefromfile',
              children: (0, s.jsx)(n.code, { children: 'saveImageFromFile' }),
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'Reads an image file from disk and saves it as a new encrypted image.',
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'This is a convenience wrapper around ',
                (0, s.jsx)(n.code, { children: 'saveImage()' }),
                '. It lets you work directly with file paths instead of manually reading buffers.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description-2', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const saveImageFromFile = (\n  filePath: string,\n  dir?: string\n): Promise<ImageRecord | null>\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters-2', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsxs)(n.tbody, {
                  children: [
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, {
                            children: 'filePath',
                          }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: 'Path to the image file on disk',
                        }),
                      ],
                    }),
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'dir' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'string?' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children:
                            'Optional namespace or folder scope for the generated image ID',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example-2', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "const imageRecord = await saveImageFromFile('./assets/logo.png', 'system')\n\nif (!imageRecord) {\n  // Image could not be saved\n}\n",
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, {
              id: 'how-it-works-2',
              children: 'How it works?',
            }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Reads an image file from disk and saves it as a new image\n * This is a convenience wrapper around saveImage()\n */\nexport const saveImageFromFile = async (\n  filePath: string,\n  dir?: string,\n): Promise<ImageRecord | null> => {\n  return handleErrorAsync(async () => {\n    // Read file content into a Buffer\n    const buffer = await diskToBuffer(filePath)\n\n    // Save buffer as encrypted image\n    return await saveImage(buffer, dir)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'updateimage',
              children: (0, s.jsx)(n.code, { children: 'updateImage' }),
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'Overwrites an existing image with new binary content and refreshes the corresponding metadata.',
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'This function expects the image ID to already exist in the database. If not, returns null.',
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description-3', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const updateImage = (\n  id: string,\n  buffer: Buffer,\n): Promise<ImageRecord | null>\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters-3', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsxs)(n.tbody, {
                  children: [
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'id' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: 'The ID of the image to update',
                        }),
                      ],
                    }),
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'buffer' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'Buffer' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children:
                            'New binary content to replace the existing image',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example-3', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'const updatedImageRecord = await updateImage(playerId, newBuffer)\nif (!updatedImageRecord) {\n  // Image not found\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, {
              id: 'how-it-works-3',
              children: 'How it works?',
            }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Updates an existing image by overwriting the file and refreshing the database record\n */\nexport const updateImage = async (\n  id: string,\n  buffer: Buffer,\n): Promise<ImageRecord | null> => {\n  return handleErrorAsync(async () => {\n    // Check if image exists in the database\n    if (!imageRecordExists(id)) {\n      throw new Error(`Image not found: ${id}`)\n    }\n\n    // Overwrite image and update its metadata\n    return await writeImage(id, buffer)\n  })\n}\n\n/**\n * Writes an image buffer to disk and updates or creates its database record.\n * If writing to the database fails, the file is deleted to maintain consistency.\n */\nconst writeImage = async (\n  id: string,\n  buffer: Buffer,\n  dir?: string,\n): Promise<ImageRecord> => {\n  // Encrypt the buffer using AES-GCM and get encryption metadata\n  const { encrypted, meta } = encryptImage(buffer)\n\n  // Save the encrypted image buffer to disk\n  await saveImageFile(id, encrypted)\n\n  try {\n    // Write image metadata (token, key, iv, tag) to the database\n    return writeImageRecord(id, meta)\n  } catch (err) {\n    // If writing metadata fails, delete the saved image to avoid inconsistency\n    deleteImageFile(id)\n    throw err\n  }\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'updateimagefromfile',
              children: (0, s.jsx)(n.code, { children: 'updateImageFromFile' }),
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'Updates an existing image by reading new binary content from a file and replacing both the file and its metadata.',
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'This function requires the image ',
                (0, s.jsx)(n.code, { children: 'id' }),
                ' to already exist in the database.\nIt is a convenience wrapper around ',
                (0, s.jsx)(n.code, { children: 'updateImage()' }),
                ' and lets you work directly with file paths.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description-4', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const updateImageFromFile = (\n  id: string,\n  filePath: string\n): Promise<ImageRecord | null>\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters-4', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsxs)(n.tbody, {
                  children: [
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'id' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: 'The ID of the image to update',
                        }),
                      ],
                    }),
                    (0, s.jsxs)(n.tr, {
                      children: [
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, {
                            children: 'filePath',
                          }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: (0, s.jsx)(n.code, { children: 'string' }),
                        }),
                        (0, s.jsx)(n.td, {
                          children: 'Path to the new image file on disk',
                        }),
                      ],
                    }),
                  ],
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example-4', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "const updatedImageRecord = await updateImageFromFile(\n  imageId,\n  './images/new-logo.png',\n)\nif (!updatedImageRecord) {\n  // Image not found\n}\n",
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, {
              id: 'how-it-works-4',
              children: 'How it works?',
            }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Reads a buffer from a file and updates the image with the given ID\n * Optionally, a directory prefix can be specified\n */\nexport const updateImageFromFile = async (\n  id: string,\n  filePath: string,\n): Promise<ImageRecord | null> => {\n  return handleErrorAsync(async () => {\n    // Read file content into a Buffer\n    const buffer = await diskToBuffer(filePath)\n\n    // Overwrite existing image with new buffer\n    return await updateImage(id, buffer)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'deleteimage',
              children: (0, s.jsx)(n.code, { children: 'deleteImage' }),
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'Deletes both the encrypted image file and its metadata record for the specified image ',
                (0, s.jsx)(n.code, { children: 'id' }),
                '.',
              ],
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'Returns ',
                (0, s.jsx)(n.code, { children: 'true' }),
                ' if at least one of them was successfully deleted.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description-5', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const deleteImage = (\n  id: string\n): Promise<boolean | null>\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters-5', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsx)(n.tbody, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.td, {
                        children: (0, s.jsx)(n.code, { children: 'id' }),
                      }),
                      (0, s.jsx)(n.td, {
                        children: (0, s.jsx)(n.code, { children: 'string' }),
                      }),
                      (0, s.jsx)(n.td, {
                        children: 'The unique ID of the image.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example-5', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "const success = await deleteImage(imageId)\n\nif (success) {\n  console.log('Image deleted.')\n} else {\n  console.log('Image not found.')\n}\n",
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, {
              id: 'how-it-works-5',
              children: 'How it works?',
            }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Deletes the image file and corresponding database record for the given ID\n * Returns true if at least one of them was deleted\n */\nexport const deleteImage = (id: string): Promise<boolean | null> => {\n  return handleErrorAsync(async () => {\n    let deleted = false\n\n    // Delete the image file if it exists\n    if (await imageFileExists(id)) {\n      await deleteImageFile(id)\n      deleted = true\n    }\n\n    // Delete the metadata record if it exists\n    if (imageRecordExists(id)) {\n      deleteImageRecord(id)\n      deleted = true\n    }\n\n    return deleted\n  })\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h2, {
              id: 'imageexists',
              children: (0, s.jsx)(n.code, { children: 'imageExists' }),
            }),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                'Checks whether the image with the given ',
                (0, s.jsx)(n.code, { children: 'id' }),
                ' exists on disk or in the metadata database.',
              ],
            }),
            '\n',
            (0, s.jsx)(n.p, {
              children:
                'This can be used to verify if an image is still present in storage. Useful for debugging, logging, or conditional logic.',
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'description-6', children: 'Description' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  'export const imageExists = (\n  id: string\n): Promise<boolean | null>\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'parameters-6', children: 'Parameters' }),
            '\n',
            (0, s.jsxs)(n.table, {
              children: [
                (0, s.jsx)(n.thead, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.th, { children: 'Name' }),
                      (0, s.jsx)(n.th, { children: 'Type' }),
                      (0, s.jsx)(n.th, { children: 'Description' }),
                    ],
                  }),
                }),
                (0, s.jsx)(n.tbody, {
                  children: (0, s.jsxs)(n.tr, {
                    children: [
                      (0, s.jsx)(n.td, {
                        children: (0, s.jsx)(n.code, { children: 'id' }),
                      }),
                      (0, s.jsx)(n.td, {
                        children: (0, s.jsx)(n.code, { children: 'string' }),
                      }),
                      (0, s.jsx)(n.td, {
                        children: 'The unique ID of the image.',
                      }),
                    ],
                  }),
                }),
              ],
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, { id: 'example-6', children: 'Example' }),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  "if (await imageExists(imageId)) {\n  console.log('Image is available')\n} else {\n  console.log('Image not found')\n}\n",
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsx)(n.h3, {
              id: 'how-it-works-6',
              children: 'How it works?',
            }),
            '\n',
            (0, s.jsx)(t.A, {}),
            '\n',
            (0, s.jsx)(n.pre, {
              children: (0, s.jsx)(n.code, {
                className: 'language-ts',
                children:
                  '/**\n * Checks whether the image exists either on disk or in the database\n */\nexport const imageExists = async (id: string): Promise<boolean | null> => {\n  return handleErrorAsync(async () => {\n    // Returns true if image file or metadata record exists\n    return (await imageFileExists(id)) || imageRecordExists(id)\n  })\n}\n',
              }),
            }),
            '\n',
            (0, s.jsx)(n.hr, {}),
            '\n',
            (0, s.jsxs)(n.p, {
              children: [
                '\ud83d\udcc4 Source: ',
                (0, s.jsx)(n.a, {
                  href: 'https://github.com/sDenizOzturk/pixstore/blob/main/src/backend/image-service.ts',
                  children: (0, s.jsx)(n.code, {
                    children: 'src/backend/image-service.ts',
                  }),
                }),
              ],
            }),
          ],
        })
      }
      function m(e = {}) {
        const { wrapper: n } = { ...(0, a.R)(), ...e.components }
        return n
          ? (0, s.jsx)(n, { ...e, children: (0, s.jsx)(h, { ...e }) })
          : h(e)
      }
    },
    3141: (e, n, i) => {
      i.d(n, { A: () => s })
      i(6540)
      var r = i(4848)
      const s = () =>
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
    8453: (e, n, i) => {
      i.d(n, { R: () => t, x: () => d })
      var r = i(6540)
      const s = {},
        a = r.createContext(s)
      function t(e) {
        const n = r.useContext(a)
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
              ? e.components(s)
              : e.components || s
            : t(e.components)),
          r.createElement(a.Provider, { value: n }, e.children)
        )
      }
    },
  },
])
