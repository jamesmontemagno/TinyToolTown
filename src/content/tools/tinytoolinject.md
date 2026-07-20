---
name: "TinyToolInject"
tagline: "Prompt-injection canary harness for AI summary pipelines"
author: "Mark Russinovich"
author_github: "markrussinovich"
github_url: "https://github.com/markrussinovich/tinytoolinject"
website_url: "https://markrussinovich.github.io/tinytoolinject/"
tags: ["security", "ai", "developer-tools", "demo", "prompt-injection"]
language: "JavaScript"
license: "MIT"
theme: "terminal"
date_added: "2026-04-26"
featured: false
ai_summary: "Meet the ultimate prompt-injection watchdog that cleverly spots AI summary hijinks and keeps your tool pipeline squeaky clean and secure—no sneaky payloads allowed here!"
ai_features: ["🛡️ Demonstrates prompt-injection vulnerabilities with real examples", "🔍 Compares vulnerable vs sentinel-based parsers to boost security", "💻 Includes a live demo and easy local setup", "🚦 Uses a unique canary string to detect injection attempts"]
---

TinyToolInject is a small static site and Node.js harness for demonstrating how README content can influence AI-generated tool summaries. It includes a harmless authorized canary string, a deterministic vulnerable parser, and a hardened sentinel-based parser so maintainers can validate the summarization pipeline safely.