"use client"
import { CommitMetricUrl, CommitMetricItem, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
import { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, BarElement } from 'chart.js'

// import { PageHeaderContent } from "@/app/components/PageHeaderContent"

/**
 * @summary this file is an example that supports changing the axis / aka key-value pairs with different properties
 */

ChartJS.register(BarElement, LineElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend)

export function DemoMetricToChartData(apiResponse: CommitMetricItem[]) {
    /**
     * @summary transforms API response into this specific chart type
     * @see ShowChartFromRequest
     */
    const monthFormatter = new Intl.DateTimeFormat("en-US", { month: "long" })
    const labels = apiResponse.map(
        item => `${monthFormatter.format(new Date(item.CommitDate))}`)
    // const rawData = apiResponse.map(
    //     item => item.CommitCount)
    const rawData = apiResponse


    const datasets = [
        {
            label: 'Set1',
            data: rawData,
            // backgroundColor: defaultColors.backgroundColor,
            // borderColor: defaultColors.borderColor,
            borderWidth: 1,
        },
    ]

    const data = {
        type: 'line',
        options: {
            parsing: {
                xAxisKey: 'Date',
                yAxisKey: 'CommitCount'
            }
        },
        // labels: labels,
        datasets: datasets,
    }
    console.log(apiResponse, "transformed to chart data:", data)
    return data
}

export function DemoFlatLineChart({ RequestUrl }: { RequestUrl: CommitMetricUrl }) {
    /**
     * Create a chart, and link the source JSON. displays status during load, and/or errors
     */

    const logPrefix = "/testing/generic_multiple_dataset_transform/<DemoFlatLineChart>:"
    const [apiResponse, setApiResponse] = useState<CommitMetricItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [detailsJson, setDetailsJson] = useState('')

    useEffect(() => {
        let isMounted = true

        async function loadApiResponse() {
            try {
                setIsLoading(true)
                setErrorMessage(null)
                // const data = await fetch(RequestUrl)
                // const data = JSON.parse(DemoResponse1)
                const data = await fetch(RequestUrl)
                if (!data.ok) {
                    throw new Error(`Request failed with status ${data.status}`)
                }
                // const response: CommitMetricItem[] = await data.json()
                const response: CommitMetricItem[] = await data.json()
                if (isMounted) {
                    const transformedResponse = DemoMetricToChartData(response)

                    console.log(`${logPrefix} response ${response.length} items:`, response)
                    console.log(`${logPrefix} transformedResponse:`, transformedResponse)

                    // original:
                    // setApiResponse(MetricCommitToChartData(repoSummaryList))
                    // setApiResponse(DemoMetricToChartData(repoSummaryList))
                    setApiResponse(transformedResponse)

                    const allJson = transformedResponse
                    const dataSet1 = transformedResponse.datasets[0]
                    const jsonDepth = 2
                    const jsonString1 = JSON.stringify(allJson, null, jsonDepth)
                    const jsonString2 = JSON.stringify(dataSet1, null, jsonDepth)
                    setDetailsJson(jsonString1)
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

        loadApiResponse()

        return () => {
            isMounted = false
        }
    }, [])

    if (isLoading) {
        // return null
        return (<><h1>Loading Metric...</h1></>)
    }

    if (errorMessage) {
        return (<><h1>Failed to load Metric</h1><p>{errorMessage}</p></>)
    }

    if (!apiResponse || apiResponse.length === 0) {
        return (<><h1>No Metric found</h1></>)
    }
    const usingLineChart = false
    const chartElem =
        usingLineChart
            ? <Line data={apiResponse} />
            : <Bar data={apiResponse} />


    return (
        <>
            <section className="chart__with__details">
                {chartElem}
                <a href={RequestUrl}>View Request</a>
                <details open>
                    <summary>Dataset 1</summary>
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
                <DemoFlatLineChart
                    RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months"
                />

            </article>
        </>

    )

}


