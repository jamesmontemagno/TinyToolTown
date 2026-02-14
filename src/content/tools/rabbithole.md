---
name: "Rabbithole"
tagline: "A beautiful TUI for consuming and inspecting RabbitMQ messages"
author: "Emilio Palmerini"
author_github: "emiliopalmerini"
github_url: "https://github.com/emiliopalmerini/rabbithole"
tags: ["cli", "tui", "rabbitmq", "developer-tools"]
language: "GO"
license: "MIT"
date_added: "2026-02-13"
featured: false
---

*rabbithole* is a terminal UI for consuming and inspecting `RabbitMQ` messages in real time. It features a topology browser for exploring exchanges and bindings, a split-pane consumer view with vim-style navigation, dynamic protobuf decoding that auto-detects message types from routing keys, and optional SQLite persistence for saving message history across sessions. Built with Bubble Tea and designed for developers who live in the terminal.