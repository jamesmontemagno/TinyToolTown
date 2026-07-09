---
name: "CreditMeter"
tagline: "Watch your Copilot AI credits tick away like a taxi fare."
author: "Claudio Di Lorenzo"
author_github: "cdilorenzo"
github_url: "https://github.com/cdilorenzo/CreditMeter"
thumbnail: "/thumbnails/creditmeter.gif"
tags: []
language: "C#"
license: "MIT"
date_added: "2026-07-09"
featured: false
---

CreditMeter is a tiny Windows tray app that shows your GitHub Copilot AI-credit usage like a little taxi meter.

It polls GitHub locally, stores your PAT encrypted with Windows DPAPI, and shows the current month's spend and AI credits burned in a playful popup from the tray icon. I built it because agentic coding can make usage feel invisible until the bill arrives — this makes the burn visible, tiny, and a bit funny.

It has no WinForms, no WPF, no telemetry, no backend, and no dashboard ambitions: just raw Win32, .NET 9 Native AOT, a tray icon, and a meter popup.