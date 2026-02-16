---
name: "Sixel"
tagline: "Display images in the terminal using various protocols"
author: "Andree Renneus"
author_github: "trackd"
github_url: "https://github.com/trackd/Sixel"
thumbnail: "/thumbnails/sixel.png"
website_url: "https://github.com/trackd/Sixel"
tags: ["cli", "terminal", "sixel"]
language: "C#"
license: "MIT"
theme: "terminal"
date_added: "2026-02-16"
featured: false
---

Sixel PowerShell module

```powershell
Install-Module Sixel -Scope CurrentUser
```

  ✔️ Windows, Mac, Linux
  ✔️ PowerShell 7.4+ and Windows PowerShell 5.1
  ✔️ Autodetects supported protocol from the terminal.
  ✔️ Sixel
       - Gif support using ConvertTo-SixelGif.
   ✔️ Inline Image Protocol (iterm2, "1337")
       - Supported by VSCode, xterm2, WezTerm, and others.
   ✔️ Kitty Graphics Protocol
       - Supported by Kitty terminal and WezTerm (newer versions)
   ✔️ Block cells
       - Fallback to block cells if no image protocol is supported. 
   ✔️ Braille
       - Render images with braille characters.


```powershell
# Examples
ConvertTo-Sixel -Path .\image.png
ConvertTo-Sixel -Url https://<site>/image.png
ConvertTo-SixelGif -Url https://<site>/animated.gif
```