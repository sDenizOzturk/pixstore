---
id: introduction
title: Introduction
sidebar_position: 1
---

<p align="center">
  <img src="/pixstore/img/logo_w_text.png" width="400" />
</p>
<p align="center"><em>TypeScript Full Stack Image Storage & Caching Library</em></p>
# Introduction

**Pixstore** is a modern, high-performance, and fully secure image storage and caching library for both Node.js backends and browser frontends. It is written in **vanilla TypeScript** with zero external frameworks or heavy dependencies.

Pixstore enables **end-to-end encrypted**, reliable, and scalable image serving for any web app, from simple JavaScript projects to full-stack production systems.

## Key Features

- **Automatic browser caching:** Transparent IndexedDB cache with token-based invalidation and eviction.
- **End-to-end encryption:** All images are AES-GCM encrypted, with a unique key per image. Keys never leave the backend by default.
- **Minimal wire protocol:** Efficient, protocol-agnostic binary wire format for image transfer.
- **Stateless secure endpoints:** All access is protected by a stateless, time-based proof and per-image tokens. Default endpoint is now secure-by-default.
- **High performance backend:** Uses SQLite for fast, reliable metadata storage and cache.
- **Production-ready:** Includes comprehensive tests and example apps (Vue+Nest, React+Express).
- **Fully extensible:** Supports custom endpoints and image fetchers for advanced integrations.
- **Minimal dependencies:** Lightweight and easy to audit.
- **TypeScript native:** Full typesafety and strict API design.
- **Universal API:** The same methods and types for both frontend and backend.

---

## Why Pixstore?

- **Unified image solution:** One library for both backend image storage and frontend caching.
- **Serious security:** Images are always encrypted at rest and in transit; only the intended client can decrypt.
- **True stateless access:** No sessions, cookies, or opaque tokens. All access is cryptographically verifiable.
- **Flexible integration:** Use with any framework or tech stack. Example projects provided.
- **Minimal friction:** Start serving and caching secure images in minutes.
- **Actively maintained:** Frequent updates and new features based on real-world needs.

Pixstore is ideal for any project needing **secure, scalable, and high-performance image handling**, from indie webapps to enterprise SaaS.

---

## Compatibility

- **Node.js:** v16+ (tested on all current LTS versions)
- **Frameworks:** Compatible with React, Vue, Next.js, Express, NestJS, and more
- **Browsers:** Chrome, Firefox, Safari, Edge (latest 2 major versions)
- **Module format:** ES Modules (ESM) only
