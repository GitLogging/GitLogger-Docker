$script:ImageName = 'gitlogger-docker'

docker build -t $ImageName .

# if( $MyId ) {
#     docker stop $MyId ;
#     $MyId = $Null
# }

# ( $MyId = docker run `
#     --detach `
#     --publish 127.0.0.1:3000:3000 `
#     $ImageName
# )

"`aBuilt Complete! Id: ${MyId}" | Write-Host -fg 'green'

# && start 'http://127.0.0.1:3000' ;
