---
name: "statoo"
tagline: "`statoo` is a super simple http GET tool for checking site health"
author: "Uğur Özyılmazel"
author_github: "vigo"
github_url: "https://github.com/vigo/statoo"
thumbnail: "/thumbnails/statoo.png"
tags: ["cli", "health-check", "monitoring", "http-client"]
language: "Go"
license: "MIT"
date_added: "2026-02-14"
featured: false
ai_summary: "Need a lightning-fast way to check if your website is alive and kicking? This tiny tool makes simple HTTP GET requests with a sprinkle of gzip magic to deliver quick status updates without the fuss."
ai_features: ["🚀 Super simple HTTP GET for quick site health checks", "🧩 Supports custom request and response headers for flexible querying", "🕵️‍♂️ JSON output with optional text search inside response body", "🔐 Basic auth and skip SSL certificate checks for tricky setups"]
---

A super basic http tool that makes only `GET` request to given URL and returns
status code of the response. Well, if you are `curl` or `http` (*httpie*) user,
you can make the same kind of request and get a kind-of same response since
`statoo` is way better simple :)