"use client"
import { CommitMetricUrl, CommitMetricItem, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
import { useEffect, useState } from "react"
import { Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js'

// import { PageHeaderContent } from "@/app/components/PageHeaderContent"

/**
 * @summary this file is an example that supports changing the axis / aka key-value pairs with different properties
 */

ChartJS.register(LineElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend)

const DemoResponse1 = `
[
  {
    "DateString": "2026-06",
    "GitUserName": "Micha Reiser",
    "CommitCount": 2,
    "Year": 2026,
    "Month": 6,
    "KeyId": "2026-06_Micha Reiser",
    "CommitDate": "2026-06-04T07:19:52-05:00"
  },
  {
    "DateString": "2026-06",
    "GitUserName": "Jorge Gomez",
    "CommitCount": 1,
    "Year": 2026,
    "Month": 6,
    "KeyId": "2026-06_Jorge Gomez",
    "CommitDate": "2026-06-21T07:48:16-05:00"
  },
  {
    "DateString": "2026-02",
    "GitUserName": "Andrew Gallant",
    "CommitCount": 3,
    "Year": 2026,
    "Month": 2,
    "KeyId": "2026-02_Andrew Gallant",
    "CommitDate": "2026-02-05T06:03:03-05:00"
  },
  {
    "DateString": "2026-02",
    "GitUserName": "Andrew Gallant",
    "CommitCount": 2,
    "Year": 2026,
    "Month": 2,
    "KeyId": "2026-02_Andrew Gallant",
    "CommitDate": "2026-02-26T07:32:43-05:00"
  }
]
`
export function DemoMetricToChartData(apiResponse: CommitMetricItem[]) {
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
                // backgroundColor: defaultColors.backgroundColor,
                // borderColor: defaultColors.borderColor,
                borderWidth: 1,
            },
        ],
    }
    console.log(apiResponse, "transformed to chart data:", data)
    return data
}

export function DemoFlatLineChart({ RequestUrl }: { RequestUrl: CommitMetricUrl }) {
    /**
     * Entry point for simple line chart
     */

    const logPrefix = "/testing/generic_multiple_dataset_transform/<DemoFlatLineChart>:"
    const [apiResponse, setApiResponse] = useState<CommitMetricItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function loadRepoList() {
            try {
                setIsLoading(true)
                setErrorMessage(null)

                // const data = await fetch(RequestUrl)
                const data = JSON.parse(DemoResponse1)

                // if (!data.ok) {
                //     throw new Error(`Request failed with status ${data.status}`)
                // }
                // const response: CommitMetricItem[] = await data.json()
                const response: CommitMetricItem[] = data
                if (isMounted) {
                    // const repoSummaryList = Array.isArray(response)
                    //     ? response
                    //     : Array.isArray(response)
                    //         ? response
                    //         : []

                    const transformedResponse = DemoMetricToChartData(data)

                    console.log(`${logPrefix} response ${response.length} items:`, response)
                    console.log(`${logPrefix} transformedResponse:`, transformedResponse)

                    // original:
                    // setApiResponse(MetricCommitToChartData(repoSummaryList))
                    // setApiResponse(DemoMetricToChartData(repoSummaryList))
                    setApiResponse(transformedResponse)
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
        // return null
        return (<><h1>Loading Metric...</h1></>)
    }

    if (errorMessage) {
        return (<><h1>Failed to load Metric</h1><p>{errorMessage}</p></>)
    }

    if (!apiResponse || apiResponse.length === 0) {
        return (<><h1>No Metric found</h1></>)
    }

    return (
        <>
            <h2>Hard coded json used to test multiple dataset transforms with named properties</h2>
            <Line
                data={apiResponse}
            //
            />
        </>
    )
    // return (
    //     <>
    //         <div>chart here</div>
    //         {/* <Line data={data} /> */}
    //         {/* key={name.key}
    //             RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=${name.name}&since=${since}`} /> */}
    //     </>
    // )
}
export default function Page() {
    return (

        <>
            <h2>Inline demo</h2>
            <DemoFlatLineChart RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months" />
        </>

    )

}


