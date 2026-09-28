<#
.synopsis
    Build GitLogger-Docker, and run it
#>
param(

    [switch] $BuildOnly
    # [int] $Port = 3001
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
"using: ports 3001, 3003" | Write-Host
docker build -t $ImageName . && docker run -it `
    --publish 127.0.0.1:3001:3001 `
    --publish 127.0.0.1:3003:3003 `
    $ImageName

# was:
# -p "${Port}:${Port}" $ImageName
