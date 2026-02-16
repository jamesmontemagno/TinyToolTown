---
name: "tablo"
tagline: "`tablo` is a golang data pipeline tool inspired by Nushell, where every element is data and everything flows seamlessly through pipes."
author: "Uğur Özyılmazel"
author_github: "vigo"
github_url: "https://github.com/vigo/tablo"
tags: ["cli", "text-tool", "bash-pipe"]
language: "Go"
license: "MIT"
date_added: "2026-02-16"
featured: false
---

## Usage

Use `-l` or `-line-delimiter-char` for line delimiter.

```bash
echo "${PATH}" | tablo -l ":"       # ":" as line delimiter
┌───────────────────────────────────────────────────────────────────────────────────┐
│ /opt/homebrew/opt/postgresql@16/bin                                               │
├───────────────────────────────────────────────────────────────────────────────────┤
│ /Users/vigo/.cargo/bin                                                            │
├───────────────────────────────────────────────────────────────────────────────────┤
│ /Users/vigo/.orbstack/bin                                                         │
└───────────────────────────────────────────────────────────────────────────────────┘
# output is trimmed...
```

You can disable row separation line with `-n` or `-no-separate-rows` flag:

```bash
echo "${PATH}" | tablo -l ":" -n    # ":" as line delimiter, remove row separation
┌───────────────────────────────────────────────────────────────────────────────────┐
│ /opt/homebrew/opt/postgresql@16/bin                                               │
│ /Users/vigo/.cargo/bin                                                            │
└───────────────────────────────────────────────────────────────────────────────────┘
# output is trimmed...
```

Let’s say you have a text file under `/tmp/foo`:

```bash
cat /tmp/foo | tablo
┌────────────────┐
│ this is line 1 │
├────────────────┤
│ this is line 2 │
├────────────────┤
│ this is line   │
└────────────────┘

cat /tmp/foo | tablo -n
┌────────────────┐
│ this is line 1 │
│ this is line 2 │
│ this is line   │
└────────────────┘

cat /tmp/foo | go run . -n -nb
this is line 1    
this is line 2    
this is line
```