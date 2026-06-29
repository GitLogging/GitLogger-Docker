"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"

import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js'
import { useState, useEffect } from "react"
import { Pie } from 'react-chartjs-2'

ChartJS.register(ArcElement, Tooltip, Legend)

export const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: '# of Votes',
            data: [12, 19, 3, 5, 2, 3],
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
            borderWidth: 1,
        },
    ],
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
                    setApiResponse(repoSummaryList)
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
        <Pie data={data} />
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
            </article>
        </>
    )
}

