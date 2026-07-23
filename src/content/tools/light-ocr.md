---
name: "light-ocr"
tagline: "Fast offline OCR for Node.js and C++, with no Python runtime required."
author: "Arcships"
author_github: "arcships"
github_url: "https://github.com/arcships/light-ocr"
thumbnail: "/thumbnails/light-ocr.webp"
tags: []
language: "C++"
license: "Apache-2.0"
date_added: "2026-07-23"
featured: false
---

light-ocr does one focused job: recognize text in images locally and return the text, confidence scores, and bounding coordinates. It ships as a CLI, Node.js API, and native C++ library, uses PP-OCRv6 with ONNX Runtime, and can accelerate inference with CoreML on macOS or WebGPU on Windows. It keeps OCR data on the machine and makes the same small tool usable from scripts or native applications across macOS, Windows, and Linux.