# Golden Wings CMS: architecture, setup, deployment

## Decision record

**Before:** a static Next.js 16 site. All copy lived in `src/lib/constants.ts` and inline `t(lang, "عربي", "English")` pairs; images were files in `/public`. The booking and entries forms only opened a WhatsApp message, so nothing was stored. There was no backend, database or login.

**Chosen:** [Payload CMS 3](https://payloadcms.com) running inside this Next.js app, with PostgreSQL. Uploaded images are stored on the server's disk.

Why Payload, not a hand-built CMS on Supabase:

- **Built in, so not written here:** auth with sessions, lockout and password reset; role-based access on every operation; an Arabic RTL admin UI; field-level ar/en localization, which maps 1:1 onto the site's existing `{ ar, en }` pairs; drafts, version history with restore, a media library, trash (soft delete) and drag-to-reorder.
- **Hosting:** it runs in the same Node.js process as the site. There is no second service to host. Deployment: [DEPLOY_WINDOWS.md](DEPLOY_WINDOWS.md).
- **Database:** Postgres is the store. Supabase or Neon both work as the Postgres host; Supabase Auth and Storage aren't needed.

**Bespoke code** is limited to the things Payload doesn't provide:

- the click-to-edit visual editor
- the public booking flow and the staff entries flow
- the CSV export
- the seed of the existing content

**Rendering:**

- Every public page is server-rendered per request. Pages were already dynamic because of the language cookie.
- A published change is live on the next page load. There is no cache to invalidate and no redeploy.
- Visitors only ever receive published content.

## Content model

| What | Where in admin | Notes |
|---|---|---|
| Contact details, logo, menus, footer, shared labels, default SEO | Globals → Site settings | Phone, WhatsApp, email and social links appear everywhere from here |
| Each page's text and images | Globals → Website pages → one per page | Typed sections with stable field paths; drafts and revisions |
| Fleet | Collections → Fleet, Fleet categories, Vehicle amenities | Vehicles have a category, capacity, cover, gallery, amenities, a "bookable" flag, publish status and order |
| Trips | Trips, Trip sections | A section is "scheduled" (date, price, phone) or "guide" (no date or price needed) |
| Partners | Partners | Logo optional; "details" is the text revealed on click; home-carousel flag |
| Reviews | Customer reviews | None exist yet, so the page shows field-name placeholders until one is published, as before |
| Booking requests | Operations → Booking requests (owner only) | Reference, status, history, notes, assignee, vehicle snapshot |
| Entries | Operations → Entries; dropdown lists in Entry lists | Staff see their own entries; the owner sees all |
| Images | Media library | jpeg/png/webp/avif/gif up to 10 MB. Delete is refused while an image is in use |

Text fields render as plain text, never as HTML. Text in `[brackets]` is highlighted in gold in two places: the employee-transport statistics and the tourism hero title.

## Roles

| Role | Can |
|---|---|
| owner | Everything: users, bookings, entries, exports, content |
| editor | Website content, media, visual editor. Cannot see bookings, entries or users |
| staff | Submit entries at `/entries` and see their own entries in the admin |

- **No public sign-up:** Payload's "create first user" screen is blocked by a hook.
- **Creating the first owner:** `npm run owner:create -- email "Name"` prints a random password once.
- **Adding more users:** the owner creates them under Settings → Users. They can use "Forgot password" once SMTP is configured.

## Visual editor

- **Entering:** Admin → **تعديل الموقع / Edit Website**, or any page global's "Preview" button.
- **What it is:**
  - The real site, with the signed-in owner or editor seeing drafts.
  - Hover outlines on editable text and images.
  - Click to edit text or swap an image from the media library, or upload one.
  - Fleet, partner, trip and review cards open their admin form in a new tab.
  - Toolbar: save draft, publish, discard unsaved, revert drafts to published, preview, page switcher and exit. It warns about unsaved changes.
- **Security:** editing needs the `gw-edit` cookie *and* a valid owner or editor session, checked server-side on every request.
- **Visitors' downloads:** the editor's code is loaded on demand only in that mode, so visitors download none of it.
- **How it targets content:** markers are `data-cms="<global>|<field.path>|text|image"` and `data-cms-doc="<collection>/<id>"`. These are stable field paths, not CSS selectors.

## Local development

```bash
npm install                      # .npmrc sets legacy-peer-deps: npm 12's resolver stalls on Payload's peer graph without it
cp .env.example .env             # fill PAYLOAD_SECRET, uncomment PAYLOAD_PUSH=true; DATABASE_URL points at the dev DB
npm run db:dev                   # embedded PostgreSQL 18 on :54329 (no Docker), keep running
npm run seed                     # imports the original site content (safe to re-run)
npm run owner:create -- you@example.com "Your Name"
npm run dev                      # http://localhost:3000, admin at /admin
```

**Notes:**

- **Node version:** Payload 3.93 declares Node ≥ 22.23.4 or ≥ 24.22.1. Its CLI is run with `--use-swc` (the npm scripts do this) because its default tsx loader fails on older Node 24 patch releases. Upgrading Node removes the need, but the flag is harmless.
- **Dev database schema:** synced automatically from the config when `PAYLOAD_PUSH=true` (development only). The server only changes through migrations (`npm run migrate`).
- **Schema changes:** after changing collections or globals, run:
  - `npm run generate` (TypeScript types and admin import map)
  - `npm run payload -- migrate:create <name>`, then commit the migration.

### Tests

```bash
npm run typecheck && npm run lint
npm test                     # validation + permission tests against the goldenwings_test DB (needs db:dev running)
# Browser end-to-end against a running site. It changes content and restores it: never point it at production.
BASE_URL=http://localhost:3000 OWNER_EMAIL=... OWNER_PASSWORD=... BROWSER="path/to/chrome-or-brave" node tests/e2e.mjs
```

## Deploying

The site is self-hosted on Windows Server (IIS in front, the app as a Windows service, PostgreSQL on the same
machine, images on disk). Step-by-step: **[DEPLOY_WINDOWS.md](DEPLOY_WINDOWS.md)**, including backups, restore
and updates (`scripts/windows/`).

### Rollback

- **Content:** any page or settings change can be rolled back in the admin under that page → Versions → Restore. Deleted items go to Trash and can be restored.
- **Database / images:** restore the nightly backup (`scripts/windows/backup.ps1` output). `update.ps1` also takes one before every update.
- **Code:** check out the previous commit and run the build again. If that commit predates a migration, restore the database backup taken before the update, or run `npm run payload -- migrate:down`.

## Status

**Implemented and verified locally:**

- Fresh migrate → seed → reseed works.
- The DB-backed site matches `main` exactly on all 10 routes in both languages: visible text, page titles, meta descriptions and image alt text. Layout matches on screenshots.
- The visual editor works end to end: edit, draft privacy, image swap, publish, revisions.
- Booking requests are stored with a reference, status history and CSV export.
- The staff entries flow works.
- Permission tests pass.

**Needs external configuration:**

- The server: PostgreSQL, `.env` (`DATABASE_URL`, `PAYLOAD_SECRET`, `SERVER_URL`, `MEDIA_DIR`), IIS + HTTPS certificate.
- SMTP, for password-reset email and booking notifications. Without it, emails are written to the server log.

**Security trade-offs accepted (from the security review), with the upgrade path:**

- **Login lockout:** five wrong passwords lock an account for 15 minutes. Anyone who knows the owner's email could keep it locked. Add rate limiting on `/api/users/login` in IIS (Dynamic IP Restrictions) if that ever happens.
- **Booking floods:**
  - The limit is 5 requests per IP (IPv6 per /64) every 10 minutes.
  - Site-wide, requests from 100 per 10 minutes are stored but flagged as suspected spam, and no email is sent for them.
  - Above 1,000 per 10 minutes, requests are refused.
  - Adding a challenge such as Cloudflare Turnstile for unusual volume would remove the trade-off, but needs an account.
- **Document locks:** any signed-in user can create or clear Payload's "document is being edited" locks. This is a nuisance only, with no data access.

**Deliberately not built:**

- Online payments.
- Public review submission (reviews are entered by staff).
- New page templates or arbitrary page layouts.
- Drag-and-drop section ordering on pages. List items such as features, cards and countries can be added, removed and reordered in the admin; whole sections cannot.
