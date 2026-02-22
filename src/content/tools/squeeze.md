---
name: "Squeeze"
tagline: "Squeeze your videos into optimal bitrates"
author: "Andrea Griffiths"
author_github: "andreargiffiths11"
github_url: "https://github.com/AndreaGriffiths11/squeeze"
thumbnail: "/thumbnails/squeeze.png"
website_url: "https://andreagriffiths11.github.io/squeeze/"
tags: ["github-pages", "browser", "ffmpeg", "mp4", "webm"]
language: "JavaScript"
license: "MIT"
theme: "sunset"
date_added: "2026-02-19"
featured: false
ai_summary: "Want to shrink your videos down to the perfect file size without sacrificing quality? This clever browser tool squeezes your vids right on your machine, no uploads needed, making video compression feel like a breeze!"
ai_features: ["🍊 Set target file size for optimal bitrate", "🎥 Two-pass encoding with lanczos downscaling for crisp quality", "🖥️ In-browser compression with no data leaving your device", "📦 Supports huge files up to 2GB+ with smart zero-copy mounting"]
---

Squeeze is a browser-based video compressor. You set a target file size (like 9MB), drop a video, and it gives you back a compressed file that fits under your limit. That's it.
                                                                                                                  
  What it does:                                                                                                   
  - Calculates the exact bitrate needed to hit your target size                                                   
  - Auto-downscales resolution when the bitrate is too low for the source resolution (no point keeping 4K if you  
  only have 500kbps to work with)
  - Two-pass encoding so it spends bits wisely — more on complex scenes, less on simple ones
  - Shows real-time progress with an ETA

  Why it's delightful:
  - Zero friction — no install, no account, no upload. Drop a file, get a result.
  - Private by default — everything runs in-browser via FFmpeg WASM. Your video never leaves your machine. No sketchy "free video compressor" sites.
  - It solves a real, annoying problem — every platform has upload limits (Streamyard's 9MB, Discord's 10MB, email attachments). Instead of guessing at HandBrake settings or Googling "ffmpeg bitrate calculator," you just type the number you need.
  - It's a single HTML file — the entire app. No build step, no dependencies to install, no framework. View source and you see everything.
  - It's smart about quality — lanczos downscaling, two-pass encoding, and automatic resolution selection mean you get the best possible quality for your size budget without touching a single setting.