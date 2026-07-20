---
name: "Kathmandu Time"
tagline: "Shows you the date and time in Kathmandu"
author: "Kushal"
author_github: "collabskus"
github_url: "https://github.com/collabskus/collabskus.github.io/"
thumbnail: "/thumbnails/kathmandu-time.webp"
tags: []
language: "C#"
license: "AGPL-3.0"
date_added: "2026-07-06"
featured: false
ai_summary: "Get the real-time scoop on Kathmandu's date, time, and even moon phases with this sleek web app that keeps you synced to Nepal’s unique time zone and cultural calendar—perfect for time travelers and curious minds alike!"
ai_features: ["🕰️ Real-time Kathmandu clock synced via API", "📅 Bikram Sambat calendar with Gregorian cross-reference", "🌙 Astronomical moon phase calculator", "🌞 Solar position tracker with sunrise/sunset visualization"]
---

A Blazor WebAssembly (.NET 10) single-page application that displays real-time Kathmandu information: clock, Bikram Sambat calendar, moon phase, solar position, and a blog. Deployed to GitHub Pages at [collabskus.github.io](https://collabskus.github.io/). Like Scott Hanselman says in https://youtu.be/W6aOdLlEz1w?t=1150 there is no backend here, no database. I simply rely on an existing web API to tell me what the date is (because there is no reliable way to calculate a date in the Bikram Sambat). And I hope someone will look at the sunrise and sunset time and go wait a minute, that is not the actual sunrise/sunset time and now they have the curiosity to learn the difference between an astronomical sunrise/sunset vs an observed sunrise/sunset.