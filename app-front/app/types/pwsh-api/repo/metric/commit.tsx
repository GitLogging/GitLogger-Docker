export interface CommitMetricUrl {
    /**
     * @summary Validate urls for the `GitServe` route `/repo/metric/commit`
     * @see CommitMetricItem
     * @example http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months
     */
    RequestUrl: `http://${string}/repo/metric/commit?${string}` | `https://${string}/repo/metric/commit?${string}`
}
export interface CommitMetricItem {
    /**
     * @summary response records from the api endpoint: http://127.0.0.1:3001/repo/list
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

const defaultColors = {
    backgroundColor: [
        'rgba(255, 99, 132, 0.2)',
        'rgba(54, 162, 235, 0.2)',
        'rgba(255, 206, 86, 0.2)',
        'rgba(75, 192, 192, 0.2)',
        'rgba(153, 102, 255, 0.2)',
        'rgba(255, 159, 64, 0.2)',
    ],
    borderColor: [
        'rgba(255, 99, 132, 1)',
        'rgba(54, 162, 235, 1)',
        'rgba(255, 206, 86, 1)',
        'rgba(75, 192, 192, 1)',
        'rgba(153, 102, 255, 1)',
        'rgba(255, 159, 64, 1)',
    ],
}

export function MetricCommitToChartData(apiResponse: CommitMetricItem[]) {
    /**
     * @summary transforms API response into this specific chart type
     * @see ShowChartFromRequest
     */
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" })
    const labels = apiResponse.map(
        item => `${monthFormatter.format(new Date(item.CommitDate))}`)
    const rawData = apiResponse.map(
        item => item.CommitCount)

    const data = {
        labels: labels,
        datasets: [
            {
                label: 'Commits By Month',
                data: rawData,
                backgroundColor: defaultColors.backgroundColor,
                borderColor: defaultColors.borderColor,
                borderWidth: 1,
            },
        ],
    }
    console.log(apiResponse, "transformed to chart data:", data)
    return data
}