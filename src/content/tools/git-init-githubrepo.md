---
name: "git-init-githubrepo"
tagline: "Create git repository for GitHub style"
author: "Uğur Özyılmazel"
author_github: "vigo"
github_url: "https://github.com/vigo/git-init-githubrepo"
tags: ["cli", "git", "github"]
language: "Go"
license: "MIT"
date_added: "2026-02-16"
featured: false
ai_summary: "Kickstart your GitHub projects with a snap by auto-generating all the essential files and workflows you need to look professional and ready to rock! It’s like having a repo butler who sets up README, LICENSE, and more while you sip your coffee."
ai_features: ["📁 Auto-creates README LICENSE and GitHub-friendly configs", "⚙️ Supports customizable project styles with built-in workflows (like go)", "🔧 Includes handy options to enable or disable files like CODE_OF_CONDUCT SECURITY and FUNDING", "🚀 Easy installation via Go or Homebrew for instant setup"]
---

# GitHub Friendly Repo Creator/Initializer

Create git repository for GitHub style:

- `README.md` (as seen here!)
- `LICENSE`
- `CODE_OF_CONDUCT.md` (optional)
- `.bumpversion.toml` (optional)
- `SECURITY.md` (optional)
- `.github/CODEOWNERS` (optional)
- `.github/FUNDING.yml` (optional)
- `.github/pull_request_template.md` (optional)

According to `--project-style` (currently only `go` available)

- `.github/workflows/go-test.yml`
- `.github/workflows/go-lint.yml`
- `.github/dependabot.yml`
- `.golangci.yml`