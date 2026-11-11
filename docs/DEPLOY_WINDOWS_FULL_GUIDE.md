# Golden Wings — Full Deployment Guide (Windows Server + IIS + NSSM)

From an empty Windows Server to a live, secure, backed-up website at `https://goldenwingsjo.com`.
Every step tells you **what** to do, **the exact commands**, **why** you are doing it, and **how to check it worked**.

> Short version for experienced admins: [DEPLOY_WINDOWS.md](DEPLOY_WINDOWS.md). This guide covers the same setup in full detail.

---

## Table of contents

0. [Understand the big picture first](#0-understand-the-big-picture-first)
1. [Before you start: what you need](#1-before-you-start-what-you-need)
2. [Prepare the server](#2-prepare-the-server)
3. [Install the software](#3-install-the-software)
4. [Create the database](#4-create-the-database)
5. [Put the code on the server](#5-put-the-code-on-the-server)
6. [Create the settings file (.env)](#6-create-the-settings-file-env)
7. [Install packages, create tables, import content, build](#7-install-packages-create-tables-import-content-build)
8. [Run the app as a Windows service (NSSM)](#8-run-the-app-as-a-windows-service-nssm)
9. [Configure IIS as the front door (reverse proxy)](#9-configure-iis-as-the-front-door-reverse-proxy)
10. [Point the domain to the server (DNS)](#10-point-the-domain-to-the-server-dns)
11. [Firewall](#11-firewall)
12. [HTTPS certificate (win-acme / Let's Encrypt)](#12-https-certificate-win-acme--lets-encrypt)
13. [Final go-live checklist](#13-final-go-live-checklist)
14. [Backups and restore](#14-backups-and-restore)
15. [Updating the site with new code](#15-updating-the-site-with-new-code)
16. [Daily operations cheat sheet](#16-daily-operations-cheat-sheet)
17. [Troubleshooting](#17-troubleshooting)
18. [Security checklist](#18-security-checklist)
19. [Glossary](#19-glossary)
20. [Plesk server: goldenwings.oneit.website](#20-plesk-server-goldenwingsoneitwebsite)

---

## 0. Understand the big picture first

The project is **one Node.js application** (Next.js + Payload CMS). It contains both the public website and the
admin panel (`/admin`). It stores its data in **PostgreSQL** and uploaded images in a **folder on disk**.

```
                       ┌──────────────────────────── Windows Server ────────────────────────────┐
                       │                                                                          │
Visitor's browser ──HTTPS(443)──> IIS ──(forwards request)──> Node app ──────> PostgreSQL           │
  goldenwingsjo.com    │   • owns the domain          127.0.0.1:3000          127.0.0.1:5432      │
                       │   • holds the certificate    (Windows service       (database: pages,    │
                       │   • HTTP → HTTPS redirect     "GoldenWings",         bookings, users)    │
                       │                               run by NSSM)                                │
                       │                                   └──> D:\goldenwings-data\media (images) │
                       └──────────────────────────────────────────────────────────────────────────┘
```

What each piece does, and why you need it:

| Piece | Its job | Why |
|---|---|---|
| **Node.js** | Runs the app (JavaScript runtime) | Next.js/Payload are Node apps |
| **PostgreSQL** | The database | Payload stores all content, users and bookings here |
| **NSSM** | Turns `node ... next start` into a real **Windows service** | A normal command stops when you log off. A service starts with Windows, runs in the background and restarts itself if it crashes |
| **IIS** | The web server facing the internet | Listens on ports 80/443, owns the domain and the HTTPS certificate, and passes every request to the Node app. This is called a **reverse proxy** |
| **URL Rewrite + ARR** | IIS add-ons | They give IIS the ability to forward requests to another server (our Node app). IIS cannot do that out of the box |
| **win-acme** | Free HTTPS certificates from Let's Encrypt | Installs the certificate into IIS and renews it automatically every ~60 days |
| **Git** | Downloads the code and later updates | Updates become one command |

**Important design choices** (already built into the project's scripts):

- The Node app listens **only on `127.0.0.1`** (this machine). Nobody on the internet can reach port 3000 directly; they must go through IIS.
- PostgreSQL also stays **local only**.
- **Data lives outside the code folder** (`D:\goldenwings-data`), so updating the code never touches images, the database or the settings.
- The service runs under its own **limited account** (`NT SERVICE\GoldenWings`), not as Administrator/SYSTEM.

**Ready-made scripts in the repo** (you will use them; they are explained in the steps):

| File | What it does |
|---|---|
| `scripts\windows\install-service.ps1` | Creates the `GoldenWings` service with NSSM, sets permissions, starts it, tests it |
| `scripts\windows\web.config` | IIS rules: HTTP→HTTPS redirect, forward everything to `127.0.0.1:3000`, upload size limit |
| `scripts\windows\backup.ps1` | Database dump + images zip, keeps 14 days |
| `scripts\windows\update.ps1` | Backup → stop → pull code → install → migrate → build → start |

**Time needed:** about 2–3 hours the first time (most of it is installers and waiting for DNS).

---

## 1. Before you start: what you need

### 1.1 Checklist

- [ ] A **Windows Server** (2019, 2022 or 2025) with **Administrator** access via Remote Desktop.
      Recommended: **4 GB RAM or more** (the build step needs memory), 2+ CPU cores, 40 GB+ free disk.
      Ideally a second drive `D:` for data. If you only have `C:`, replace `D:\` with `C:\` everywhere below.
- [ ] The server's **public IP address** (from your hosting provider).
- [ ] Access to the **domain's DNS settings** (where `goldenwingsjo.com` was bought / is managed).
- [ ] Access to the **GitHub repository** (`khaledyasir/Goldenwings`) — a GitHub account that can read it.
- [ ] An **email address** for the site owner account and for Let's Encrypt expiry notices.
- [ ] Optional: **SMTP** details (host, port, user, password) for password-reset and booking emails.

### 1.2 Values used in this guide (replace with yours if different)

| Placeholder | Value in this guide |
|---|---|
| Domain | `goldenwingsjo.com` (and `www.goldenwingsjo.com`) |
| Code folder | `C:\sites\goldenwings` |
| Data folder (images, logs) | `D:\goldenwings-data` |
| Backup folder | `D:\goldenwings-backups` |
| IIS site folder (only holds `web.config`) | `C:\inetpub\goldenwings` |
| Tools folder | `C:\tools` |
| Database name / user | `goldenwings` / `goldenwings` |
| Windows service name | `GoldenWings` |
| App port (internal only) | `3000` |

### 1.3 One rule for the whole guide

**Always use PowerShell "Run as Administrator".**
Start menu → type `PowerShell` → right-click **Windows PowerShell** → **Run as administrator**.
Many steps (services, IIS, permissions, the locked `.env` file) fail silently or with "Access denied" otherwise.

---

## 2. Prepare the server

### 2.1 Windows Update and restart

Settings → Windows Update → install everything → restart. Starting from a patched system avoids installer errors.

### 2.2 Time zone

Bookings and backup file names use the server clock. Set it to Jordan time:

```powershell
Set-TimeZone -Id "Jordan Standard Time"
Get-Date      # check it shows the correct local time
```

### 2.3 Allow running local PowerShell scripts

```powershell
Set-ExecutionPolicy RemoteSigned -Scope LocalMachine -Force
```

*Why:* Windows blocks `.ps1` scripts by default. `RemoteSigned` allows scripts created on this machine (like ours, run
with `-ExecutionPolicy Bypass` anyway) while still blocking unsigned scripts downloaded from the internet.

### 2.4 Create the folders

```powershell
New-Item -ItemType Directory -Force C:\sites, C:\tools, D:\goldenwings-data\media, D:\goldenwings-data\logs, D:\goldenwings-backups
```

*Why separate folders:* code (`C:\sites`) can be deleted and re-cloned at any time; data (`D:\goldenwings-data`)
and backups must survive.

---

## 3. Install the software

Install in this order. After each one, run the **check** command in a **new** Administrator PowerShell window
(new windows pick up the updated `PATH`).

### 3.1 Node.js 24 LTS

1. Download the **Windows Installer (.msi), 64-bit**, version **24.x LTS** from <https://nodejs.org/en/download>.
2. Run it with default options. You can **untick** "Automatically install the necessary tools" (Chocolatey/Python are not needed;
   the image library `sharp` ships prebuilt for Windows).

Check:

```powershell
node -v      # v24.x.x
npm -v
```

*Why the MSI:* it installs to `C:\Program Files\nodejs`, which every account (including the service account) can read.
Do **not** use nvm or a per-user install — the Windows service would not find Node.

### 3.2 Git for Windows

Download from <https://git-scm.com/download/win>, install with default options (it includes Git Credential Manager,
which handles GitHub sign-in).

```powershell
git --version
```

### 3.3 PostgreSQL 17

1. Download the Windows installer (EDB) from <https://www.postgresql.org/download/windows/> → version 17.
2. In the installer:
   - Components: **PostgreSQL Server**, **Command Line Tools** (pgAdmin optional, Stack Builder not needed).
   - Data directory: default is fine (or `D:\PostgreSQL\17\data` if you want the database on D:).
   - **Password for `postgres`**: choose a strong one and **write it down** (this is the database super-admin).
   - Port: **5432**.
   - Locale: Default.
   - At the end, **untick** "Launch Stack Builder".
3. Add the PostgreSQL tools to the PATH so `psql` works everywhere:

```powershell
$machinePath = [Environment]::GetEnvironmentVariable("Path", "Machine")   # machine PATH only, not your user PATH
[Environment]::SetEnvironmentVariable("Path", $machinePath + ";C:\Program Files\PostgreSQL\17\bin", "Machine")
```

Open a new Administrator PowerShell and check:

```powershell
psql --version
Get-Service postgresql*          # Status should be Running
```

#### 3.3.1 Make PostgreSQL listen on this machine only

The Windows installer makes PostgreSQL listen on **all** network interfaces. The app only needs local access, so lock it down:

```powershell
$conf = "C:\Program Files\PostgreSQL\17\data\postgresql.conf"   # adjust if you chose another data directory
$lines = (Get-Content $conf) -replace "^#?\s*listen_addresses\s*=.*", "listen_addresses = 'localhost'"
[IO.File]::WriteAllLines($conf, $lines)          # writes UTF-8 without BOM (PostgreSQL rejects a BOM)
Select-String -Path $conf -Pattern "^listen_addresses"    # should print: listen_addresses = 'localhost'
Restart-Service postgresql-x64-17
netstat -ano | findstr ":5432"    # should show 127.0.0.1:5432 and [::1]:5432 only, NOT 0.0.0.0:5432
```

### 3.4 IIS (the web server role)

```powershell
Install-WindowsFeature -Name Web-Server, Web-Common-Http, Web-Static-Content, Web-Default-Doc, Web-Http-Errors, `
  Web-Http-Redirect, Web-Http-Logging, Web-Request-Monitor, Web-Filtering, Web-Stat-Compression, Web-Mgmt-Console `
  -IncludeManagementTools
```

Check: open `http://localhost` in the server's browser → you should see the blue IIS welcome page.
Also: Start menu → **Internet Information Services (IIS) Manager** should open.

### 3.5 IIS URL Rewrite module

Download **URL Rewrite 2.1 (x64)** from <https://www.iis.net/downloads/microsoft/url-rewrite> and install it.

### 3.6 IIS Application Request Routing (ARR) 3.0

Download from <https://www.iis.net/downloads/microsoft/application-request-routing> and install it
(**after** URL Rewrite).

Check both: close and reopen IIS Manager → click the server name (left tree) → you should see the icons
**URL Rewrite** and **Application Request Routing Cache**.

### 3.7 NSSM (Non-Sucking Service Manager)

```powershell
Invoke-WebRequest https://nssm.cc/release/nssm-2.24.zip -OutFile $env:TEMP\nssm.zip
Expand-Archive $env:TEMP\nssm.zip -DestinationPath $env:TEMP\nssm -Force
New-Item -ItemType Directory -Force C:\tools\nssm | Out-Null
Copy-Item $env:TEMP\nssm\nssm-2.24\win64\nssm.exe C:\tools\nssm\nssm.exe
C:\tools\nssm\nssm.exe version
```

*Why NSSM:* Node.js programs are not Windows services by themselves. NSSM wraps the `node` command so Windows can
start it at boot, stop it cleanly, restart it after a crash, and write its output to log files.
(If you ever hit odd start-up errors with 2.24, use the newest pre-release build from <https://nssm.cc/builds> instead.)

### 3.8 win-acme (HTTPS certificates)

1. Download the latest **x64 trimmed** zip from <https://www.win-acme.com/> (GitHub releases).
2. Extract it to `C:\tools\win-acme` (so you have `C:\tools\win-acme\wacs.exe`).

You will use it in step 12.

---

## 4. Create the database

### 4.1 Generate a database password

Use a password with **only letters and numbers** — then you never have to URL-encode it in the connection string:

```powershell
-join ((48..57) + (65..90) + (97..122) | Get-Random -Count 32 | ForEach-Object { [char]$_ })
```

Copy the output and keep it (password manager). Below it is called `DB_PASSWORD`.

### 4.2 Create the user and the database

```powershell
psql -U postgres -h 127.0.0.1
```

Enter the `postgres` password from step 3.3. At the `postgres=#` prompt, paste (replace `DB_PASSWORD`):

```sql
CREATE USER goldenwings WITH PASSWORD 'DB_PASSWORD';
CREATE DATABASE goldenwings OWNER goldenwings
  ENCODING 'UTF8' LC_COLLATE 'C' LC_CTYPE 'C' TEMPLATE template0;
\q
```

*Why:*
- A **dedicated user** `goldenwings` owns only this database; the app never uses the `postgres` super-admin.
- `ENCODING 'UTF8'` is **mandatory** — otherwise Windows may create the database in a legacy encoding and **Arabic text turns into `???`**.

### 4.3 Check

```powershell
psql -U goldenwings -h 127.0.0.1 -d goldenwings -c "SELECT current_user, pg_encoding_to_char(encoding) FROM pg_database WHERE datname='goldenwings';"
```

Expected: `goldenwings | UTF8`.

---

## 5. Put the code on the server

### 5.1 Clone the repository

```powershell
git clone https://github.com/khaledyasir/Goldenwings.git C:\sites\goldenwings
cd C:\sites\goldenwings
git checkout feature/dynamic-cms-admin   # the CMS, admin and these scripts exist ONLY on this branch until it is merged into main
git log -1 --oneline       # shows the commit you are on
```

If the repository is **private**, a browser window (Git Credential Manager) asks you to sign in to GitHub. Sign in
with an account that can read the repository; the login is remembered for future updates.

> Tip: better than your personal account is a read-only **fine-grained personal access token** limited to this one
> repository (GitHub → Settings → Developer settings → Fine-grained tokens → Contents: Read-only). Use it as the password when prompted.

### 5.2 Mark the folder as trusted for Git

Different Administrator accounts may later run updates; Git refuses folders owned by another user ("dubious ownership"). Prevent that once:

```powershell
git config --system --add safe.directory C:/sites/goldenwings
```

### 5.3 Alternative: no GitHub access from the server

On your development machine, download the repository as ZIP (GitHub → Code → Download ZIP), copy it to the server,
extract to `C:\sites\goldenwings`. Updates are then manual (copy the new files, then run the commands of step 7 again),
so Git is strongly recommended.

---

## 6. Create the settings file (.env)

The app reads all its settings from `C:\sites\goldenwings\.env`. This file is **never** in Git (it contains secrets).

### 6.1 Create it from the template

```powershell
cd C:\sites\goldenwings
Copy-Item .env.example .env
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"    # copy this output: PAYLOAD_SECRET
notepad .env
```

### 6.2 Fill it in

Replace the whole content with this (use your values):

```ini
DATABASE_URL=postgres://goldenwings:DB_PASSWORD@127.0.0.1:5432/goldenwings
PAYLOAD_SECRET=paste-the-64-character-hex-string-here
SERVER_URL=https://goldenwingsjo.com
PORT=3000
MEDIA_DIR=D:\goldenwings-data\media

# Optional email (password reset + booking notifications). Leave SMTP_HOST empty to disable.
SMTP_HOST=
SMTP_PORT=587
SMTP_USER=
SMTP_PASS=
SMTP_FROM=no-reply@goldenwingsjo.com
BOOKING_NOTIFY_EMAIL=
```

What each line means:

| Setting | Meaning |
|---|---|
| `DATABASE_URL` | How the app connects to PostgreSQL: `postgres://USER:PASSWORD@HOST:PORT/DATABASE` |
| `PAYLOAD_SECRET` | Random key that signs admin logins. Never share it. Changing it logs everyone out |
| `SERVER_URL` | The **exact** public address people use, `https://`, no trailing slash. Admin login security checks against it. If you use `www.`, put `https://www.goldenwingsjo.com` instead — pick one |
| `PORT` | Internal port; must match `web.config` (3000) |
| `MEDIA_DIR` | Where uploaded images are saved — outside the code folder |
| `SMTP_*` | Your mail provider's SMTP details (e.g. Microsoft 365: `smtp.office365.com`, port 587) |
| `BOOKING_NOTIFY_EMAIL` | Who receives an email for each new booking |

**Do not** add `PAYLOAD_PUSH=true` on the server (that is for development only and can change tables without migrations).

Save and close Notepad.

---

## 7. Install packages, create tables, import content, build

All in `C:\sites\goldenwings`, Administrator PowerShell.

### 7.1 Install packages

```powershell
cd C:\sites\goldenwings
npm ci
```

*What it does:* installs the exact package versions recorded in `package-lock.json` into `node_modules`.
`npm ci` (not `npm install`) guarantees the server gets the same versions you tested.

### 7.2 Create the database tables

```powershell
npm run migrate
```

*What it does:* runs the migrations in `src/migrations` — the scripts that create every table. Run again after every
update (the update script does this for you). Expected output ends with migrations marked as done.

### 7.3 Import the current site content

```powershell
npm run seed
```

*What it does:* fills the database with the site's texts (Arabic/English), images, fleet and partners. Safe to re-run.

### 7.4 Create the owner (admin) account

```powershell
npm run owner:create -- owner@goldenwingsjo.com "Owner Name"
```

It prints a **temporary password once**. Copy it now. There is no public sign-up and no default password.
You will change it after the first login.

### 7.5 Build the production version

```powershell
npm run build
```

Takes a few minutes. It compiles the site into the `.next` folder. It must finish with no errors.
If it fails with "JavaScript heap out of memory":

```powershell
$env:NODE_OPTIONS = "--max-old-space-size=4096"; npm run build; Remove-Item Env:NODE_OPTIONS
```

### 7.6 Quick manual test (optional but recommended)

```powershell
npm start
```

Open `http://127.0.0.1:3000` in the server's browser → the site should appear. Then press **Ctrl+C** to stop it.
(This proves the app, database and build all work before adding the service and IIS on top.)

---

## 8. Run the app as a Windows service (NSSM)

### 8.1 Install the service

```powershell
cd C:\sites\goldenwings
powershell -ExecutionPolicy Bypass -File scripts\windows\install-service.ps1 -Nssm C:\tools\nssm\nssm.exe
```

Expected last line: `Service GoldenWings is running: HTTP 200 on 127.0.0.1:3000`.

### 8.2 What the script did (so you understand it)

1. `nssm install GoldenWings node node_modules\next\dist\bin\next start -H 127.0.0.1 -p 3000`
   → a service that runs the production server, bound to localhost only.
2. Set the service to run as **`NT SERVICE\GoldenWings`**, a virtual account Windows manages (no password).
3. Permissions:
   - the service can **read** the code,
   - **write** only to `.next` (image cache), `D:\goldenwings-data\media` and `D:\goldenwings-data\logs`,
   - `.env` is locked so only **Administrators, SYSTEM and the service** can read it.
4. NSSM settings: working folder = code folder, `NODE_ENV=production`, **start automatically** with Windows,
   **restart after 5 s** if it crashes, output to `D:\goldenwings-data\logs\site.log` and `site-error.log`,
   log rotation at 10 MB.
5. Started the service and tested `http://127.0.0.1:3000/`.

The equivalent manual NSSM commands, if you ever need them:

```powershell
C:\tools\nssm\nssm.exe status  GoldenWings
C:\tools\nssm\nssm.exe edit    GoldenWings   # opens a settings window
C:\tools\nssm\nssm.exe restart GoldenWings
C:\tools\nssm\nssm.exe remove  GoldenWings confirm   # delete the service (e.g. to re-run the install script)
```

### 8.3 Check

```powershell
Get-Service GoldenWings                       # Status: Running, StartType: Automatic
curl.exe -I http://127.0.0.1:3000/            # HTTP/1.1 200 OK
Get-Content D:\goldenwings-data\logs\site-error.log -Tail 30   # should be empty or only warnings
```

Test the auto-restart: `Restart-Computer`, log back in, run `Get-Service GoldenWings` → Running.

---

## 9. Configure IIS as the front door (reverse proxy)

### 9.1 Enable the proxy (once per server)

```powershell
$appcmd = "$env:windir\system32\inetsrv\appcmd.exe"
& $appcmd set config -section:system.webServer/proxy /enabled:"True" /preserveHostHeader:"True" `
  /reverseRewriteHostInResponseHeaders:"False" /includePortInXFF:"False" /responseBufferLimit:"0" /commit:apphost
& $appcmd set config -section:system.webServer/rewrite/allowedServerVariables /+"[name='HTTP_X_FORWARDED_PROTO']" /commit:apphost
```

What each option means:

| Option | Why |
|---|---|
| `enabled:True` | Turns on ARR's forwarding ability |
| `preserveHostHeader:True` | The app sees `goldenwingsjo.com`, not `127.0.0.1:3000` (otherwise redirects and admin login break) |
| `reverseRewriteHostInResponseHeaders:False` | Don't let IIS rewrite the app's redirect addresses |
| `includePortInXFF:False` | Send the visitor's IP without a port (used for booking spam protection) |
| `responseBufferLimit:0` | Stream pages immediately instead of buffering them (Next.js streams responses) |
| `allowedServerVariables HTTP_X_FORWARDED_PROTO` | Lets `web.config` tell the app "the visitor used HTTPS" |

> The second command prints an error if the variable is already allowed — that's fine.

### 9.2 Create the site folder and copy `web.config`

```powershell
New-Item -ItemType Directory -Force C:\inetpub\goldenwings | Out-Null
Copy-Item C:\sites\goldenwings\scripts\windows\web.config C:\inetpub\goldenwings\web.config
```

The IIS site has **no website files** — only this `web.config`, which contains the rules:

1. Requests to `/.well-known/acme-challenge/...` are served from this folder (needed by win-acme to prove you own the domain).
2. Everything on `http://` is **redirected to `https://`** (except `localhost`, for testing on the server).
3. Everything else is **forwarded to `http://127.0.0.1:3000`** with the header `X-Forwarded-Proto: https`.
4. Upload limit 20 MB per request; IIS shows the app's own error pages instead of its own.

### 9.3 Create the application pool and the site

```powershell
Import-Module WebAdministration

# App pool without .NET (IIS is only forwarding, not running code)
New-WebAppPool -Name goldenwings
Set-ItemProperty IIS:\AppPools\goldenwings -Name managedRuntimeVersion -Value ""

# The site, bound to the domain on port 80 (HTTPS is added in step 12)
New-Website -Name goldenwings -PhysicalPath C:\inetpub\goldenwings -ApplicationPool goldenwings `
  -Port 80 -HostHeader goldenwingsjo.com
New-WebBinding -Name goldenwings -Protocol http -Port 80 -HostHeader www.goldenwingsjo.com

# The default IIS site is not needed
Stop-Website "Default Web Site"
Set-ItemProperty "IIS:\Sites\Default Web Site" -Name serverAutoStart -Value $false
```

(You can do the same in IIS Manager: Application Pools → Add → ".NET CLR version: No Managed Code";
Sites → Add Website → name, path, binding with host name.)

### 9.4 Check

```powershell
curl.exe -I -H "Host: goldenwingsjo.com" http://127.0.0.1/
```

Expected: `HTTP/1.1 301` with `Location: https://goldenwingsjo.com/` — IIS received the request and applied the
HTTPS redirect. (The HTTPS part works after step 12.)

---

## 10. Point the domain to the server (DNS)

At your domain registrar / DNS provider, create or change these records:

| Type | Name / Host | Value | TTL |
|---|---|---|---|
| A | `@` (= `goldenwingsjo.com`) | your server's public IP | 3600 (or lowest available) |
| A | `www` | your server's public IP | 3600 |

Remove any old A/AAAA/CNAME records for `@` and `www` that point elsewhere (e.g. an old host or Vercel).
If the server has no IPv6, make sure there is **no AAAA record**, or visitors with IPv6 may fail to connect.

Check from any PC (can take minutes up to a few hours):

```powershell
Resolve-DnsName goldenwingsjo.com -Server 8.8.8.8
Resolve-DnsName www.goldenwingsjo.com -Server 8.8.8.8
```

Both must show your server's IP before step 12.

---

## 11. Firewall

Only web traffic may come in. Ports 3000 (Node) and 5432 (PostgreSQL) must stay closed.

```powershell
New-NetFirewallRule -DisplayName "Golden Wings HTTP"  -Direction Inbound -Protocol TCP -LocalPort 80  -Action Allow
New-NetFirewallRule -DisplayName "Golden Wings HTTPS" -Direction Inbound -Protocol TCP -LocalPort 443 -Action Allow

# Check nothing opens 3000 or 5432:
Get-NetFirewallRule -Direction Inbound -Enabled True | Get-NetFirewallPortFilter |
  Where-Object { $_.LocalPort -in 3000, 5432 }      # should print nothing
```

If your hosting provider has its own firewall / "security group" (Azure, AWS, Hetzner, etc.), open **80 and 443** there too.
Keep Remote Desktop (3389) restricted to your own IP if the provider allows it.

---

## 12. HTTPS certificate (win-acme / Let's Encrypt)

Requirements: DNS from step 10 points to the server and port 80 is reachable from the internet.

```powershell
cd C:\tools\win-acme
.\wacs.exe
```

In the menu:

1. **N** — Create certificate (default settings).
2. Choose the IIS site **goldenwings**.
3. Select bindings: choose **all** (both `goldenwingsjo.com` and `www.goldenwingsjo.com`) — press Enter.
4. Enter your **email** (for expiry warnings) and **accept** the Let's Encrypt terms.

win-acme then:
- proves domain ownership through `http://goldenwingsjo.com/.well-known/acme-challenge/...` (our `web.config` allows this),
- installs the certificate and adds the **https / 443** bindings to the site,
- creates a **scheduled task** that renews it automatically (Task Scheduler → "win-acme renew").

Check:

```powershell
curl.exe -I https://goldenwingsjo.com/          # HTTP/1.1 200 OK
curl.exe -I http://goldenwingsjo.com/           # 301 → https://goldenwingsjo.com/
.\wacs.exe --list                               # shows the renewal and its next date
```

### 12.1 Optional: one canonical address (recommended)

`SERVER_URL` holds **one** address. If someone opens the admin at `www.` while `SERVER_URL` has no `www`, login may fail.
Redirect `www` to the main domain by adding this rule in `C:\inetpub\goldenwings\web.config`, directly **after** the
`ACME challenge` rule:

```xml
<rule name="www to main domain" stopProcessing="true">
  <match url="(.*)" />
  <conditions>
    <add input="{HTTP_HOST}" pattern="^www\.goldenwingsjo\.com$" />
  </conditions>
  <action type="Redirect" url="https://goldenwingsjo.com/{R:1}" redirectType="Permanent" />
</rule>
```

IIS picks up `web.config` changes immediately (no restart needed).

---

## 13. Final go-live checklist

Open in a normal browser (your own PC, not the server):

- [ ] `https://goldenwingsjo.com` shows the site with a padlock, Arabic and English both correct.
- [ ] `http://goldenwingsjo.com` and `http://www.goldenwingsjo.com` redirect to HTTPS.
- [ ] `https://goldenwingsjo.com/admin` → sign in with the owner email + temporary password.
- [ ] Change the owner password: Admin → your account (top right) → change password.
- [ ] Edit a text in the admin, save, check it appears on the site.
- [ ] Upload an image in the admin → it appears, and the file exists in `D:\goldenwings-data\media`.
- [ ] Submit a test booking on the site → it appears in Admin → Bookings (and an email arrives if SMTP is set).
- [ ] Restart the server → the site comes back by itself.
- [ ] `http://YOUR_SERVER_IP:3000` from your PC does **not** load (port closed — correct).
- [ ] Backups configured (step 14) and one manual backup tested.

---

## 14. Backups and restore

### 14.1 Daily automatic backup

```powershell
schtasks /create /tn "GoldenWings Backup" /sc daily /st 03:00 /ru SYSTEM /rl HIGHEST /tr `
  "powershell -NoProfile -ExecutionPolicy Bypass -File C:\sites\goldenwings\scripts\windows\backup.ps1 -BackupDir D:\goldenwings-backups"
```

Each night at 03:00 it creates in `D:\goldenwings-backups`:
- `db_<date>.dump` — the full database (pages, bookings, users),
- `media_<date>.zip` — all uploaded images,

and deletes backups older than 14 days. The folder is restricted to Administrators and SYSTEM (it contains customer data).

Test it right now:

```powershell
schtasks /run /tn "GoldenWings Backup"
Start-Sleep 20; Get-ChildItem D:\goldenwings-backups
```

### 14.2 Off-server copy (important)

A backup on the same disk does not survive a disk failure, ransomware or a deleted server. Copy the backup folder
somewhere else regularly, for example a network share, another server, or cloud storage (OneDrive/Azure/S3).
Example nightly copy to a network share (run as a scheduled task at 04:00):

```powershell
robocopy D:\goldenwings-backups \\BACKUP-SERVER\goldenwings /MIR /R:2 /W:10
```

### 14.3 Restore

```powershell
Stop-Service GoldenWings
$env:PGPASSWORD = Read-Host "Database password"      # the goldenwings DB password; kept off the command line
& "C:\Program Files\PostgreSQL\17\bin\pg_restore.exe" --clean --if-exists --no-owner `
  --host=127.0.0.1 --username=goldenwings --dbname=goldenwings D:\goldenwings-backups\db_2026-11-09_0300.dump
Remove-Item Env:PGPASSWORD
Expand-Archive D:\goldenwings-backups\media_2026-11-09_0300.zip -DestinationPath D:\goldenwings-data\media -Force
Start-Service GoldenWings
```

Replace the file names with the backup you want. A single page can also be rolled back without a backup:
Admin → the page → **Versions** → Restore.

---

## 15. Updating the site with new code

When new code is pushed to GitHub:

```powershell
cd C:\sites\goldenwings
powershell -ExecutionPolicy Bypass -File scripts\windows\update.ps1 -BackupDir D:\goldenwings-backups
```

It runs: **backup → stop service → git pull → npm ci → npm run migrate → npm run build → fix permissions → start service**.
The site is offline for a few minutes. Content, images and `.env` are never touched.

- It uses the `main` branch by default. **Until the CMS is merged into `main`, always add `-Branch feature/dynamic-cms-admin`** —
  otherwise the script switches the server to `main`, which has no admin/CMS, and the build/migrate steps fail.
- If a step fails, the script still starts the service again. If the build failed, read the error, fix it, and run
  the script again. If needed, restore the backup it made just before (step 14.3).
- If `web.config` changed in the update, copy it again:
  `Copy-Item C:\sites\goldenwings\scripts\windows\web.config C:\inetpub\goldenwings\web.config`
  (re-add your `www` rule from 12.1 if you use it).

---

## 16. Daily operations cheat sheet

| Task | Command (Administrator PowerShell) |
|---|---|
| Is the site running? | `Get-Service GoldenWings` |
| Restart the site | `Restart-Service GoldenWings` |
| Stop / start | `Stop-Service GoldenWings` / `Start-Service GoldenWings` |
| Watch live log | `Get-Content D:\goldenwings-data\logs\site.log -Wait -Tail 50` |
| Watch error log | `Get-Content D:\goldenwings-data\logs\site-error.log -Wait -Tail 50` |
| Edit settings | `notepad C:\sites\goldenwings\.env` then `Restart-Service GoldenWings` |
| Test the app directly | `curl.exe -I http://127.0.0.1:3000/` |
| Test through IIS | `curl.exe -I https://goldenwingsjo.com/` |
| Restart IIS | `iisreset` |
| IIS access logs | `C:\inetpub\logs\LogFiles\W3SVC*\` |
| Database status | `Get-Service postgresql*` |
| Certificate renewals | `C:\tools\win-acme\wacs.exe --list` |
| Run a backup now | `schtasks /run /tn "GoldenWings Backup"` |
| Add another admin user | Admin panel → Users → Create (or `npm run owner:create -- email "Name"`) |

---

## 17. Troubleshooting

Work from the inside out: **database → Node app → IIS → DNS/firewall → browser**.

| Symptom | Likely cause / fix |
|---|---|
| **502.3 Bad Gateway** from IIS | Node app is not running. `Get-Service GoldenWings`; read `site-error.log`; `curl.exe -I http://127.0.0.1:3000/` |
| Service starts then stops repeatedly | Look at `site-error.log`. Common: wrong `DATABASE_URL`/password, PostgreSQL stopped, missing `PAYLOAD_SECRET`, build missing (`npm run build`) |
| `ECONNREFUSED 127.0.0.1:5432` | PostgreSQL service is stopped: `Start-Service postgresql-x64-17` |
| `password authentication failed` | The password in `DATABASE_URL` does not match the DB user. Reset: `psql -U postgres -h 127.0.0.1 -c "ALTER USER goldenwings PASSWORD 'new';"` and update `.env` |
| IIS shows **404** or its own page, not the site | URL Rewrite/ARR missing, or `web.config` not in `C:\inetpub\goldenwings`, or wrong site binding/host name |
| IIS **500.50 / 500.52** URL Rewrite error | `HTTP_X_FORWARDED_PROTO` not allowed — rerun step 9.1 second command |
| Redirects go to `127.0.0.1:3000` | `preserveHostHeader` not applied — rerun step 9.1 |
| Admin login works, saving says *forbidden* / logged out | `SERVER_URL` in `.env` doesn't exactly match the browser address (https, www or not). Fix and `Restart-Service GoldenWings` |
| Arabic shows as `???` | Database not created with `ENCODING 'UTF8'` (step 4.2). Back up, recreate DB, restore |
| Images missing / upload fails with permission error | `MEDIA_DIR` wrong, or service lacks write access: `icacls D:\goldenwings-data\media /grant "NT SERVICE\GoldenWings:(OI)(CI)M" /T` |
| Large image upload fails (413) | Limit: 10 MB per image, 20 MB per request (`web.config`) |
| win-acme validation fails | DNS not pointing to server yet, port 80 blocked (Windows or provider firewall), or old `web.config` without the ACME rule |
| `npm run migrate` / `.env` "Access denied" | PowerShell is not "Run as administrator" (`.env` is locked) |
| Git: "detected dubious ownership" | `git config --system --add safe.directory C:/sites/goldenwings` |
| `npm ci` fails with EPERM / file in use | Stop the service first (`Stop-Service GoldenWings`) — Windows locks files in use. `update.ps1` already does this |
| Build: "heap out of memory" | See step 7.5 (`NODE_OPTIONS`), or add RAM |
| Password reset emails don't arrive | `SMTP_*` not set or wrong; check `site-error.log` after trying |

---

## 18. Security checklist

- [ ] Ports open to the internet: **80, 443** only (plus RDP restricted to your IP).
- [ ] PostgreSQL listens on `localhost` only (step 3.3.1); the `postgres` password is strong and stored safely.
- [ ] `.env` permissions locked (done by the install script) and never committed or emailed.
- [ ] The owner changed the temporary password after first login.
- [ ] Each admin person has their **own** account (Admin → Users); remove accounts of people who leave.
- [ ] Windows Update enabled; reboot monthly. Node.js: install new **24.x** patch releases (then `Restart-Service GoldenWings`).
- [ ] Backups run nightly **and** are copied off the server; test a restore every few months.
- [ ] win-acme renewal task exists; you receive Let's Encrypt emails at a monitored address.

---

## 19. Glossary

| Term | Meaning |
|---|---|
| **Reverse proxy** | A server (IIS) that receives visitors' requests and forwards them to the real app behind it |
| **Service** | A program Windows runs in the background, independent of who is logged in |
| **NSSM** | Tool that makes any program (here `node`) run as a Windows service |
| **ARR** | IIS add-on that allows forwarding requests to another address |
| **URL Rewrite** | IIS add-on for redirect/forward rules (used by `web.config`) |
| **Binding** | The combination of protocol + IP + port + host name an IIS site answers to |
| **Migration** | A script that creates or changes database tables in a controlled, repeatable way |
| **Seed** | Initial content loaded into an empty database |
| **Build** | Compiling the source code into an optimized production version (`.next`) |
| **`.env`** | Text file with the app's private settings (passwords, secret, URLs) |
| **Let's Encrypt** | Free certificate authority for HTTPS; win-acme talks to it for you |
| **DNS A record** | The entry that tells the world which IP address a domain name points to |

---

## 20. Plesk server: goldenwings.oneit.website

Use this section instead of steps 2.4, 3.4, 3.8, 5, 9.2–9.4, 11 and 12 when the server runs **Plesk** and the site lives in
`C:\inetpub\vhosts\oneit.website\goldenwings.oneit.website`. Everything else (Node, Git, PostgreSQL, database, `.env`,
build, NSSM service, backups) is the same as above, with the paths below.

**Why it differs:** Plesk owns IIS on this server — it creates the site, the app pool, the bindings and the certificate.
So you do **not** create an IIS site, do **not** stop "Default Web Site", and do **not** use win-acme. You only put the
proxy `web.config` into the folder Plesk serves.

### 20.1 Layout

| What | Path |
|---|---|
| Subdomain home (from Plesk) | `C:\inetpub\vhosts\oneit.website\goldenwings.oneit.website` |
| Code + `.env` (git clone) | `...\goldenwings.oneit.website\app` |
| Plesk document root (only `web.config`) | `...\goldenwings.oneit.website\httpdocs` |
| Images / logs | `C:\goldenwings-data\media`, `C:\goldenwings-data\logs` |
| Backups | `C:\goldenwings-backups` |

The code must **not** be in the folder IIS serves (it holds `.env` with the database password), hence `app` next to `httpdocs`.
Data and backups stay outside `vhosts` because Plesk can reset permissions there ("Repair", hosting changes) and counts it toward the disk quota.

### 20.2 Plesk panel

1. **Websites & Domains → Add Subdomain** → `goldenwings` under `oneit.website` (skip if it exists).
2. Subdomain → **Hosting Settings** → **Document root**: `goldenwings.oneit.website/httpdocs` → OK.
3. If the Plesk **Node.js** extension is enabled for this subdomain, **disable** it (it uses iisnode; we use the NSSM service instead).
   PHP/ASP.NET are not needed.

### 20.3 Software

Install as in **3.1 (Node 24), 3.2 (Git), 3.3 + 3.3.1 (PostgreSQL 17), 3.6 (ARR), 3.7 (NSSM)**.
Before PostgreSQL, check that port 5432 is free (`netstat -ano | findstr ":5432"` prints nothing); if not, choose another port in the installer and use it in `DATABASE_URL`.
URL Rewrite is normally already installed by Plesk (IIS Manager → server → **URL Rewrite** icon); install it (3.5) only if missing.

Then create the database exactly as in **step 4**.

### 20.4 Folders, code, port

```powershell
$GwHome = "C:\inetpub\vhosts\oneit.website\goldenwings.oneit.website"
New-Item -ItemType Directory -Force C:\tools, C:\goldenwings-data\media, C:\goldenwings-data\logs, C:\goldenwings-backups | Out-Null

git clone https://github.com/khaledyasir/Goldenwings.git "$GwHome\app"
cd "$GwHome\app"
git checkout feature/dynamic-cms-admin
git config --system --add safe.directory C:/inetpub/vhosts/oneit.website/goldenwings.oneit.website/app

netstat -ano | findstr ":3000 "     # must print nothing. Busy (another app on this server)? use e.g. 3010 everywhere below
```

### 20.5 `.env`

As in step 6, with these values:

```ini
DATABASE_URL=postgres://goldenwings:DB_PASSWORD@127.0.0.1:5432/goldenwings
PAYLOAD_SECRET=paste-the-64-character-hex-string-here
SERVER_URL=https://goldenwings.oneit.website
PORT=3000
MEDIA_DIR=C:\goldenwings-data\media
```

### 20.6 Install, migrate, seed, owner, build

Run **step 7** in `$GwHome\app` (`npm ci`, `npm run migrate`, `npm run seed`, `npm run owner:create -- ...`, `npm run build`).

### 20.7 Windows service

```powershell
cd "$GwHome\app"
powershell -ExecutionPolicy Bypass -File scripts\windows\install-service.ps1 -Nssm C:\tools\nssm\nssm.exe `
  -LogDir C:\goldenwings-data\logs -Port 3000
```

Expected: `Service GoldenWings is running: HTTP 200 on 127.0.0.1:3000`.

### 20.8 IIS proxy

1. Run **step 9.1** once (enables ARR proxy server-wide). If other sites on this server already use ARR, check
   `preserveHostHeader` doesn't break them first (it is normally what they want too).
2. Put the proxy rules into the Plesk document root:

```powershell
$web = "$GwHome\httpdocs\web.config"
if (Test-Path $web) { Copy-Item $web "$web.plesk-original" }       # keep what Plesk put there
Copy-Item "$GwHome\app\scripts\windows\web.config" $web
# Port is not 3000? edit the line  url="http://127.0.0.1:3000/{R:1}"  in $web
```

Delete any other files Plesk placed in `httpdocs` (e.g. `index.html`) — they are not used.

Check (from the server):

```powershell
curl.exe -I -H "Host: goldenwings.oneit.website" http://127.0.0.1/     # 301 -> https://goldenwings.oneit.website/
```

### 20.9 DNS

If `oneit.website`'s DNS is managed by Plesk, the `goldenwings` A record was created with the subdomain. Otherwise add at
the DNS provider: **A** `goldenwings` → server's public IP. Check: `Resolve-DnsName goldenwings.oneit.website -Server 8.8.8.8`.

### 20.10 HTTPS (Plesk, not win-acme)

Subdomain → **SSL/TLS Certificates** → **Let's Encrypt** → *Get it free* (secure the subdomain). Plesk installs and renews it.
The `ACME challenge` rule in `web.config` lets Let's Encrypt validate over HTTP. Optionally tick
**Hosting Settings → Permanent SEO-safe 301 redirect from HTTP to HTTPS** (the `web.config` already redirects).

Ports 80/443 are already open on a Plesk server; do **not** open 3000 or 5432.

### 20.11 Backups and updates

```powershell
schtasks /create /tn "GoldenWings Backup" /sc daily /st 03:00 /ru SYSTEM /rl HIGHEST /tr `
  "powershell -NoProfile -ExecutionPolicy Bypass -File C:\inetpub\vhosts\oneit.website\goldenwings.oneit.website\app\scripts\windows\backup.ps1 -BackupDir C:\goldenwings-backups"
```

Plesk's own backup does **not** include this PostgreSQL database — this task is what protects it. Copy
`C:\goldenwings-backups` off the server too (14.2).

Update to new code:

```powershell
cd C:\inetpub\vhosts\oneit.website\goldenwings.oneit.website\app
powershell -ExecutionPolicy Bypass -File scripts\windows\update.ps1 -Branch feature/dynamic-cms-admin -BackupDir C:\goldenwings-backups
```

### 20.12 Plesk-specific troubleshooting

| Symptom | Fix |
|---|---|
| Site 502/500 after a Plesk "Repair" or hosting-settings change | Plesk reset folder permissions. Restore the service's access: `$a="NT SERVICE\GoldenWings"; icacls "$GwHome\app" /grant "${a}:(OI)(CI)RX" /T /Q; icacls "$GwHome\app\.next" /grant "${a}:(OI)(CI)M" /T /Q; icacls "$GwHome\app\.env" /inheritance:r /grant:r "*S-1-5-32-544:F" "*S-1-5-18:F" "${a}:R"; Restart-Service GoldenWings` |
| Plesk shows its default page / 404 | Document root is not `httpdocs`, or Plesk overwrote `httpdocs\web.config` — copy it again (20.8) |
| Let's Encrypt in Plesk fails | DNS not pointing here yet, or `web.config` without the `ACME challenge` rule |
