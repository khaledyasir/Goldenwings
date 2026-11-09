# Golden Wings website

Arabic-first (RTL) and English site for Golden Wings Jordanian Bus Rental & Transportation Services. It is built with Next.js 16 and [Payload CMS](https://payloadcms.com) 3 on PostgreSQL.

All business content is managed from `/admin` or the click-to-edit visual editor, so normal changes need no code edits or redeploys. That content includes text, images, fleet, trips, partners, reviews, contact details and menus. Booking requests and staff entries are stored in the database.

- **Setup, architecture, deployment, backups:** [docs/CMS.md](docs/CMS.md)
- **Owner guide (Arabic):** [docs/OWNER_GUIDE_AR.md](docs/OWNER_GUIDE_AR.md)

```bash
npm install
cp .env.example .env        # set PAYLOAD_SECRET
npm run db:dev              # local PostgreSQL, keep running
npm run seed                # import the site content
npm run owner:create -- you@example.com "Your Name"
npm run dev
```
