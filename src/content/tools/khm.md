---
name: "khm"
tagline: "khm — known hosts manager. CLI for auditing SSH host trust."
author: "Andrew"
author_github: "casablanque-code"
github_url: "https://github.com/casablanque-code/khm"
tags: []
language: "C"
license: "Apache-2.0"
date_added: "2026-07-08"
featured: false
ai_summary: "Keep your SSH known_hosts tidy and trustworthy with a slick CLI that audits, compares, and verifies host keys without any heavy dependencies—perfect for security buffs who hate blind trust and love clean workflows!"
ai_features: ["🔥 Verify all hosts in one go", "⚡ Compare two known_hosts files effortlessly", "🎯 Export trusted hosts to CSV, Markdown, or HTML", "🛠️ Detect duplicates and weak algorithms automatically"]
---

A CLI tool for managing SSH known_hosts files. No libssh, no OpenSSL, no nothing — raw BSD sockets, a hand-rolled SHA-256, and a partial SSH handshake to fetch host keys directly. known_hosts is your database of trusted server identities, yet OpenSSH gives you almost no tooling to inspect, compare, audit, or maintain it. You either trust TOFU blindly, grep through a plain-text file by hand, or disable StrictHostKeyChecking in scripts and give up on verification entirely. khm treats known_hosts as what it actually is — a security asset — not a cache you can delete and rebuild without thinking.