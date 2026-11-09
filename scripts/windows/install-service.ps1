<#
  Registers the website as the "GoldenWings" Windows service (starts with Windows, restarts if it crashes).
  Uses NSSM (https://nssm.cc), a small free service wrapper. Run once, as Administrator:

    powershell -ExecutionPolicy Bypass -File scripts\windows\install-service.ps1 -Nssm C:\tools\nssm\nssm.exe

  The app listens on 127.0.0.1 only; visitors reach it through IIS (docs/DEPLOY_WINDOWS.md, step 6).
#>
param(
  [Parameter(Mandatory = $true)][string]$Nssm,
  [string]$Service = "GoldenWings",
  [string]$AppDir = (Resolve-Path "$PSScriptRoot\..\..").Path,
  [int]$Port = 3000,
  [string]$LogDir = "D:\goldenwings-data\logs"
)
$ErrorActionPreference = "Stop"
if (-not (Test-Path $Nssm)) { throw "nssm.exe not found at $Nssm" }
if (-not (Test-Path (Join-Path $AppDir ".next\BUILD_ID"))) { throw "Build the site first: npm run build (in $AppDir)" }
$node = (Get-Command node -ErrorAction Stop).Source
New-Item -ItemType Directory -Force $LogDir | Out-Null

& $Nssm install $Service $node "node_modules\next\dist\bin\next" start -H 127.0.0.1 -p $Port
& $Nssm set $Service DisplayName "Golden Wings website"
& $Nssm set $Service Description "Golden Wings site and admin (Next.js + Payload). Settings in $AppDir\.env"
& $Nssm set $Service AppDirectory $AppDir
& $Nssm set $Service AppEnvironmentExtra "NODE_ENV=production"
& $Nssm set $Service Start SERVICE_AUTO_START
& $Nssm set $Service AppExit Default Restart
& $Nssm set $Service AppRestartDelay 5000
& $Nssm set $Service AppStdout (Join-Path $LogDir "site.log")
& $Nssm set $Service AppStderr (Join-Path $LogDir "site-error.log")
& $Nssm set $Service AppRotateFiles 1
& $Nssm set $Service AppRotateBytes 10485760
& $Nssm start $Service

Start-Sleep -Seconds 8
try {
  $r = Invoke-WebRequest "http://127.0.0.1:$Port/" -UseBasicParsing -TimeoutSec 60
  Write-Output "Service $Service is running: HTTP $($r.StatusCode) on 127.0.0.1:$Port"
} catch {
  Write-Warning "Service installed but the site did not answer yet. Check $LogDir\site-error.log"
}
