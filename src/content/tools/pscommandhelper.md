---
name: "PSCommandHelper"
tagline: "Learn PowerShell by doing — auto-suggests PS equivalents when you type bash commands"
author: "Eric Hansen"
author_github: "ericchansen"
github_url: "https://github.com/ericchansen/PSCommandHelper"
tags: ["cli", "learning", "developer-tools"]
language: "PowerShell"
license: "MIT"
theme: "terminal"
date_added: "2026-02-24"
featured: false
ai_summary: "Struggling with bash commands in PowerShell? This nifty helper jumps in with friendly PowerShell equivalents and clear explanations so you learn by doing without missing a beat!"
ai_features: ["🔵 Catches unknown bash commands and suggests PowerShell alternatives", "🟡 Detects aliased commands with bash-style flags and offers fixes", "🟢 Supports 75+ common bash commands across file, text, system, and network operations"]
---

When you type a bash/Linux command in PowerShell 7 that doesn't exist (like `rm -rf`, `grep`, `curl`), PSCommandHelper intercepts it and shows you the PowerShell equivalent with a colorful, educational explanation.

I built it because I kept Googling "PowerShell equivalent of grep" every single time. Instead of just aliasing everything, I wanted something that helps me actually *learn* PowerShell. It hooks into PS7's CommandNotFoundAction — completely non-invasive, educational only (it shows the suggestion but doesn't auto-run anything).

75+ bash-to-PowerShell mappings covering file ops, text processing, system commands, networking, and more. Plus a `Get-CommandMapping` command to browse and search all mappings proactively.