# Supabase Setup for Favorites + GitHub Login

This app uses a hybrid favorites model:
- Signed out: favorites are stored in localStorage under `ttt-favorites`
- Signed in: favorites are stored in localStorage and synced to Supabase

## 1. Create table + constraints

Run this SQL in the Supabase SQL editor:

```sql
create table if not exists public.favorites (
  user_id uuid not null references auth.users (id) on delete cascade,
  tool_slug text not null,
  created_at timestamptz not null default now(),
  constraint favorites_pkey primary key (user_id, tool_slug)
);

create index if not exists favorites_user_id_idx
  on public.favorites (user_id);
```

## 2. Enable RLS and policies

```sql
alter table public.favorites enable row level security;

create policy "favorites_select_own"
  on public.favorites
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "favorites_insert_own"
  on public.favorites
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "favorites_delete_own"
  on public.favorites
  for delete
  to authenticated
  using (auth.uid() = user_id);
```

## 3. Configure GitHub auth provider in Supabase

1. In GitHub, create an OAuth App.
2. Use Supabase's GitHub callback URL as the app callback:
   - `https://<your-project-ref>.supabase.co/auth/v1/callback`
3. In Supabase dashboard, enable GitHub provider and paste Client ID + Secret.

## 4. Configure Supabase redirect URLs

In Supabase Auth URL configuration, add:
- `http://localhost:4321/auth/callback`
- `https://tinytooltown.com/auth/callback`

## 5. Configure public env vars

Set these in your environment:

- `PUBLIC_SUPABASE_URL`
- `PUBLIC_SUPABASE_ANON_KEY`

Example local `.env`:

```bash
PUBLIC_SUPABASE_URL=https://<your-project-ref>.supabase.co
PUBLIC_SUPABASE_ANON_KEY=<your-anon-key>
```

Only public values are needed in this static app.
Do not expose service-role keys in client code.
