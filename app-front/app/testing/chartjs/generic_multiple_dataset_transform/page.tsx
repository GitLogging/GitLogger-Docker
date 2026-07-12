"use client"
import { CommitMetricUrl, CommitMetricItem, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
import { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, BarElement, ChartData, ChartOptions } from 'chart.js'

// import { PageHeaderContent } from "@/app/components/PageHeaderContent"

/**
 * @summary this file is an example that supports changing the axis / aka key-value pairs with different properties
 */

ChartJS.register(BarElement, LineElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend)

function parseRequestUrl(url: string): { name?: string; since?: string; owner?: string; repo?: string; metric?: string } {
    /**
     * @summary parses the request URL to extract relevant query parameters and path segments
     * @param url - the request URL to parse
     * @returns an object containing the extracted metadata (name, since, owner, repo, metric)
     * @example const { name, since } = parseRequestUrl( url )
     */
    try {
        const urlObj = new URL(url)
        const name = urlObj.searchParams.get('name') || undefined
        const since = urlObj.searchParams.get('since') || undefined

        // Extract owner and repo from name (e.g., "BurntSushi/ripgrep")
        let owner: string | undefined
        let repo: string | undefined
        if (name) {
            const [ownerPart, repoPart] = name.split('/')
            owner = ownerPart || undefined
            repo = repoPart || undefined
        }

        // Extract metric from path (e.g., "/repo/metric/commit" -> "commit")
        const pathParts = urlObj.pathname.split('/').filter(Boolean)
        const metric = pathParts[pathParts.length - 1] || undefined

        return { name, since, owner, repo, metric }
    } catch {
        return {}
    }
}

function formatDatasetLabel(url: string): string {
    /**
     * @summary formats the dataset label based on the request URL
     * @param url - the request URL containing query parameters for the dataset
     * @returns a formatted label string for the dataset based on the request URL
     */
    const { name, since } = parseRequestUrl(url)
    if (!name && !since) return 'Dataset'
    if (!name) return `Since ${since?.replace('.', ' ')}`
    if (!since) return name
    return `${name} since ${since.replace('.', ' ')}`
}

export function DemoMetricToChartData(apiResponse: CommitMetricItem[], requestUrl: string): { data: ChartData<'bar'>, options: ChartOptions<'bar'> } {
    /**
     * @summary transforms API response into this specific chart type
    * @see https://www.chartjs.org/docs/latest/api/#charttype
    * @see https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units
     */


    // Sort by CommitDate
    const sortedData = [...apiResponse].sort((a, b) =>
        new Date(a.CommitDate).getTime() - new Date(b.CommitDate).getTime()
    )

    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" })
    const labels = sortedData.map(
        item => `${monthFormatter.format(new Date(item.CommitDate))}`)

    const datasets = [
        {
            label: formatDatasetLabel(requestUrl),
            data: sortedData,
            borderWidth: 2,
            backgroundColor: 'rgba(75, 192, 192, 0.5)',
            borderColor: 'rgba(75, 192, 192, 1)',
        },
    ]

    const data: ChartData<'bar'> = {
        // labels: labels,
        datasets: datasets,
    }

    const options: ChartOptions<'bar'> = {
        parsing: {
            // xAxisKey: 'CommitDate',
            xAxisKey: 'Date',
            yAxisKey: 'CommitCount'
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
        }
    }

    console.log(apiResponse, "transformed to chart data:", data)
    return { data, options }
}

export function DemoFlatBarChart({ RequestUrl }: { RequestUrl: CommitMetricUrl }) {
    /**
     * Create a chart, and link the source JSON. displays status during load, and/or errors
     */

    const logPrefix = "/testing/generic_multiple_dataset_transform/<DemoFlatLineChart>:"
    const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null)
    const [chartOptions, setChartOptions] = useState<ChartOptions<'bar'> | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [detailsJson, setDetailsJson] = useState('')

    useEffect(() => {
        let isMounted = true

        async function loadApiResponse() {
            try {
                setIsLoading(true)
                setErrorMessage(null)
                const data = await fetch(RequestUrl)
                if (!data.ok) {
                    throw new Error(`Request failed with status ${data.status}`)
                }
                const response: CommitMetricItem[] = await data.json()
                if (isMounted) {
                    const { data: transformedData, options: transformedOptions } = DemoMetricToChartData(response, RequestUrl)

                    console.group(logPrefix)
                    console.log(`${logPrefix} parsedRequestUrl:`, parseRequestUrl(RequestUrl))
                    console.log(`${logPrefix} response ${response.length} items:`, response)
                    console.log(`${logPrefix} transformedData:`, transformedData)
                    console.log(`${logPrefix} transformedOptions:`, transformedOptions)
                    console.groupEnd()

                    setChartData(transformedData)
                    setChartOptions(transformedOptions)

                    const jsonString = JSON.stringify(transformedData, null, 2)
                    setDetailsJson(jsonString)
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Unknown error")
                    setChartData(null)
                    setChartOptions(null)
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadApiResponse()

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

    if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
        return (<><h1>No Metric found</h1></>)
    }

    const usingLineChart = false
    // const chartElem =
    //     usingLineChart
    //         ? <Line data={chartData} options={chartOptions} />
    //         : <Bar data={chartData} options={chartOptions} />
    const chartElem = <Bar data={chartData} options={chartOptions} />

    return (
        <>
            <section className="chart__with__details">
                {chartElem}
                <a href={RequestUrl}>View Request</a>
                <details>
                    <summary>Dataset</summary>
                    <pre>{detailsJson}</pre>
                </details>
            </section>
        </>
    )
}
export default function Page() {
    return (

        <>
            <article>
                <DemoFlatBarChart
                    RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months"
                />
                <DemoFlatBarChart
                    RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=12.months"
                />

            </article>
        </>

    )

}


