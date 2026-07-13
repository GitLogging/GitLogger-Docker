import { Line } from "react-chartjs-2"
import { CommitMetricUrl, CommitMetricItem, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
import { useEffect, useState } from "react"

export function FlatLineChart({ RequestUrl }: { RequestUrl: CommitMetricUrl }) {
    /**
     * Entry point for simple line chart
     */

    const logPrefix = "/testing/commits_by_user/<ShowChartFromRequest>:"
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
                    setApiResponse(MetricCommitToChartData(repoSummaryList))
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
        console.warn(`deprecated`)
    }

    if (errorMessage) {
        return (<><h1>Failed to load Metric</h1><p>{errorMessage}</p></>)
    }

    if (!apiResponse || apiResponse.length === 0) {
        return (<><h1>No Metric found</h1></>)
    }

    return (
        <>
            <div>chart here</div>
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



