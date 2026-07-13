"use client"
import { CommitMetricUrl, CommitMetricItem, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
import { useEffect, useState } from "react"
import { Bar, Line } from "react-chartjs-2"
import { Chart as ChartJS, LineElement, PointElement, LinearScale, Title, Tooltip, Legend, CategoryScale, BarElement, ChartData, ChartOptions } from 'chart.js'

import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { ListGroup, ListGroupItem } from "react-bootstrap"


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

const defaultDatasetColors = [
    { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgba(75, 192, 192, 1)' },
    { backgroundColor: 'rgba(255, 99, 132, 0.5)', borderColor: 'rgba(255, 99, 132, 1)' },
    { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgba(54, 162, 235, 1)' },
    { backgroundColor: 'rgba(255, 206, 86, 0.5)', borderColor: 'rgba(255, 206, 86, 1)' },
    { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgba(153, 102, 255, 1)' },
    { backgroundColor: 'rgba(255, 159, 64, 0.5)', borderColor: 'rgba(255, 159, 64, 1)' },
]

export function DemoMetricToChartData(
    apiResponses: CommitMetricItem[] | CommitMetricItem[][],
    requestUrls: string | string[],
    chartTitle: string,

): { data: ChartData<'bar'>, options: ChartOptions<'bar'> } {
    /**
     * @summary transforms API response(s) into this specific chart type
     * @param apiResponses - single array or array of arrays (one per URL)
     * @param requestUrls - single URL or array of URLs
    * @see https://www.chartjs.org/docs/latest/api/#charttype
    * @see https://www.chartjs.org/docs/latest/axes/cartesian/time.html#time-units
     */

    // Normalize inputs to arrays
    const urlsArray = Array.isArray(requestUrls) ? requestUrls : [requestUrls]
    const responsesArray = Array.isArray(apiResponses[0]) ? apiResponses : [apiResponses]

    // Build datasets for each URL
    const datasets = urlsArray.map((requestUrl, index) => {
        const apiResponse = responsesArray[index] || []

        // Sort by CommitDate
        const sortedData = [...apiResponse].sort((a, b) =>
            new Date(a.CommitDate).getTime() - new Date(b.CommitDate).getTime()
        )

        // Aggregate commits by date - sum all commits for each unique date
        const aggregatedByDate = new Map<string, number>()
        sortedData.forEach(item => {
            // Use DateString or create from Year/Month
            const dateKey = 'DateDisplay' in item ? (item as any).DateDisplay : (item.DateString || `${item.Year}-${item.Month}`)
            aggregatedByDate.set(dateKey, (aggregatedByDate.get(dateKey) || 0) + item.CommitCount)
        })

        // Convert aggregated data back to array format for charting
        const aggregatedData = Array.from(aggregatedByDate.entries()).map(([date, totalCount]) => ({
            CommitDate: date,
            CommitCount: totalCount,
        }))

        const colors = defaultDatasetColors[index % defaultDatasetColors.length]
        return {
            label: formatDatasetLabel(requestUrl),
            data: aggregatedData,
            borderWidth: 2,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
        }
    })

    const data: ChartData<'bar'> = {
        // labels: labels,
        datasets: datasets,
    }
    console.log('🐒datasets', { datasets })

    const options: ChartOptions<'bar'> = {
        parsing: {
            xAxisKey: 'CommitDate',
            yAxisKey: 'CommitCount'
        },
        scales: {
            x: {
                stacked: true,
            },
            y: {
                stacked: true,
            },
        },
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: !!chartTitle,
                text: chartTitle
            },
            tooltip: {
                callbacks: {
                    label: (context) => {
                        const dataPoint = context.raw as any
                        return `Total commits: ${dataPoint.CommitCount}`
                    }
                }
            }
        }
    }

    return { data, options }
}





// const Example = () => (
//     <OverlayTrigger trigger="click" placement="right" overlay={popover}>
//         <Button variant="success">Response 1</Button>
//     </OverlayTrigger>
// )

// render(<Example />);

function ShowResponsePopover({ RequestUrl, DisplayJson, children }) {

    const urlObj = new URL(RequestUrl)
    const abbrPathWithQuery = urlObj.pathname + urlObj.search
    function keysAsDefinitionList(Url) {
        const url = new URL(Url)
        const items = Array.from(url.searchParams.entries()).map(([key, value]) => (
            <ListGroupItem key={key}>
                {key}: {value}
            </ListGroupItem>
        ))
        return (
            <>
                <ListGroup>
                    {items}
                </ListGroup>
            </>
        )
    }

    const popover = (
        <Popover id="popover-basic"
            style={{
                // outline: '2px solid orange',
                maxHeight: '80vh',
            }}
        >
            <Popover.Header as="h3">Request:
                <a href={RequestUrl} target="_blank" rel="noopener noreferrer">{abbrPathWithQuery}</a>
            </Popover.Header>
            <Popover.Body>
                <h4>query</h4>
                {keysAsDefinitionList(RequestUrl)}
                {children}
                <h4>response</h4>
                <pre>{DisplayJson}</pre>
            </Popover.Body>
        </Popover>
    )

    return (
        <>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="success">Response 1</Button>
            </OverlayTrigger>
            {popover}
        </>
        // <>
        //     {popover}
        // </>
    )
}


export function DemoFlatBarChart({
    RequestUrl, ChartTitle
}: {
    RequestUrl: CommitMetricUrl | CommitMetricUrl[] | string | string[],
    ChartTitle?: string
}
) {
    /**
     * Create a chart, and link the source JSON. displays status during load, and/or errors
     * Supports both single and multiple request URLs
     */

    const logPrefix = "/testing/generic_multiple_dataset_transform/<DemoFlatBarChart>:"
    const [chartData, setChartData] = useState<ChartData<'bar'> | null>(null)
    const [chartOptions, setChartOptions] = useState<ChartOptions<'bar'> | null>(null)
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)
    const [detailsJson, setDetailsJson] = useState('')
    const [requestUrls, setRequestUrls] = useState<string[]>([])

    useEffect(() => {
        let isMounted = true

        async function loadApiResponse() {
            try {
                setIsLoading(true)
                setErrorMessage(null)

                // Normalize RequestUrl to array
                const urlsArray = Array.isArray(RequestUrl) ? RequestUrl : [RequestUrl]
                setRequestUrls(urlsArray)

                // Fetch all URLs in parallel
                const fetchPromises = urlsArray.map(url =>
                    fetch(url).then(response => {
                        if (!response.ok) {
                            throw new Error(`Request failed for ${url} with status ${response.status}`)
                        }
                        return response.json() as Promise<CommitMetricItem[]>
                    })
                )

                const responses = await Promise.all(fetchPromises)

                if (isMounted) {
                    const { data: transformedData, options: transformedOptions } = DemoMetricToChartData(responses, urlsArray)

                    console.group(logPrefix)
                    console.log(`${logPrefix} requesting ${urlsArray.length} URL(s)`)
                    urlsArray.forEach((url, index) => {
                        console.log(`${logPrefix} [${index}] parsedRequestUrl:`, parseRequestUrl(url))
                        console.log(`${logPrefix} [${index}] response ${responses[index].length} items:`, responses[index])
                    })
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
    }, [RequestUrl])

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


                <div>
                    {requestUrls.map((url, index) => (
                        <ShowResponsePopover
                            RequestUrl={url}
                            DisplayJson={detailsJson}
                        />
                        // <a key={index} href={url} style={{ marginRight: '1em', display: 'inline-block' }}>
                        //     View Request {requestUrls.length > 1 ? `${index + 1}` : ''}
                        // </a>
                    ))}

                </div>
                <div>
                    {requestUrls.map((url, index) => (
                        <a key={index} href={url} style={{ marginRight: '1em', display: 'inline-block' }}>
                            View Request {requestUrls.length > 1 ? `${index + 1}` : ''}
                        </a>
                    ))}
                </div>
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
                    ChartTitle='Ripgrep only'
                    RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months"
                />
                <DemoFlatBarChart
                    ChartTitle='Fzf and Ripgrep'
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=junegunn/fzf&since=12.months&period=month",
                        "http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=12.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/emoji&since=30.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <DemoFlatBarChart
                    ChartTitle='Ripgrep'
                    RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=2.months&period=year"
                />
                <DemoFlatBarChart
                    RequestUrl="http://127.0.0.1:3001/repo/metric/commit?name=BurntSushi/ripgrep&since=12.months"
                />
            </article>
        </>

    )

}


