---
name: "Kuato"
tagline: "Session recall for Claude Code — remember what you discussed, decided, and where you left off"
author: "Alex Hillman"
author_github: "alexknowshtml"
github_url: "https://github.com/alexknowshtml/kuato"
tags: ["cli", "ai", "claude-code", "developer-tools", "productivity"]
language: "TypeScript"
license: "MIT"
date_added: "2026-02-13"
featured: false
---

Claude Code forgets everything between sessions. You close the tab and the next day ask "where were we?" only to get a blank stare. Kuato fixes that. It's a fully local session recall skill that searches your Claude Code session history so you can pick up where you left off as easily as asking "where did we leave off on XYZ?" Named after the character from Total Recall ("A man is defined by his actions, not his memory"), Kuato gives your agent access to what you *did*. Two modes: zero-setup file-based search that works immediately, or optional PostgreSQL for sub-100ms fuzzy search on larger histories. Works with Claude Code and any coding agent that supports skills.