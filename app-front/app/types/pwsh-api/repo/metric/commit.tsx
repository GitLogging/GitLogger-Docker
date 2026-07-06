export interface CommitMetricUrl {
    /**
     * @see CommitMetricItem
     * @example http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months
     */
    RequestUrl: `http://${string}/repo/metric/commit?${string}` | `https://${string}/repo/metric/commit?${string}`
}
export interface CommitMetricItem {
    /**
     * @summary records from the api endpoint: http://127.0.0.1:3001/repo/list
     * @see CommitMetricUrl
     */
    DateString: `${number}-${number}`
    GitUserName: string
    CommitCount: number
    Year: number
    Month: number
    KeyId: string
    CommitDate: Date | string
}

