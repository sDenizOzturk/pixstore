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
