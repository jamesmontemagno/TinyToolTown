---
name: "zoxide-doctor"
tagline: "A zero-dependency checkup for zoxide, PATH, and shell initialization."
author: "LTD Atlas"
author_github: "jiankn"
github_url: "https://github.com/jiankn/zoxide-doctor"
thumbnail: "/thumbnails/zoxide-doctor.webp"
website_url: "https://zoxide.org/tools/zoxide-doctor/"
tags: ["cli", "developer-tools", "diagnostics", "zoxide"]
language: "JavaScript"
license: "MIT"
theme: "terminal"
date_added: "2026-08-10"
featured: false
---

zoxide-doctor is a small local CLI that explains why a zoxide setup is not working. It verifies that the binary is on PATH, checks `zoxide init` for the selected shell, looks for active initialization in common shell profiles, reports optional fzf availability, and can emit machine-readable JSON.

I built it because several different setup mistakes all surface as the same frustrating “command not found” symptom. The tool is read-only, does not modify shell configuration, has no runtime dependencies, and runs on Linux, macOS, and Windows.

This is an independent community tool, not an official zoxide project.