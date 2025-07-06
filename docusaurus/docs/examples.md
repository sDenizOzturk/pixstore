---
id: examples
title: Examples
sidebar_position: 5
---

# Examples

Pixstore comes with two fullstack examples to help you learn by doing.  
Each demonstrates different use cases: default image endpoint vs. custom secure access.

---

## 🧩 Example 1: Vue + NestJS + Default Endpoint

A minimal GraphQL + Vue 3 app using Pixstore's **default image endpoint**.

- Uses `getImage(record)` to fetch and cache images.
- Built-in browser cache cleanup in action (limit set to 5).
- No authentication, ideal for local testing and inspection.
- Live IndexedDB + network behavior can be observed via DevTools.

📁 Source: [`examples/vue-nest-default-endpoint`](https://github.com/sDenizOzturk/pixstore/tree/main/examples//example-1-nest-vue-default-endpoint)

---

## 🔐 Example 2: React + Express + Custom JWT Endpoint

A secure, role-based app using **custom image endpoint + fetcher**.

- JWT-based authentication and role checks (player, GM, staff).
- Uses `customEndpointHelper()` on backend and a custom `ImageFetcher` on frontend.
- Strict cache cleanup even during rapid parallel fetches.
- Demonstrates real-world image access control and integration.

📁 Source: [`examples/react-express-custom-endpoint`](https://github.com/sDenizOzturk/pixstore/tree/main/examples/example-2-express-react-custom-endpoint)

---

Each example is ready to run with `npm install && npm start`.  
Try inspecting cache behavior and secure access under different user roles.

**Enjoy learning Pixstore with real examples!**
