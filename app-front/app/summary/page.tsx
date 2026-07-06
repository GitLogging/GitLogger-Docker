"use client"
import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { InputGroup, Form, Button } from "react-bootstrap"
import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
import { CommitMetricItem, CommitMetricUrl, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
import { FlatLineChart } from "@/app/components/charts/FlatLineChart"

/* section: Chart.js imports and rendering */
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale } from 'chart.js'
import { Line } from 'react-chartjs-2'

ChartJS.register(LineElement, CategoryScale, PointElement, LinearScale, Title, Tooltip, Legend)

function ShowSingleSummary({ RepoName }) {
    /**
     * @summary shows a single summary record for `<SummaryContainer>`
     */
    const since = `4.months`
    const requestUrl = `http://127.0.0.1:3001/repo/metric/commit?name=${RepoName}&since=${since}`

    const logPrefix = "/summary/page.tsx/<ShowSingleSummary>:"
    const [apiResponse, setApiResponse] = useState<CommitMetricItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function loadRepoList() {
            try {
                setIsLoading(true)
                setErrorMessage(null)

                const data = await fetch(requestUrl)
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
        return null
        // return (<><h1>Loading Metric...</h1></>)
    }

    if (errorMessage) {
        return (<><h1>Failed to load Metric</h1><p>{errorMessage}</p></>)
    }

    if (!apiResponse || apiResponse.length === 0) {
        return (<><h1>No Metric found</h1></>)
    }

    return (
        <Line data={apiResponse} />
    )

    return (
        <>
            <div><strong>Owner:</strong> {RepoName}</div>
            <FlatLineChart RequestUrl={requestUrl} />
        </>
    )
}

function SummaryContainer() {
    return (
        <>
            <section>
                <h2>Select Repository</h2>
                <RepoListNamePicker />
            </section>

            <section>
                <ShowSingleSummary
                    RepoName={"microsoft/vscode-tmdl"}
                />
                <ShowSingleSummary
                    RepoName={"santisq/pstree"}
                />
            </section>
        </>
    )
}

export default function ListPage() {
    return (
        <>
            <PageHeaderContent />
            <article>
                <SummaryContainer />
            </article>
        </>
    )
}
