<#
.synopsis
    Build GitLogger-Docker, and run it
#>
param(
    [switch] $BuildOnly,
    [switch] $CopyGitServeDev,
    [int] $HTTPPort=3003,
    [int] $PwshPort=3001
)
$Global:ImageName = 'gitlogger-docker'


# stop existing containers
if( docker ps -q ) {
    docker stop $( docker ps -q )
}
$error.clear()

#region CopyGitServe Dev Build
if( $CopyGitServeDev ) {
    $GitServeModuleDest = Join-Path $PSScriptRoot './pwsh-modules/GitServe'
    Remove-Item -force -Recurse -ea 'ignore' $GitServeModuleDest

    $GitServeDevSrc = Get-Item 'C:/data/myGit/GitServed/BuildOutput'
    copy-item $GitServeDevSrc $GitServeModuleDest -Recurse
    'Copied latest version of gitserve' | Write-Host -fore green
}
#endregion CopyGitServe Dev Build

if( $BuildOnly ) {
    docker build -t $ImageName .
    return
}
"using ports => Http: ${HttpPort}, Pwsh: ${PwshPort}" | Write-Host

Pansies\New-Hyperlink -Uri "http://127.0.0.1:${PwshPort}:${PwshPort}" -Obj 'Pwsh'
Pansies\New-Hyperlink -Uri "http://127.0.0.1:${HttpPort}:${HttpPort}" -Obj 'Http'

docker build -t $ImageName . && docker run -it `
    --publish "127.0.0.1:${PwshPort}:${PwshPort}" `
    --publish "127.0.0.1:${HTTPPort}:${HTTPPort}" `
    $ImageName

# was:
# -p "${Port}:${Port}" $ImageName
