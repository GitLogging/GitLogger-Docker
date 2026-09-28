<#
.synopsis
    Build GitLogger-Docker, and run it
#>
param(

    [switch] $BuildOnly,
    [int] $Port = 3001
)
$Global:ImageName = 'gitlogger-docker'

if( docker ps -q ) {
    docker stop $( docker ps -q )
}
$error.clear()

if( $BuildOnly ) {
    docker build -t $ImageName .
    return
}
"using: ${Port}:${Port}" | Write-Host
docker build -t $ImageName . && docker run -it -p "${Port}:${Port}" $ImageName
