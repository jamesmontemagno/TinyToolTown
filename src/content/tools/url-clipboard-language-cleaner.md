---
name: "URL Clipboard Language Cleaner"
tagline: "A cross-platform PowerShell script that automatically removes language/locale segments from URLs copied to the clipboard, so shared links redirect recipients to their preferred language"
author: "Jack Tracey"
author_github: "jtracey93"
github_url: "https://github.com/jtracey93/UrlClipboardLanguageCleaner"
tags: ["cli", "clipboard", "productivity"]
language: "PowerShell"
license: "MIT"
theme: "None"
date_added: "2026-02-19"
featured: false
ai_summary: "Say goodbye to awkward language-specific links and hello to perfectly clean URLs that adapt to your reader’s locale automatically—this nifty script scrubs those pesky language tags right from your clipboard!"
ai_features: ["🧹 Auto-removes language/locale segments from copied URLs", "🌍 Cross-platform support with minimal CPU usage", "🚀 Runs silently in background or interactively with easy install/uninstall", "⏱️ Adjustable polling interval on macOS/Linux for speedy clipboard checks"]
---

A cross-platform PowerShell script that automatically removes language/locale segments from URLs when you copy them to the clipboard.

When you copy a URL like https://learn.microsoft.com/en-gb/azure/virtual-machines/overview, the script instantly cleans it to https://learn.microsoft.com/azure/virtual-machines/overview — so when you share the link, recipients are redirected to their own preferred language by the server.