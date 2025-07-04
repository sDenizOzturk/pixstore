## [3.1.1](https://github.com/sDenizOzturk/pixstore/compare/v3.1.0...v3.1.1) (2025-07-04)


### Bug Fixes

* export getLastPixstoreError for public error tracking ([d1b974c](https://github.com/sDenizOzturk/pixstore/commit/d1b974c87b34646515a6dba7a4a59ab9281204a8))

# [3.1.0](https://github.com/sDenizOzturk/pixstore/compare/v3.0.0...v3.1.0) (2025-07-04)


### Features

* add lastPixstoreError for easier debugging and error reporting ([f7a48a3](https://github.com/sDenizOzturk/pixstore/commit/f7a48a329612a2cfec18ddd7c33fdad191ad824d)), closes [#63](https://github.com/sDenizOzturk/pixstore/issues/63)

# [3.0.0](https://github.com/sDenizOzturk/pixstore/compare/v2.1.1...v3.0.0) (2025-07-04)


### Features

* secure stateless default endpoint & wire protocol refactor (BREAKING CHANGE) ([829ec49](https://github.com/sDenizOzturk/pixstore/commit/829ec49d5b3bc9d1e7b1b6b12f2a0e8e053ba415)), closes [#62](https://github.com/sDenizOzturk/pixstore/issues/62)


### BREAKING CHANGES

* - ImageRecord and all related access flows now require `statelessProof` and updated parameter structure; previous usages are incompatible.
- Default endpoint is now secure and requires proof/token; public image fetching is no longer supported.
- Wire protocol and API contracts are incompatible with previous Pixstore versions.
- All client and backend integrations (including examples) must be updated to use the new access flow.

## [2.1.1](https://github.com/sDenizOzturk/pixstore/compare/v2.1.0...v2.1.1) (2025-07-02)


### Bug Fixes

* throw PixstoreError for invalid image files to align with centralized error handling ([8ee2dff](https://github.com/sDenizOzturk/pixstore/commit/8ee2dffba91b4e3d7a4257b98fed31028c522bf4))

# [2.1.0](https://github.com/sDenizOzturk/pixstore/compare/v2.0.2...v2.1.0) (2025-07-02)


### Features

* trigger release for centralized error handling and config changes ([6ded281](https://github.com/sDenizOzturk/pixstore/commit/6ded28183454cb44e3288f25987f21e18c34af1d))

## [2.0.2](https://github.com/sDenizOzturk/pixstore/compare/v2.0.1...v2.0.2) (2025-07-01)


### Bug Fixes

* remove unnecessary `dir` param from updateImageFromFile ([cb02c42](https://github.com/sDenizOzturk/pixstore/commit/cb02c42120245b0c252e05fcb83d6d71684a056d))

## [2.0.1](https://github.com/sDenizOzturk/pixstore/compare/v2.0.0...v2.0.1) (2025-06-30)


### Bug Fixes

* fix frontend config type ([efb373f](https://github.com/sDenizOzturk/pixstore/commit/efb373fb4db417b232e1e388ea3dbc8b73671cd2))
* separate listen/connect endpoint configs and improve validation ([03544f2](https://github.com/sDenizOzturk/pixstore/commit/03544f2d7183abee92188e34e6a7260f9d888e6a))

# [2.0.0](https://github.com/sDenizOzturk/pixstore/compare/v1.2.1...v2.0.0) (2025-06-29)


### Features

* add backend AES-GCM image encryption ([b2c04d9](https://github.com/sDenizOzturk/pixstore/commit/b2c04d941acdadeb48b292a74ac5b0e0e2546112))
* add frontend AES-GCM image decryption and Node test polyfill ([1297be7](https://github.com/sDenizOzturk/pixstore/commit/1297be7faa076877c7adb8f9eddbdefeb8cb87af))
* apply end-to-end AES-GCM image encryption and decryption across backend and frontend ([639a81f](https://github.com/sDenizOzturk/pixstore/commit/639a81fbf26f51848b9a342d9854678e5ea807dd))
* introduce AES-GCM encrypted image support across backend and frontend ([dd63e8c](https://github.com/sDenizOzturk/pixstore/commit/dd63e8c85ef5378f206914d2d1bba5a86f7bfdcc))


### BREAKING CHANGES

* replaces all raw image operations with AES-256-GCM encryption

- Implements end-to-end encryption for all image save/load operations
- Introduces per-image key, IV, and authentication tag
- Refactors backend save/load logic and wire protocol to use encrypted payloads
- Adds decryptImage() on frontend with browser-compatible AES support
- Updates examples to use encrypted records (meta.key, meta.iv, meta.tag)
- Removes deprecated types and merges payload formats
- All image operations now require encryption-aware records and logic

## [1.2.1](https://github.com/sDenizOzturk/pixstore/compare/v1.2.0...v1.2.1) (2025-06-27)


### Bug Fixes

* trigger release ([5965d40](https://github.com/sDenizOzturk/pixstore/commit/5965d403dfb81e860eec244ee54a1177151ec2c7))

# [1.2.0](https://github.com/sDenizOzturk/pixstore/compare/v1.1.1...v1.2.0) (2025-06-27)


### Bug Fixes

* bump version to 1.2.2 ([287a9af](https://github.com/sDenizOzturk/pixstore/commit/287a9af7c9f8e08855401b04ec652beb59aecc31))
* retrigger release ([1a31bca](https://github.com/sDenizOzturk/pixstore/commit/1a31bcab515a7aab24052088be19cdeaa1c64da9))
* retrigger release ([a50531a](https://github.com/sDenizOzturk/pixstore/commit/a50531aa34ae32c8db14298897ac043f6e383f86))
* strictly enforce frontend image cache limit and cleanup under parallel fetches ([bb88c8d](https://github.com/sDenizOzturk/pixstore/commit/bb88c8d19d4cd9a095e9994d914ddc69b534d6d7)), closes [#50](https://github.com/sDenizOzturk/pixstore/issues/50)


### Features

* support optional context parameter in custom image fetcher ([2e8676d](https://github.com/sDenizOzturk/pixstore/commit/2e8676dacf911179112e67837581d4eb45fa3e48)), closes [#48](https://github.com/sDenizOzturk/pixstore/issues/48)

# [1.2.0](https://github.com/sDenizOzturk/pixstore/compare/v1.1.1...v1.2.0) (2025-06-26)


### Bug Fixes

* bump version to 1.2.2 ([287a9af](https://github.com/sDenizOzturk/pixstore/commit/287a9af7c9f8e08855401b04ec652beb59aecc31))
* retrigger release ([1a31bca](https://github.com/sDenizOzturk/pixstore/commit/1a31bcab515a7aab24052088be19cdeaa1c64da9))
* retrigger release ([a50531a](https://github.com/sDenizOzturk/pixstore/commit/a50531aa34ae32c8db14298897ac043f6e383f86))


### Features

* support optional context parameter in custom image fetcher ([2e8676d](https://github.com/sDenizOzturk/pixstore/commit/2e8676dacf911179112e67837581d4eb45fa3e48)), closes [#48](https://github.com/sDenizOzturk/pixstore/issues/48)

# [1.2.0](https://github.com/sDenizOzturk/pixstore/compare/v1.1.1...v1.2.0) (2025-06-26)


### Bug Fixes

* retrigger release ([1a31bca](https://github.com/sDenizOzturk/pixstore/commit/1a31bcab515a7aab24052088be19cdeaa1c64da9))
* retrigger release ([a50531a](https://github.com/sDenizOzturk/pixstore/commit/a50531aa34ae32c8db14298897ac043f6e383f86))


### Features

* support optional context parameter in custom image fetcher ([2e8676d](https://github.com/sDenizOzturk/pixstore/commit/2e8676dacf911179112e67837581d4eb45fa3e48)), closes [#48](https://github.com/sDenizOzturk/pixstore/issues/48)

# [1.2.0](https://github.com/sDenizOzturk/pixstore/compare/v1.1.1...v1.2.0) (2025-06-26)


### Bug Fixes

* retrigger release ([a50531a](https://github.com/sDenizOzturk/pixstore/commit/a50531aa34ae32c8db14298897ac043f6e383f86))


### Features

* support optional context parameter in custom image fetcher ([2e8676d](https://github.com/sDenizOzturk/pixstore/commit/2e8676dacf911179112e67837581d4eb45fa3e48)), closes [#48](https://github.com/sDenizOzturk/pixstore/issues/48)

# [1.2.0](https://github.com/sDenizOzturk/pixstore/compare/v1.1.1...v1.2.0) (2025-06-26)


### Features

* support optional context parameter in custom image fetcher ([2e8676d](https://github.com/sDenizOzturk/pixstore/commit/2e8676dacf911179112e67837581d4eb45fa3e48)), closes [#48](https://github.com/sDenizOzturk/pixstore/issues/48)

## [1.1.1](https://github.com/sDenizOzturk/pixstore/compare/v1.1.0...v1.1.1) (2025-06-25)


### Bug Fixes

* include all folders in published package ([32e32a8](https://github.com/sDenizOzturk/pixstore/commit/32e32a8a93dbc24530bbe44f4e8acf3057254f15))

# [1.1.0](https://github.com/sDenizOzturk/pixstore/compare/v1.0.2...v1.1.0) (2025-06-25)


### Features

* switch to dist-based publishing with semantic-release ([a67fddc](https://github.com/sDenizOzturk/pixstore/commit/a67fddc74ff46c20f2b74d889eca1481bd6cad39))

# [1.1.0](https://github.com/sDenizOzturk/pixstore/compare/v1.0.2...v1.1.0) (2025-06-25)


### Features

* switch to dist-based publishing with semantic-release ([a67fddc](https://github.com/sDenizOzturk/pixstore/commit/a67fddc74ff46c20f2b74d889eca1481bd6cad39))

## [1.0.2](https://github.com/sDenizOzturk/pixstore/compare/v1.0.1...v1.0.2) (2025-06-24)


### Bug Fixes

* enable direct import via 'pixstore/backend' and 'pixstore/frontend' ([a5e14e1](https://github.com/sDenizOzturk/pixstore/commit/a5e14e129d4d2511c3b4bc7ba4090fceab284e65))

## [1.0.1](https://github.com/sDenizOzturk/pixstore/compare/v1.0.0...v1.0.1) (2025-06-24)


### Bug Fixes

* restrict npm package contents and add README ([ed2ee1f](https://github.com/sDenizOzturk/pixstore/commit/ed2ee1fe93513aeee6183ff8001e686601002977))

# 1.0.0 (2025-06-24)


### Bug Fixes

* properly initialize database in backend and tests ([3c5810b](https://github.com/sDenizOzturk/pixstore/commit/3c5810b61f8cf9c04689ce389b643cbefaee86cf))


### Features

* add CI/CD pipeline with semantic-release and export validation scripts ([1d7f0e6](https://github.com/sDenizOzturk/pixstore/commit/1d7f0e61e86dcad999d7172f21b8bebafeeb8ee8)), closes [#44](https://github.com/sDenizOzturk/pixstore/issues/44)
* add customEndpointHelper for custom backend endpoint integration ([79d5e84](https://github.com/sDenizOzturk/pixstore/commit/79d5e84fbf06e7938a86a8d86617a4d32eb3455d)), closes [#11](https://github.com/sDenizOzturk/pixstore/issues/11)
* add database module with image record CRUD operations and tests ([7d7cd34](https://github.com/sDenizOzturk/pixstore/commit/7d7cd34d12ff9fdda7c2bb9193a054f55ed490a5))
* add default fetcher module for default endpoint image retrieval ([136c4ba](https://github.com/sDenizOzturk/pixstore/commit/136c4ba7e07ddc9881a640d7f8d4ec36834bd5ab)), closes [#21](https://github.com/sDenizOzturk/pixstore/issues/21)
* add file-storage and image-validation modules with tests ([eb04e03](https://github.com/sDenizOzturk/pixstore/commit/eb04e03a8a8957cdcbbf428afd692d62dc79fe64)), closes [#1](https://github.com/sDenizOzturk/pixstore/issues/1)
* add frontend image formatter and refactor format handling ([514ed64](https://github.com/sDenizOzturk/pixstore/commit/514ed646e63d4a5a2eedbc45f1bbe5af1ff84767)), closes [#23](https://github.com/sDenizOzturk/pixstore/issues/23)
* add frontend image-service with caching and token validation ([16c6051](https://github.com/sDenizOzturk/pixstore/commit/16c60516d05ee51e588431e14005c06cf7e67616)), closes [#26](https://github.com/sDenizOzturk/pixstore/issues/26)
* add id util for unique ID generation and file path mapping with tests ([7644f6e](https://github.com/sDenizOzturk/pixstore/commit/7644f6ebed1b6cec07cb8d00d42d66938999cb5e))
* add modular image fetcher system with custom and default support ([4adf598](https://github.com/sDenizOzturk/pixstore/commit/4adf59881220d01f36e0fb0516c399badd96a9df)), closes [#22](https://github.com/sDenizOzturk/pixstore/issues/22)
* add runtime config system with validation and shared defaults ([d921584](https://github.com/sDenizOzturk/pixstore/commit/d921584f383eb010fb55299ee57bb64543e2f1e5)), closes [#7](https://github.com/sDenizOzturk/pixstore/issues/7)
* add runtime init/config system and index.ts for frontend module ([0a28ab7](https://github.com/sDenizOzturk/pixstore/commit/0a28ab77915533e03d0c23855c3cbde701796019)), closes [#34](https://github.com/sDenizOzturk/pixstore/issues/34)
* add runtime init/config system and main index.ts entrypoint ([086ff87](https://github.com/sDenizOzturk/pixstore/commit/086ff871f5fd10fc5670566d66ecaafaf728b5c3)), closes [#33](https://github.com/sDenizOzturk/pixstore/issues/33)
* add shared image encoder module and tests ([a4f7c64](https://github.com/sDenizOzturk/pixstore/commit/a4f7c6446b39ba46a90b91f3b68630cd6a38f4a9)), closes [#8](https://github.com/sDenizOzturk/pixstore/issues/8)
* add zero-dependency vanilla Node.js default endpoint ([2bc811c](https://github.com/sDenizOzturk/pixstore/commit/2bc811cf181faf6f998ee8e5fd3fe6714d487f99)), closes [#10](https://github.com/sDenizOzturk/pixstore/issues/10)
* finalize image-service module with full CRUD support ([a68681a](https://github.com/sDenizOzturk/pixstore/commit/a68681a6383f3bd8dc5c435b0a1994188cd9ac52)), closes [#4](https://github.com/sDenizOzturk/pixstore/issues/4)
* implement low-level image record CRUD in frontend using IndexedDB ([b7a23a7](https://github.com/sDenizOzturk/pixstore/commit/b7a23a786d48605c3a59981565997fb1ba89b56d)), closes [#14](https://github.com/sDenizOzturk/pixstore/issues/14)
* implement LRU cache cleanup for IndexedDB image store ([878d466](https://github.com/sDenizOzturk/pixstore/commit/878d466290f1b99c35d245375b357736db612703)), closes [#6](https://github.com/sDenizOzturk/pixstore/issues/6)
