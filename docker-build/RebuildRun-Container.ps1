<#
.SYNOPSIS
    stop all containers, rebuild, open url, then run
.EXAMPLE
    # defaults
    .\docker-rebuild-run.ps1

    # open Url plus shell mode
    .\docker-rebuild-run.ps1 -AutoOpenUrl http://127.0.0.1:3001/repos/list -InteractiveMode

    # skip entering shell
    .\docker-rebuild-run.ps1 -AutoOpenUrl http://127.0.0.1:3001/repos/list

.EXAMPLE
    manually using interactive mode:
    docker run --interactive --tty --publish 127.0.0.1:3001:3001 $ImageName
.notes
# 1-liner for REPL to stop, rebuild, open browser, and run it:

if( docker ps -q ) { docker stop $( docker ps -q ) } ; docker build -t $ImageName . && (start-process -FilePath 'http://127.0.0.1:3001') && docker run -it --publish 127.0.0.1:3001:3001 $ImageName # stop all containers, rebuild, open url, then run
#>
param(
    [ArgumentCompletions(
        'http://127.0.0.1:3001/repo/list',
        'http://127.0.0.1:3001',
        'http://127.0.0.1:3001/repo/clone?url=https://github.com/BurntSushi/ripgrep.git'
    )]
    [string[]] $AutoOpenUrl = 'http://127.0.0.1:3001/repo/list',

    [string] $ImageName = 'gitlogger-docker',

    # runs: docker -it
    [switch] $InteractiveMode
)
$script:ImageName = $ImageName

"Stopping all running containers..." | Write-Host -fg 'green'
if( docker ps -q ) {
    docker stop $( docker ps -q )
}

# clone repo to a subdir
$gitServeModule = Join-Path $PSScriptRoot './../app-gitserve'
if( -not (Test-Path $gitServeModule  )) {
    git clone https://github.com/ninmonkey/GitServed.git 'app-gitserve'
}
if( Test-Path $gitServeModule ) {
    git -C $gitServeModule pull
}
# only launch if build has no errors.
# --tty allows caller to ctrl+c to kill it.
# note: the extra '@()' is intentional, it allows the '&& operators' to chain a nested expression

( $MyId =
    docker run `
        --interactive `
        --publish 127.0.0.1:3000:3000 `
        -w /app --mount "type=bind,src=.,target=/app" `
        'gitlogger-docker'
)

# '-v', 'H:\RootClonedRepos'

docker build -t $ImageName . &&
    (
        @( foreach( $url in $AutoOpenUrl ) {
            "Opening URL: ${url}" | Write-Host -fg 'magenta'
            start-process -FilePath $Url
        })
    ) && (
        @( if( $InteractiveMode ) {
            docker run --interactive --tty `
                --publish 127.0.0.1:3001:3001 `
                -v cloned-repos:h:\RootClonedRepos `
                -w /app --mount "type=bind,src=.,target=/app" `
                $ImageName
            # docker run --interactive --tty --publish 127.0.0.1:3001:3001 $ImageName
            # $entryPoint = "/bin/pwsh","-noexit", "-file","/app/server-run.ps1"
            # docker run -interactive --tty --publish 127.0.0.1:3001:3001 $ImageName @entryPoint
        } else {
            docker run --tty --rm `
                --publish 127.0.0.1:3001:3001
                -w /app --mount "type=bind,src=.,target=/app" `
                -v cloned-repos:h:/RootClonedRepos `
                $ImageName
        })
    )

"`aBuild Complete! ImageName: ${ImageName}" | Write-Host -fg 'green'
