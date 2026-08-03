---
name: "NRW Events"
tagline: "A dependency-free Python event finder for Bonn and the surrounding NRW region."
author: "Johannes"
author_github: "randomsnowflake"
github_url: "https://github.com/randomsnowflake/nrw-events"
tags: []
language: "Python"
license: "MIT"
date_added: "2026-08-03"
featured: false
---

NRW Events collects publicly available event data from open-data APIs, RSS and iCalendar feeds, JSON-LD, and local event calendars, then normalizes, deduplicates, and ranks the results by proximity to Bonn, category, and source quality. I built it because the region’s event information is fragmented and smaller local happenings are easy to miss. It runs with a single command and only the Python standard library, producing both a readable Markdown report and structured JSON for reuse.