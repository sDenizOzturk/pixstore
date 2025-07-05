---
id: contributing
title: Contributing Guide
sidebar_position: 6
---

# Contributing to Pixstore

Thank you for considering a contribution to **Pixstore**! I welcome bug reports, documentation improvements, examples, and new features.

---

## 1. Repository Structure

```
pixstore/
├─ src/
│ ├─ backend/ Node.js backend logic (encryption, endpoints, DB)
│ ├─ frontend/ Browser cache, IndexedDB, fetcher, decryption
│ ├─ shared/ Utilities shared by both sides (errors, wire-encoder…)
│ └─ types/ Common TypeScript definitions
├─ examples/ Two full-stack demos (Vue+Nest, React+Express)
├─ tests/ Jest unit & integration tests
├─ docusaurus/ Documentation site source
├─ package.json Core scripts & dependencies
└─ README.md Project overview & quick start
```

---

## 2. Getting Started

1. Fork the repo on GitHub and clone your fork:

   ```bash
   git clone https://github.com/<your-username>/pixstore.git
   cd pixstore
   ```

2. Create a feature branch off `main`:

   ```bash
   git checkout -b feature/your-feature-name
   ```

---

## 3. Install & Build

- Install dependencies:

  ```bash
  npm install
  ```

- Build the library:

  ```bash
  npm run build
  ```

---

## 4. Testing

Pixstore uses **Jest** for tests under `tests/`.

- Run all tests:

  ```bash
  npm test
  ```

- Run a specific test file:

  ```bash
  npx jest tests/path/to/file.test.ts
  ```

- In watch mode:

  ```bash
  npx jest --watch
  ```

Ensure new code is covered by tests where appropriate.

After building the library, Pixstore includes a **post-build test step** to ensure all public exports are correctly exposed.

Run this check manually:

```bash
npm run build
npm run test:build
```

This internally checks:

- `tests/post-build/check-backend-exports.mjs` for `pixstore/backend`
- `tests/post-build/check-frontend-exports.mjs` for `pixstore/frontend`
- `tests/post-build/check-shared-exports.mjs` for main exports

If you add, remove or rename exports in the core module entry files (like `src/backend/index.ts`, `src/frontend/index.ts`, or `src/index.ts`), make sure to update these check files too.
Otherwise, the CI will fail even if everything compiles and tests pass.

---

## 5. Linting & Formatting

Maintain code quality:

```bash
npm run lint
npm run format
```

---

## 6. Running Examples

### Example 1: Vue + NestJS + Default Endpoint

```bash
cd examples/example-1-nest-vue-default-endpoint
npm install
npm run dev
```

- Backend: [http://localhost:3000/graphql](http://localhost:3000/graphql)
- Frontend: [http://localhost:5173](http://localhost:5173)

### Example 2: React + Express + Custom Endpoint

```bash
cd examples/example-2-express-react-custom-endpoint
npm install
npm start
```

- Backend: [http://localhost:3000/](http://localhost:3000/)
- Frontend: [http://localhost:5173](http://localhost:5173)

---

## 7. Documentation

Docs live in the `docusaurus/` folder:

```bash
cd docusaurus
npm install
npm run start
```

Visit [http://localhost:3000](http://localhost:3000) to preview. Edit or add `.md` files under `docusaurus/docs/`.

---

## 8. Submitting a Pull Request

1. Commit your changes using Conventional Commits (e.g. `feat: ...`, `fix: ...`).
2. Push your branch and open a PR against `sDenizOzturk/pixstore:main`.
3. In the PR description, explain:

   - What problem you’re solving
   - How to reproduce
   - Tests or docs you updated

---

## 9. Reporting Issues

If you find a bug or have a feature request, open an [issue](https://github.com/sDenizOzturk/pixstore/issues) with:

- A clear title
- Steps to reproduce
- Version information

---

## 10. Code of Conduct

Please be respectful and constructive. Pixstore follows the [Contributor Covenant](https://www.contributor-covenant.org/) code of conduct.
