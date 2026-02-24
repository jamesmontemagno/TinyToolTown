---
name: "DockScale"
tagline: "Automatically adjusts your laptop's display scaling when you plug or unplug external monitors"
author: "Rodrigo Santos"
author_github: "rodrimc"
github_url: "https://github.com/rodrimc/display-auto-scale"
thumbnail: "/thumbnails/dockscale.png"
tags: ["cli", "windows", "dpi"]
language: "Powershell"
license: "MIT"
theme: "None"
date_added: "2026-02-24"
featured: false
ai_summary: "Say goodbye to fiddling with display scaling every time you dock or undock your laptop—this nifty tool auto-magically adjusts your screen DPI instantly for a seamless multi-monitor life. It’s like having a personal scaling butler that knows exactly when to step in and save the day!"
ai_features: ["🔥 Instantly adjusts laptop scaling when external monitors connect or disconnect", "⚡ Zero CPU overhead with event-driven display change detection", "🎯 Configurable scaling presets for docked and undocked setups", "🚀 Runs silently in the background with no Explorer restart needed"]
---

If you use a laptop with external monitors, you probably want different display scaling for each setup — higher scaling when docked (to match the external monitors' density) and lower when undocked. Windows doesn't do this automatically, so you end up manually adjusting the scale every time you plug or unplug.

This tool does it for you.

- **External monitors connected** → laptop display scales to **125%** (configurable)
- **No external monitors** → laptop display scales to **100%** (configurable)