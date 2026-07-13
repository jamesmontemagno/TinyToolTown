---
name: "Beautiful Image"
tagline: "Compress and optimize images with minimal quality loss in the browser or on the server"
author: "Eduar Castaño"
author_github: "devcastech"
github_url: "https://github.com/devcastech/beautiful-image"
tags: []
language: "typescript,rust"
license: "MIT"
date_added: "2026-07-13"
featured: false
---

Compress and optimize images with minimal quality loss in the browser or on the server. Powered by Rust/WASM with zero native dependencies.

- Browser uses the native Canvas API for fast GPU-accelerated decode and resize, then hands off to WASM for sharpening and JPEG encoding.
- Node.js runs the full pipeline in WASM (decode, resize, filters, encode), making it ideal for serverless environments like AWS Lambda or Google Cloud Functions with no native dependencies.