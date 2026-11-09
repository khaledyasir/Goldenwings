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
# Backups contain every booking and customer detail: only Administrators (S-1-5-32-544) and SYSTEM (S-1-5-18).
# SIDs instead of names because group names are translated on non-English Windows.
icacls $BackupDir /inheritance:r /grant:r "*S-1-5-32-544:(OI)(CI)F" "*S-1-5-18:(OI)(CI)F" | Out-Null
if ($LASTEXITCODE -ne 0) { throw "Could not restrict permissions on $BackupDir" }
$stamp = Get-Date -Format "yyyy-MM-dd_HHmm"

# 1) Database (custom format: compressed, restorable with pg_restore).
# The password goes through PGPASSWORD, not the command line, where other local users could read it.
$db = [System.Uri]$vars["DATABASE_URL"]
$user, $pass = $db.UserInfo -split ":", 2
$port = if ($db.Port -gt 0) { $db.Port } else { 5432 }
$env:PGPASSWORD = [System.Uri]::UnescapeDataString("$pass")
try {
  $dump = Join-Path $BackupDir "db_$stamp.dump"
  & (Join-Path $PgBin "pg_dump.exe") --format=custom --no-owner --file="$dump" `
    --host=$($db.Host) --port=$port --username=$([System.Uri]::UnescapeDataString($user)) --dbname=$($db.AbsolutePath.TrimStart('/'))
  if ($LASTEXITCODE -ne 0) { throw "pg_dump failed with exit code $LASTEXITCODE" }
} finally {
  Remove-Item Env:PGPASSWORD -ErrorAction SilentlyContinue
}

# 2) Uploaded images
if ((Test-Path $mediaDir) -and (Get-ChildItem $mediaDir -File -Recurse | Select-Object -First 1)) {
  Compress-Archive -Path (Join-Path $mediaDir "*") -DestinationPath (Join-Path $BackupDir "media_$stamp.zip") -Force
}

# 3) Retention
Get-ChildItem $BackupDir -File |
  Where-Object { $_.Name -match '^(db|media)_' -and $_.LastWriteTime -lt (Get-Date).AddDays(-$KeepDays) } |
  Remove-Item -Force

Write-Output "Backup done: $BackupDir ($stamp)"
