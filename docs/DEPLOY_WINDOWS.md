# Deploying Golden Wings on Windows Server

The site runs as one Node.js app (website + admin) on the server, behind IIS which handles the domain and HTTPS.
PostgreSQL runs on the same machine. Uploaded images are stored on disk.

```
Visitor ──HTTPS──> IIS (domain, certificate) ──> Node app on 127.0.0.1:3000 ──> PostgreSQL on 127.0.0.1:5432
                                                        └──> images in D:\goldenwings-data\media
```

Paths below use `C:\sites\goldenwings` for the code and `D:\goldenwings-data` / `D:\goldenwings-backups` for data.
Use other drives or folders if you like; keep data **outside** the code folder.

## 1. Install the software (once)

Install as Administrator:

| Software | Where | Notes |
|---|---|---|
| Node.js 24 LTS (24.22.1 or newer) | nodejs.org | Default options |
| Git for Windows | git-scm.com | Default options |
| PostgreSQL 17 or 18 | postgresql.org → Windows installer | Remember the `postgres` password you choose. Keep port 5432 |
| IIS | Server Manager → Add Roles → Web Server (IIS) | |
| IIS URL Rewrite | iis.net/downloads/microsoft/url-rewrite | |
| IIS Application Request Routing (ARR) 3 | iis.net/downloads/microsoft/application-request-routing | |
| NSSM | nssm.cc/download | Unzip, e.g. to `C:\tools\nssm\nssm.exe` (use the `win64` one) |
| win-acme | win-acme.com | Free HTTPS certificates for IIS (Let's Encrypt) |

## 2. Create the database

Open **SQL Shell (psql)** from the Start menu, sign in as `postgres`, and run (choose your own password):

```sql
CREATE USER goldenwings WITH PASSWORD 'choose-a-long-password';
CREATE DATABASE goldenwings OWNER goldenwings
  ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0;
```

`ENCODING 'UTF8'` is required. Windows may otherwise create a database that cannot store Arabic.

PostgreSQL only listens on this machine by default; leave it that way (no firewall rule for 5432).

## 3. Get the code

```powershell
git clone https://github.com/khaledyasir/Goldenwings.git C:\sites\goldenwings
cd C:\sites\goldenwings
git checkout main        # or feature/dynamic-cms-admin until it is merged
mkdir D:\goldenwings-data\media, D:\goldenwings-data\logs, D:\goldenwings-backups
```

## 4. Settings: `C:\sites\goldenwings\.env`

Copy `.env.example` to `.env` and fill it in:

```ini
DATABASE_URL=postgres://goldenwings:choose-a-long-password@127.0.0.1:5432/goldenwings
PAYLOAD_SECRET=<paste output of: node -e "console.log(require('crypto').randomBytes(32).toString('hex'))">
SERVER_URL=https://goldenwingsjo.com
PORT=3000
MEDIA_DIR=D:\goldenwings-data\media
```

Keep this file private: it holds the database password and the session secret. If the password contains
`@ : / ? #` characters, URL-encode them (e.g. `@` → `%40`), or pick a password without them.

Optional email (password reset, booking notifications): fill the `SMTP_*` lines and `BOOKING_NOTIFY_EMAIL`.

## 5. Install, create the tables, import the content, build

```powershell
cd C:\sites\goldenwings
npm ci
npm run migrate          # creates all tables
npm run seed             # imports the current site's text, images, fleet and partners (safe to re-run)
npm run owner:create -- owner@goldenwingsjo.com "Owner Name"   # prints a one-time password, note it
npm run build
```

Register the app as a Windows service (starts with Windows, restarts if it crashes):

```powershell
powershell -ExecutionPolicy Bypass -File scripts\windows\install-service.ps1 -Nssm C:\tools\nssm\nssm.exe
```

It should report `HTTP 200`. Logs: `D:\goldenwings-data\logs\site.log` and `site-error.log`.

The service runs as its own limited account, `NT SERVICE\GoldenWings`, not as SYSTEM. The script gives it read
access to the code, write access only to `.next` (image cache), the images folder and the logs, and locks `.env`
so only Administrators, SYSTEM and the service can read it.
Manage it like any service: `Restart-Service GoldenWings`, or **services.msc**.

## 6. IIS: connect the domain to the app

1. **Proxy settings** (once per server), in an Administrator PowerShell:

   ```powershell
   $appcmd = "$env:windir\system32\inetsrv\appcmd.exe"
   # Turn on the proxy; keep the visitor's domain; send their IP without port; don't buffer streamed pages
   & $appcmd set config -section:system.webServer/proxy /enabled:"True" /preserveHostHeader:"True" `
     /reverseRewriteHostInResponseHeaders:"False" /includePortInXFF:"False" /responseBufferLimit:"0" /commit:apphost
   # Allow the rewrite rule to tell the app the visitor used HTTPS
   & $appcmd set config -section:system.webServer/rewrite/allowedServerVariables /+"[name='HTTP_X_FORWARDED_PROTO']" /commit:apphost
   ```

2. **Site**: create the folder `C:\inetpub\goldenwings` and copy `scripts\windows\web.config` into it.
   In IIS Manager → Sites → Add Website: name `goldenwings`, physical path `C:\inetpub\goldenwings`,
   binding `http`, port 80, host name `goldenwingsjo.com` (add a second binding for `www.goldenwingsjo.com` if used).
   Stop or remove the "Default Web Site" if it also uses port 80.

3. **DNS**: point the domain's A record to the server's public IP (at your domain registrar).

4. **HTTPS**: run `wacs.exe` (win-acme) → "Create certificate (default settings)" → pick the `goldenwings` site.
   It installs the certificate, adds the https binding, and renews automatically.

5. **Firewall**: allow inbound TCP 80 and 443 only. Do not open 3000 or 5432.

Open `https://goldenwingsjo.com` (site) and `https://goldenwingsjo.com/admin` (sign in with the owner account,
then change the password from your account page).

## 7. Daily backups

```powershell
schtasks /create /tn "GoldenWings Backup" /sc daily /st 03:00 /ru SYSTEM /rl HIGHEST /tr `
  "powershell -NoProfile -ExecutionPolicy Bypass -File C:\sites\goldenwings\scripts\windows\backup.ps1 -BackupDir D:\goldenwings-backups"
```

Each run writes `db_<date>.dump` (database) and `media_<date>.zip` (images) and deletes copies older than 14 days.
The backup folder is restricted to Administrators and SYSTEM because it contains all booking details; run the
script from an Administrator PowerShell when running it by hand.
Copy `D:\goldenwings-backups` to another machine or cloud storage regularly: a backup on the same disk does not
survive a disk failure.

### Restoring a backup

```powershell
Stop-Service GoldenWings
$env:PGPASSWORD = Read-Host "Database password"      # kept off the command line
& "C:\Program Files\PostgreSQL\17\bin\pg_restore.exe" --clean --if-exists --no-owner `
  --host=127.0.0.1 --username=goldenwings --dbname=goldenwings D:\goldenwings-backups\db_2026-11-09_0300.dump
Remove-Item Env:PGPASSWORD
Expand-Archive D:\goldenwings-backups\media_2026-11-09_0300.zip -DestinationPath D:\goldenwings-data\media -Force
Start-Service GoldenWings
```

Single pages can also be rolled back without a backup: Admin → the page → Versions → Restore.

## 8. Updating the site

After new code is pushed to GitHub:

```powershell
cd C:\sites\goldenwings
powershell -ExecutionPolicy Bypass -File scripts\windows\update.ps1 -BackupDir D:\goldenwings-backups
```

It backs up, stops the site, pulls the code, installs packages, applies database changes, builds and starts again
(a few minutes offline). Content, images and `.env` are never touched by updates.

## Troubleshooting

| Symptom | Check |
|---|---|
| 502 / "bad gateway" | Is the service running? `Get-Service GoldenWings`; then `D:\goldenwings-data\logs\site-error.log` |
| Admin login works but saving says "forbidden" / you are logged out | `SERVER_URL` in `.env` must exactly match the address in the browser (https, with or without www) |
| Redirects go to `127.0.0.1:3000` | `preserveHostHeader` in step 6.1 was not applied |
| Arabic text saves as `???` | The database was not created with `ENCODING 'UTF8'` (step 2) |
| Images missing after an update | `MEDIA_DIR` points to the wrong folder; images are in `D:\goldenwings-data\media` |
| Large images fail to upload | Limit is 10 MB per image (admin) and 20 MB per request (IIS `web.config`) |
