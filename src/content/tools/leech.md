---
name: "leech"
tagline: "Concurrent command-line download manager. Inspired from Leech macOS application!"
author: "Uğur Özyılmazel"
author_github: "vigo"
github_url: "https://github.com/vigo/leech"
tags: ["cli", "download-manager"]
language: "Go"
license: "MIT"
date_added: "2026-02-16"
featured: false
ai_summary: "Dive into speedy downloads with this command-line manager that splits files into chunks and grabs them all at once—because waiting is so last century! It’s like having a download party right in your terminal."
ai_features: ["🔥 Concurrent chunked downloads for turbocharged speed", "⚡ Supports multiple URLs via arguments or piping", "🎯 Bandwidth limiting keeps your network happy", "⏩ Resume support so interrupted downloads don’t cramp your style"]
---

## Features

- Concurrent chunked downloads (parallel byte-range fetches)
- Multiple URL support (pipe and/or arguments)
- Progress bar with real-time terminal output
- Bandwidth limiting (shared token bucket across all downloads)
- Resume support (`.part` files, continues from where it left off)
- Single-chunk fallback for servers without `Accept-Ranges`
- Structured logging with `log/slog` (debug mode via `-verbose`)