<#
.synopsis
    Build GitLogger-Docker, and run it
#>
param(

    [switch] $BuildOnly
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
docker build -t $ImageName . && docker run -it -p 3001:3001 $ImageName
