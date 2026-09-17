# Vindictus Profession Tracker

A dark-fantasy, mobile-friendly guild crafting directory for **Vindictus**.

## Version 1A

This first build includes:

- Public guild-wide recipe search
- Profession dashboards
- Recipe coverage counts
- Missing / single-crafter recipe tracking
- Recently Learned feed
- Player profile previews
- Responsive desktop + mobile companion-app navigation
- Vindictus black / antique-gold visual theme
- Supabase relational schema foundation
- Discord OAuth placeholders
- Admin dashboard foundation

## Architecture

- **GitHub** — source control
- **Vercel** — deployment
- **Supabase** — database and auth integration
- **Discord OAuth / Discord API** — identity, guild membership, role-based admin access

## Local preview

```bash
python -m http.server 8080
```

Then open `http://localhost:8080`.

## Vercel

1. Import this GitHub repository into Vercel.
2. Framework preset: **Other**
3. Build command: leave blank
4. Output directory: `.`
5. Deploy.

## Supabase

When ready for Version 1B:

1. Create a Supabase project.
2. Open the SQL Editor.
3. Run `supabase/schema.sql`.
4. Configure Discord OAuth.
5. Add the required environment variables to Vercel.
6. Replace the static sample data adapter with Supabase queries.

## Planned next steps

- Sign in with Discord
- Verify membership in the Vindictus Discord server
- Member-maintained profiles
- Searchable/category-based recipe selector
- Custom recipes added to master catalog
- Duplicate detection
- Guild Master / Flag Officer role checks
- Automatic hiding of users who leave the Discord
- WoW-style live item tooltips
- Recipe materials support
