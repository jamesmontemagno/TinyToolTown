---
name: "OpenClaw Dashboard"
tagline: "A real-time, config-driven home network dashboard for AI agents - zero build step, 4 themes, vanilla JS + FastAPI (~500KB)"
author: "CK (Chandima Kulathilake)"
author_github: "cknzraposo"
github_url: "https://github.com/cknzraposo/openclaw-dashboard"
thumbnail: "/thumbnails/openclaw-dashboard.png"
website_url: "https://percy.raposo.ai"
tags: ["dashboard", "home-lab", "ai-agent", "smart-home", "fastapi"]
language: "Python"
license: "MIT"
theme: "terminal"
date_added: "2026-03-10"
featured: false
---

A tiny, self-hosted status dashboard that gives your AI agent (or just you) a live view of your home network - Spotify playback, Philips Hue lights, Ollama LLM servers, NAS media libraries, machine health, backups, and cron jobs. All streamed via Server-Sent Events.

Built it because my AI assistant (Percy) needed a way to see the state of everything it manages. Turns out a single-page dashboard with no npm, no React, no build step, and just Tailwind CDN + vanilla JS is surprisingly capable.

Everything is config-driven: name your agent, pick a theme (bioluminescent, midnight, terminal, minimal), enable only the panels you have. No Hue bridge? No panel. Three machines instead of two? Three tabs.

If you have an OpenClaw agent running, you can literally just say: "Set up a dashboard using this repo" and it does it.