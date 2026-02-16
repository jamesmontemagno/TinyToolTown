---
name: "PX2PS"
tagline: "PX2PS is a PowerShell utility module for converting Pixquare format (.px) files into PowerShell terminal graphics."
author: "Jake Hildreth"
author_github: "jakehildreth"
github_url: "https://github.com/jakehildreth/px2ps"
thumbnail: "/thumbnails/px2ps.png"
website_url: "https://www.powershellgallery.com/packages/PX2PS _No response_"
tags: ["cli", "fun", "pixels"]
language: "PowerShell"
license: "MIT"
date_added: "2026-02-16"
featured: false
ai_summary: "Turn your pixel art into terminal magic by converting Pixquare .px files into vibrant PowerShell graphics that pop right in your console. It’s like bringing your pixels to life with a splash of color and a dash of script wizardry!"
ai_features: ["🎨 Renders .px files using ANSI True Color for stunning terminal visuals", "🧩 Supports multi-layer files with automatic compositing and transparency", "🔄 Pipeline input and ScriptBlock output for flexible rendering workflows", "🚀 Cross-platform support on Windows Linux and macOS"]
---

PX2PS reads Pixquare .px files, decompresses the zlib-encoded layer data, composites multiple layers if present, and renders the final image using Unicode lower half block characters (▄) with ANSI True Color escape sequences. Each terminal line represents two rows of pixels. It can also output a .ps1 script version of the output for easy sharing!