---
name: "lsvirtualenvs"
tagline: "Due to virtualenvwrapper’s lsvirtualenv’s super slow speed and lack of information, I made this simple cli-tool with golang."
author: "Uğur Özyılmazel"
author_github: "vigo"
github_url: "https://github.com/vigo/lsvirtualenvs"
tags: ["cli", "virtualenv", "lsvirtualenv"]
language: "Go"
license: "MIT"
date_added: "2026-02-16"
featured: false
ai_summary: "Tired of waiting forever for your virtualenvwrapper to show your environments? This speedy little CLI tool zips through your virtualenvs with style and color, making your life way easier and way more fun!"
ai_features: ["🚀 Lightning-fast listing of virtual environments", "🌈 Optional colored output for easy scanning", "🔢 Add handy index numbers to your env list", "🧰 Simple CLI install via Go or Homebrew"]
---

## Usage

```bash
$ lsvirtualenvs -h

usage: lsvirtualenvs [-flags]

lists existing virtualenvs which are created via "mkvirtualenv" command.

  flags:

  -c, -color          enable colored output
  -s, -simple         just list environment names, overrides -c, -i
  -i, -index          add index number to output
      -version        display version information (X.X.X)
```

Usage examples:

```bash
$ lsvirtualenvs -h
$ lsvirtualenvs -c
$ lsvirtualenvs -color
$ lsvirtualenvs -c -i
$ lsvirtualenvs -color -index
$ lsvirtualenvs -s
$ lsvirtualenvs -simple
```

Example output:

```bash
$ lsvirtualenvs
you have 2 environments available

textmate................... 3.8.0
trash...................... 3.8.0

$ lsvirtualenvs -i
you have 2 environments available

[0001] textmate................... 3.8.0
[0002] trash...................... 3.8.0

$ lsvirtualenvs -c -i # colored output with index
```

Run tests via;

```bash
$ go test -v ./...
```