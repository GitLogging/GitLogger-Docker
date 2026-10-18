param(
    # by default this script limits node's max memory. If this switch is true, no limit is used.
    [switch] $WithoutLimitMemory,
    [int] $MaxLimitSize = 4096
)
if( $WithoutLimitMemory ) {
    $ENV:NODE_OPTIONS = $Null
} else {
    # force NODE max memory limits, to catch issues if vite or next have an OOM leak
    $ENV:NODE_OPTIONS="--max-old-space-size=${MaxLimitSize}"
    'using ENV:NODE_OPTIONS = {0}' -f $ENV:NODE_OPTIONS | Write-Host -fg 'blue'
}

$WorkspaceRun = Get-Item $PSCommandPath
pushd -ea 'ignore' (Join-Path $PSScriptRoot './app-front')
# 'http://127.0.0.1:3000' | Write-Host -fg 'orange'
pnpm run dev

<# Start-Process -FilePath 'http://127.0.0.1:3000' && #>
