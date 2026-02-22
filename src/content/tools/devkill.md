---
name: "DevKill"
tagline: "A Windows utility that finds and kills orphaned dev server processes hogging your ports."
author: "Andy Bochmann"
author_github: "andybochmann"
github_url: "https://github.com/andybochmann/DevKill"
thumbnail: "/thumbnails/devkill.png"
tags: ["windows", "cli"]
language: "C#"
license: "MIT"
theme: "None"
date_added: "2026-02-18"
featured: false
ai_summary: "Tired of pesky dev servers hogging your ports and slowing you down? This nifty Windows tool hunts down those orphaned processes and lets you zap them away with style and speed!"
ai_features: ["🔥 Auto-discovers listening ports using native Windows APIs", "⚡ Bulk kill multiple dev server processes at once", "🎯 Sleek dark UI with smart grouping of popular dev servers", "🛎️ CLI mode for instant port freeing without the GUI"]
---

Developers accumulate zombie dev servers — Node, .NET, Python, PHP, Vite, and others — that occupy ports and cause conflicts. DevKill auto-discovers these processes, shows them in a modern dark UI, and lets you kill them individually or in bulk.

I build it, because especially when working with AI agents that start servers in the background, they don't always shut them back down.