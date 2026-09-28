$splat = @{
    RetryIntervalSec = 1
    MaximumRetryCount = 1
}
# ($lastIrm = irm '127.0.0.1:3001/repo/list' ) | Ft

irm '127.0.0.1:3003/repo/list' @splat
irm '127.0.0.1:3001/repo/list' @splat
irm '127.0.0.1:3000/repo/list' @splat
