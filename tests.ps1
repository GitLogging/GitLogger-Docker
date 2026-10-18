$splat = @{
    RetryIntervalSec = 1
    MaximumRetryCount = 1
}

irm 127.0.0.1:3003
( $lastIrm = irm '127.0.0.1:3001/repo/list' ) | Ft

irm 'http://127.0.0.1:3001/repo/Clone?url=https://github.com/BurntSushi/ripgrep.git'
