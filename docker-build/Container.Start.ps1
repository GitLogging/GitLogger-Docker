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
$toDot = Get-Item -ea stop ( Join-Path $PSScriptRoot 'server-routing.ps1' )
. $toDot -PortNumber $PortNumber -HostName $HostName

$ServerEndTime = [Datetime]::Now - $ServerStartTime
"{$LogName}: Done! $( '{0:n2} secs' -f $ServerEndTime.TotalSeconds )" | Write-Host

"exit => '$( $MyInvocation.MyCommand.Name )'" | Write-Host

pushd $gitServeModule = Join-Path $PSScriptPath '../app-gitserve'
ipmo $gitServeModule -PassThru -Force -Verbose; GitServe.Start -PSHost -Port 3001
