# Tiny Tool Town 🏘️

A delightful showcase for **free, fun & open source tiny tools**.

> *"Vibe coding is the GeoCities of the AI era."*

## What is this?

Tiny Tool Town is a community-driven directory of small, delightful, open-source tools. The kind of tools that are stupid and delightful — made for an audience of one, built over a weekend, and probably wouldn't cost more than a buck or two.

**🌐 Visit: [tinytooltown.com](https://tinytooltown.com)**

## Submit Your Tool

### Option 1: GitHub Issue (Easy)
1. [Open a new issue](https://github.com/shanselman/TinyToolTown/issues/new?template=submit-tool.yml)
2. Fill out the form
3. A maintainer will label it `approved`
4. A PR is auto-created and merged — your tool appears on the site! ✨

### Option 2: Pull Request
1. Fork this repo
2. Create `src/content/tools/your-tool-name.md`
3. Use the template below
4. Submit a PR

### Tool Template

```markdown
---
name: "Your Tool Name"
tagline: "A one-line description"
author: "Your Name"
author_github: "your-username"
github_url: "https://github.com/you/your-tool"
website_url: "https://optional-demo.com"
tags: ["cli", "fun", "tiny"]
language: "Python"
license: "MIT"
date_added: "2026-02-09"
featured: false
---

A few sentences about your tool. What does it do?
Why did you build it? Why is it delightful?
```

## What makes a good Tiny Tool?

- ✅ **Free & open source** — Source code on GitHub
- ✅ **Tiny & focused** — Does one thing well
- ✅ **Delightful** — Makes you smile
- ✅ **Made with love** — Built because you wanted it to exist
- ❌ Not enterprise SaaS or paid software
- ❌ Not abandoned or broken

## Tech Stack

- [Astro](https://astro.build) — Static site generator
- [GitHub Pages](https://pages.github.com) — Hosting
- [GitHub Actions](https://github.com/features/actions) — CI/CD + auto tool submission
- Optional [Supabase](https://supabase.com) for GitHub-authenticated favorites sync

## Development

```bash
npm install
npm run dev      # Start dev server
npm run build    # Build for production
npm run preview  # Preview production build
```

### Optional: GitHub Auth + Synced Favorites (Supabase)

Create a local environment file from `.env.example` and set:

```bash
PUBLIC_SUPABASE_URL=...
PUBLIC_SUPABASE_ANON_KEY=...
```

Configure Supabase Auth redirect URLs:

- `http://localhost:4321/auth/callback/`
- `https://tinytooltown.com/auth/callback/`

Recommended `favorites` table schema:

```sql
create table if not exists public.favorites (
	id uuid primary key default gen_random_uuid(),
	user_id uuid not null references auth.users(id) on delete cascade,
	tool_slug text not null,
	created_at timestamptz not null default now(),
	unique (user_id, tool_slug)
);

alter table public.favorites enable row level security;

create policy "read own favorites"
on public.favorites
for select
using (auth.uid() = user_id);

create policy "insert own favorites"
on public.favorites
for insert
with check (auth.uid() = user_id);

create policy "delete own favorites"
on public.favorites
for delete
using (auth.uid() = user_id);
```

## AI Summary Generator

A .NET 10 CLI tool in `tools/TinyToolSummarizer/` that uses the [GitHub Copilot SDK](https://github.com/jamesmontemagno/hello-copilot-sdk-dotnet) to auto-generate fun AI summaries and key features for every tool in the directory.

### Prerequisites

- .NET SDK supporting `net10.0`
- [Copilot CLI](https://docs.github.com/en/copilot/using-github-copilot/using-github-copilot-in-the-command-line) installed and authenticated (or `GH_TOKEN` env var with Copilot Requests permission)
- `GH_TOKEN` is also recommended for higher GitHub API rate limits when fetching READMEs

### Usage

```bash
cd tools/TinyToolSummarizer
dotnet run
```

**Interactive mode** gives you three options:
1. Only process tools without AI summaries (default)
2. Re-run on ALL tools (overwrite existing)
3. Pick a specific tool

**Headless mode** for CI/automation:

```bash
dotnet run -- --headless              # New tools only
dotnet run -- --headless --all        # Re-generate all
dotnet run -- --headless --tool name  # Specific tool (without .md)
```

The tool fetches each tool's GitHub README, sends it to Copilot, and writes `ai_summary` and `ai_features` into the markdown frontmatter. The website renders these automatically on each tool's detail page.

## License

MIT — Made with ✨ vibes ✨ by [Scott Hanselman](https://hanselman.com)
