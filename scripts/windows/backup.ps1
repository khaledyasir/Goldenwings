<#
  Golden Wings backup: database dump + uploaded images. Keeps the last 14 days.
  Run daily from Task Scheduler (docs/DEPLOY_WINDOWS.md, step 9), and automatically before every update.

    powershell -ExecutionPolicy Bypass -File scripts\windows\backup.ps1 -BackupDir D:\goldenwings-backups

  Restore: see docs/DEPLOY_WINDOWS.md ("Restoring a backup").
#>
param(
  [string]$AppDir = (Resolve-Path "$PSScriptRoot\..\..").Path,
  [string]$BackupDir = "D:\goldenwings-backups",
  # Folder holding pg_dump.exe; found automatically under C:\Program Files\PostgreSQL when empty
  [string]$PgBin = "",
  [int]$KeepDays = 14
)
$ErrorActionPreference = "Stop"

# Settings come from the app's .env so there is one place to change them
$envFile = Join-Path $AppDir ".env"
if (-not (Test-Path $envFile)) { throw "Not found: $envFile" }
$vars = @{}
foreach ($line in Get-Content $envFile) {
  if ($line -match '^\s*([A-Za-z_][A-Za-z0-9_]*)\s*=\s*(.*?)\s*$') { $vars[$Matches[1]] = $Matches[2].Trim('"') }
}
if (-not $vars["DATABASE_URL"]) { throw "DATABASE_URL is missing in $envFile" }
$mediaDir = if ($vars["MEDIA_DIR"]) { $vars["MEDIA_DIR"] } else { Join-Path $AppDir "media" }

if (-not $PgBin) {
  $found = Get-ChildItem "C:\Program Files\PostgreSQL\*\bin\pg_dump.exe" -ErrorAction SilentlyContinue |
    Sort-Object { [int]($_.FullName -replace '.*PostgreSQL\\(\d+).*', '$1') } -Descending | Select-Object -First 1
  if (-not $found) { throw "pg_dump.exe not found; pass -PgBin 'C:\Program Files\PostgreSQL\17\bin'" }
  $PgBin = $found.DirectoryName
}

New-Item -ItemType Directory -Force $BackupDir | Out-Null
$stamp = Get-Date -Format "yyyy-MM-dd_HHmm"

# 1) Database (custom format: compressed, restorable with pg_restore)
$dump = Join-Path $BackupDir "db_$stamp.dump"
& (Join-Path $PgBin "pg_dump.exe") --format=custom --no-owner --file="$dump" --dbname="$($vars['DATABASE_URL'])"
if ($LASTEXITCODE -ne 0) { throw "pg_dump failed with exit code $LASTEXITCODE" }

# 2) Uploaded images
if ((Test-Path $mediaDir) -and (Get-ChildItem $mediaDir -File -Recurse | Select-Object -First 1)) {
  Compress-Archive -Path (Join-Path $mediaDir "*") -DestinationPath (Join-Path $BackupDir "media_$stamp.zip") -Force
}

# 3) Retention
Get-ChildItem $BackupDir -File |
  Where-Object { $_.Name -match '^(db|media)_' -and $_.LastWriteTime -lt (Get-Date).AddDays(-$KeepDays) } |
  Remove-Item -Force

Write-Output "Backup done: $BackupDir ($stamp)"
