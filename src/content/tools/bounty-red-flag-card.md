---
name: "Bounty Red-Flag Card"
tagline: "Offline web app + CLI that flags risky software bounties before you code."
author: "WrightOps"
author_github: "zwright8"
github_url: "https://github.com/wrightops-ai/bounty-red-flag-card"
thumbnail: "/thumbnails/bounty-red-flag-card.webp"
tags: []
language: "JavaScript"
license: "MIT"
date_added: "2026-07-17"
featured: false
ai_summary: "Jumpstart your bounty hunting with a clever offline tool that flags sketchy software bounties before you write a single line of code—keeping your wallet and reputation safe without any internet fuss!"
ai_features: ["🔥 Twelve skeptical preflight checks for risky bounties", "⚡ Fully offline with no network calls or data uploads", "🎯 Available as browser app, CLI, Markdown, and print card", "🛡️ Free, open-source, and privacy-first with no tracking or external dependencies"]
---

This is the runnable resubmission invited in #674. Bounty Red-Flag Card is now a self-contained web app and zero-dependency Node.js CLI for checking one public software bounty before claiming work, writing code, spending money, or sharing access. Its 12 evidence checks produce a live `HARD_STOP`, `DEFAULT_NO_GO`, `HOLD_VERIFY`, or `CONTINUE_DUE_DILIGENCE` result; missing evidence stays unknown and counts as a flag. The web app runs entirely in the browser with no account, telemetry, storage, or network requests, and the CLI can emit deterministic text or JSON. It remains free, MIT licensed, and usable offline; the original Markdown and one-page print card are included too.