"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect } from "react"
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

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

function transformApiResponseToChartData(apiResponse: CommitMetricItem[]) {
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

interface CommitMetricItem {
    DateString: `${number}-${number}`
    GitUserName: string
    CommitCount: number
    Year: number
    Month: number
    KeyId: string
    CommitDate: Date | string
}

interface CommitMetricUrl {
    // example: http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months
    RequestUrl: `http://${string}/repo/metric/commit?${string}` | `https://${string}/repo/metric/commit?${string}`
}


export function ShowChartFromRequest({
    RequestUrl
}: CommitMetricUrl) {
    /**
     * Entry point that wraps any Pie chart with api response fetching and error handling. The RequestUrl is expected to return a JSON array of CommitMetricItem objects.
     * @see transformApiResponseToChartData
     */
    const logPrefix = "/testing/<ShowChartFromRequest>:"
    const [apiResponse, setApiResponse] = useState<CommitMetricItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function loadRepoList() {
            try {
                setIsLoading(true)
                setErrorMessage(null)

                const data = await fetch(RequestUrl)
                if (!data.ok) {
                    throw new Error(`Request failed with status ${data.status}`)
                }

                const response: CommitMetricItem[] = await data.json()
                if (isMounted) {
                    const repoSummaryList = Array.isArray(response)
                        ? response
                        : Array.isArray(response)
                            ? response
                            : []

                    console.log(`${logPrefix} found ${repoSummaryList.length} items:`, repoSummaryList)

                    // const transformed = transformApiResponseToChartData(repoSummaryList)
                    setApiResponse(transformApiResponseToChartData(repoSummaryList))
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Unknown error")
                    setApiResponse([])
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadRepoList()

        return () => {
            isMounted = false
        }
    }, [])

    if (isLoading) {
        return (<><h1>Loading Metric...</h1></>)
    }

    if (errorMessage) {
        return (<><h1>Failed to load Metric</h1><p>{errorMessage}</p></>)
    }

    if (apiResponse.length === 0) {
        return (<><h1>No Metric found</h1></>)
    }

    return (
        <Pie data={apiResponse} />
    )
}


export default function Page() {
    /**
     * @summary this page is for testing individual components
     * */
    return (
        <>
            {PageHeaderContent()}
            <article>
                <section>
                    <h2>Import Chart.JS</h2>
                    <ShowChartFromRequest

                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months`} />
                </section>
                <section>
                    <h2>many</h2>

                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=burntsushi/ripgrep&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=junegunn/fzf&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=microsoft/vscode&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=microsoft/vscode-tmdl&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=powershell/psreadline&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=santisq/pstree&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=sharkdp/fd&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/emoji&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/ezout&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/helpout&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/obs-powershell&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/pssvg&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/roughdraft&since=6.months`} />
                    <ShowChartFromRequest
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=startautomating/ugit&since=6.months`} />
                </section>
            </article>
        </>
    )
}
