<#
.synopsis
    Build GitLogger-Docker, and run it
#>
param(
    [switch] $BuildOnly,
    [switch] $CopyGitServeDev
    # [int] $Port = 3001
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
"using: ports 3001, 3003" | Write-Host
docker build -t $ImageName . && docker run -it `
    --publish 127.0.0.1:3001:3001 `
    --publish 127.0.0.1:3003:3003 `
    $ImageName

# was:
# -p "${Port}:${Port}" $ImageName
