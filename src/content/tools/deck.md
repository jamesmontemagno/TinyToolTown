---
name: "Deck"
tagline: "Terminal-based presentations from Markdown files using PowerShell"
author: "Jake Hildreth"
author_github: "jakehildreth"
github_url: "https://github.com/jakehildreth/Deck"
website_url: "https://www.powershellgallery.com/packages/Deck"
tags: ["cli", "terminal", "markdown", "presentation", "slides"]
language: "PowerShell"
license: "MIT"
date_added: "2026-02-16"
featured: false
---

Deck is a PowerShell module that turns Markdown files into interactive terminal-based presentations with figlet ASCII art, progressive bullet reveals, and rich color formatting. You write presentations in plain Markdown with optional YAML frontmatter for styling, then run `Show-Deck -Path ./presentation.md` to present directly in the terminal, no GUI required. It was built to make terminal presentations accessible and simple across platforms. What makes it delightful is the combination of familiar Markdown syntax with powerful terminal output, plus thoughtful touches like URL-based presentations (`Show-Deck -Path https://...`) for instant sharing and -Strict validation mode for testing before presenting.