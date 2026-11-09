<#
  Updates the live site to the latest code. Run as Administrator from the app folder:

    powershell -ExecutionPolicy Bypass -File scripts\windows\update.ps1 -BackupDir D:\goldenwings-backups

  Steps: backup -> stop service -> pull code -> install packages -> apply database migrations -> build -> start.
  The site is offline for the few minutes this takes. Content, images and settings are untouched
  (they live in the database, MEDIA_DIR and .env, none of which git changes).
#>
param(
  [string]$Service = "GoldenWings",
  [string]$Branch = "main",
  [string]$BackupDir = "D:\goldenwings-backups"
)
$ErrorActionPreference = "Stop"
$AppDir = (Resolve-Path "$PSScriptRoot\..\..").Path
Set-Location $AppDir

function Step($name, [scriptblock]$cmd) {
  Write-Output "==> $name"
  & $cmd
  if ($LASTEXITCODE -ne 0) { throw "$name failed (exit code $LASTEXITCODE)" }
}

# A restorable copy before anything changes
& (Join-Path $PSScriptRoot "backup.ps1") -AppDir $AppDir -BackupDir $BackupDir

Step "Fetch code" { git fetch origin $Branch }
# Windows locks files in use (e.g. native image modules), so the site stops before packages are replaced
Write-Output "==> Stop service"
Stop-Service $Service
try {
  Step "Switch branch" { git checkout $Branch }
  Step "Update code" { git pull --ff-only origin $Branch }
  Step "Install packages" { npm ci }
  Step "Apply database migrations" { npm run migrate }
  Step "Build" { npm run build }
  # The build recreates .next; the service account needs write access there for its image cache
  Step "Permissions" { icacls (Join-Path $AppDir ".next") /grant "NT SERVICE\${Service}:(OI)(CI)M" /T /Q }
} finally {
  # Start again even after a failure: on an error before the build, the previous build is still in place
  Write-Output "==> Start service"
  Start-Service $Service
}
Write-Output "Update finished."
