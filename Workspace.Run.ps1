$WorkspaceRun = Get-Item $PSCommandPath
pushd -ea 'ignore' (Join-Path $PSScriptRoot './app-front')
pwd
'http://127.0.0.1:3000' | Write-Host -fg 'orange'
pnpm run dev

<# Start-Process -FilePath 'http://127.0.0.1:3000' && #>
