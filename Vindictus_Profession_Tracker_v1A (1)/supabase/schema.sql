create extension if not exists pgcrypto;

create table if not exists public.guild_members (
  id uuid primary key default gen_random_uuid(),
  discord_user_id text unique not null,
  discord_display_name text not null,
  discord_avatar_url text,
  main_character text,
  guild_role text,
  is_in_guild boolean not null default true,
  is_visible boolean not null default true,
  last_discord_sync timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.professions (
  id text primary key,
  name text unique not null,
  icon_url text,
  max_skill integer,
  is_active boolean not null default true
);

create table if not exists public.specializations (
  id uuid primary key default gen_random_uuid(),
  profession_id text not null references public.professions(id) on delete cascade,
  parent_id uuid references public.specializations(id) on delete cascade,
  name text not null,
  unique (profession_id, name)
);

create table if not exists public.member_professions (
  id uuid primary key default gen_random_uuid(),
  member_id uuid not null references public.guild_members(id) on delete cascade,
  profession_id text not null references public.professions(id),
  character_name text,
  current_skill integer not null default 1,
  specialization_id uuid references public.specializations(id),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique(member_id, profession_id, character_name)
);

create table if not exists public.recipes (
  id uuid primary key default gen_random_uuid(),
  slug text unique not null,
  name text not null,
  profession_id text not null references public.professions(id),
  category text,
  item_id text,
  icon_url text,
  quality text,
  tooltip_data jsonb,
  required_specialization_id uuid references public.specializations(id),
  parent_recipe_id uuid references public.recipes(id),
  rank_label text,
  is_custom boolean not null default false,
  created_by uuid references public.guild_members(id),
  created_at timestamptz not null default now()
);

create table if not exists public.member_recipes (
  member_profession_id uuid not null references public.member_professions(id) on delete cascade,
  recipe_id uuid not null references public.recipes(id) on delete cascade,
  learned_at timestamptz not null default now(),
  primary key(member_profession_id, recipe_id)
);

create table if not exists public.admin_role_config (
  id integer primary key generated always as identity,
  guild_id text not null,
  guild_master_role_id text not null,
  flag_officer_role_id text not null,
  updated_at timestamptz not null default now()
);

create index if not exists idx_recipes_profession on public.recipes(profession_id);
create index if not exists idx_member_recipes_recipe on public.member_recipes(recipe_id);
