<#
.SYNOPSIS
    Entry point to setup and start a pure PowerShell web server
.DESCRIPTION
    Entry point for docker or user to run as the start command.
.NOTES
    It can call a specific implementation like 'server-routing.ps1' or node

.EXAMPLE
    # start server:
    server-run.ps1 -Port 1234 -HostName 127.0.0.1

    # stop server:
    server-stop.ps1
#>
param(
    [int] $PortNumber = $(
        $ENV:PWSH_PORT ?? 3001
    ),
    [string] $HostName = $(
        $ENV:PWSH_HOST ?? '127.0.0.1'
    )
)
$LogName = (Get-Item $PSCommandPath).Name
$ServerStartTime = [Datetime]::Now

"${LogName}: Started: ${ServerStartTime}, Path: ${PSScriptRoot}" | Write-Host

"enter => '$( $MyInvocation.MyCommand.Name )'" | Write-Host

# log env vars and configuration
Get-ChildItem env:\
    | ? Name -in 'PWSH_PORT', 'PWSH_HOST'
    | Join-String { "$( $_.Key ) = $( $_.Value )" } -op 'Env Vars: ' -sep ', '
    | write-host

# . (Get-Item (Join-Path $PSScriptRoot 'server-stop.ps1'))

@{
    Port       = $PortNumber
    ServerName = $HostName
}
    | ConvertTo-Json
    | Write-Host

# Invoke implementation
$ServerEndTime = [Datetime]::Now - $ServerStartTime
"{$LogName}: Import and start! $( '{0:n2} secs' -f $ServerEndTime.TotalSeconds )" | Write-Host

# was: ipmo /app-gitserve/GitServe.psd1 -PassThru -Verbose:$false

$Env:PSModulePath = $Env:PSModulePath += ':/pwsh-modules'

# somewhere in server-run.ps1, or a dedicated script
# next start defaults to binding 127.0.0.1 only, which Docker's published ports
# cannot reach from outside the container. Force it to listen on all interfaces.
# $nextHostName = $ENV:HOSTNAME ?? '0.0.0.0'
$nextHostName = '0.0.0.0'
$nextPort     = $ENV:PORT ?? 3003

# good command: pnpm run start -H 0.0.0.0 -p 3003
# pnpm run start -H 0.0.0.0 -p 3003
pnpm run start -H '0.0.0.0' -p 3003 &

# $nextProc = Start-Process -FilePath 'pnpm' `
#     -ArgumentList 'run', 'start', '--', '-H', $nextHostName, '-p', $nextPort `
#     -WorkingDirectory '/app-front' `
#     -NoNewWindow -PassThru `
#     -RedirectStandardOutput 'pnpm-stdout.log' `
#     -RedirectStandardError 'pnpm-stderr.log'

# if this is the only thing keeping the container alive:
if( $true ) {
    'waiting for process to end...' | write-host
    # Wait-Process -Id $nextProc.Id
}

if( $true ) {
    'skipping gitserve' | write-host
    # Import-Module GitServe -force -Passthru -DisableNameChecking -ea 'stop'
    Import-Module GitServe -force -Passthru -DisableNameChecking -ea 'stop'
    # GitServe.Start -PSHost -Port $PortNumber
    GitServe.Start -PSHost -HostName $ENV:PWSH_HOST -Port $ENV:PWSH_PORT
}


# $toDot = Get-Item -ea stop ( Join-Path $PSScriptRoot 'server-routing.ps1' )
# . $toDot -PortNumber $PortNumber -HostName $HostName

$ServerEndTime = [Datetime]::Now - $ServerStartTime
"{$LogName}: Done! $( '{0:n2} secs' -f $ServerEndTime.TotalSeconds )" | Write-Host

# Start-Sleep 2000
"exit => '$( $MyInvocation.MyCommand.Name )'" | Write-Host
