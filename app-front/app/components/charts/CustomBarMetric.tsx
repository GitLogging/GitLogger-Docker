"use client"
import { CommitMetricItem } from "@/app/types/pwsh-api/repo/metric/commit"
import { useEffect, useState } from "react"
import { Bar } from "react-chartjs-2"
import { Chart as ChartJS, BarElement, LineElement, CategoryScale, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend, ChartData, ChartOptions } from 'chart.js'
import { ResponseDetailsPopoverButton } from "@/app/components/block/ResponseDetailsPopoverButton"
import Button from "react-bootstrap/esm/Button"
import 'chartjs-adapter-date-fns'

// import { Chart, TimeScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend } from 'chart.js';

/**
 * @summary CustomBarMetric supports per-dataset configuration for flexible axis mapping
 * Each dataset can specify its own XAxisKey, YAxisKey, RequestUrl, and label
 */

ChartJS.register(BarElement, LineElement, CategoryScale, PointElement, LinearScale, TimeScale, Title, Tooltip, Legend)

/**
 * @summary Configuration for a single dataset in the chart
 */
export interface DatasetConfig {
    RequestUrl: string
    XAxisKey?: string
    YAxisKey?: string
    DatasetLabel?: string
    GitUserName?: string  // Optional: if set, filters data to only this user's records
}

/**
 * @summary Splits a single DatasetConfig into multiple configs, one per unique GitUserName
 * @param config - The original dataset config with a RequestUrl
 * @returns An array of DatasetConfig objects, each with a unique GitUserName as the DatasetLabel
 * @example
 * const configs = await splitDatasetConfigByUser(myConfig)
 * // Returns: [
 * //   { ...config, DatasetLabel: 'user1', GitUserName: 'user1' },
 * //   { ...config, DatasetLabel: 'user2', GitUserName: 'user2' },
 * // ]
 */
export async function splitDatasetConfigByUser(config: DatasetConfig): Promise<DatasetConfig[]> {
    try {
        const response = await fetch(config.RequestUrl)
        if (!response.ok) {
            console.warn(`Failed to fetch ${config.RequestUrl}: ${response.status}`)
            return [config]
        }

        const data: CommitMetricItem[] = await response.json()

        // Extract unique GitUserName values while preserving order
        const userNames = Array.from(
            new Map(data.map(item => [item.GitUserName, item])).keys()
        )

        // Create a new config for each unique user, storing the user name for filtering
        const splitConfigs: DatasetConfig[] = userNames.map(userName => ({
            ...config,
            DatasetLabel: userName,
            GitUserName: userName  // Store user name for data filtering
        }))

        return splitConfigs
    } catch (error) {
        console.error(`Error splitting dataset config: ${error}`)
        return [config]
    }
}

function parseRequestUrl(url: string): { name?: string; since?: string; owner?: string; repo?: string; metric?: string } {
    /**
     * @summary parses the request URL to extract relevant query parameters and path segments
     * @param url - the request URL to parse
     * @returns an object containing the extracted metadata (name, since, owner, repo, metric)
     * @example const { name, since } = parseRequestUrl(url)
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

const defaultDatasetColors = [
    { backgroundColor: 'rgba(75, 192, 192, 0.5)', borderColor: 'rgba(75, 192, 192, 1)' },
    { backgroundColor: 'rgba(255, 99, 132, 0.5)', borderColor: 'rgba(255, 99, 132, 1)' },
    { backgroundColor: 'rgba(54, 162, 235, 0.5)', borderColor: 'rgba(54, 162, 235, 1)' },
    { backgroundColor: 'rgba(255, 206, 86, 0.5)', borderColor: 'rgba(255, 206, 86, 1)' },
    { backgroundColor: 'rgba(153, 102, 255, 0.5)', borderColor: 'rgba(153, 102, 255, 1)' },
    { backgroundColor: 'rgba(255, 159, 64, 0.5)', borderColor: 'rgba(255, 159, 64, 1)' },
]

export function TransformedMetricData(
    apiResponses: CommitMetricItem[] | CommitMetricItem[][],
    datasetConfigs: DatasetConfig | DatasetConfig[],
    chartTitle?: string,
    chartOptions?: ChartOptions<'bar'>,
): {
    data: ChartData<'bar'>,
    options: ChartOptions<'bar'>
} {
    /**
     * @summary transforms API response(s) into chart data with per-dataset axis configuration
     * @param apiResponses - single array or array of arrays (one per config)
     * @param datasetConfigs - single config or array of configs with RequestUrl, XAxisKey, YAxisKey, DatasetLabel
     * @param chartTitle - optional chart title
     * @returns chart data and options ready for Chart.js Bar chart
     */

    // Normalize inputs to arrays
    const configsArray = Array.isArray(datasetConfigs) ? datasetConfigs : [datasetConfigs]
    const responsesArray = Array.isArray(apiResponses[0]) ? apiResponses : [apiResponses]

    // Store raw data for each config, filtering by GitUserName if specified
    const allAggregatedDataByConfig: Map<number, CommitMetricItem[]> = new Map()

    configsArray.forEach((config, index) => {
        let apiResponse = responsesArray[index] || []

        // Filter by GitUserName if specified in the config
        if (config.GitUserName) {
            apiResponse = apiResponse.filter(item => item.GitUserName === config.GitUserName)
        }

        // Keep raw data without aggregation
        allAggregatedDataByConfig.set(index, apiResponse)
    })

    // Get the axis keys from first config to use in parsing
    const firstConfig = configsArray[0]
    const xAxisKeyName = firstConfig.XAxisKey
    const yAxisKeyName = firstConfig.YAxisKey

    // Build datasets for each config
    const datasets = configsArray.map((config, index) => {
        const rawData = (allAggregatedDataByConfig.get(index) || []) as CommitMetricItem[]

        const colors = defaultDatasetColors[index % defaultDatasetColors.length]
        return {
            label: config.DatasetLabel,
            data: rawData,
            borderWidth: 2,
            backgroundColor: colors.backgroundColor,
            borderColor: colors.borderColor,
        }
    })

    const data: ChartData<'bar'> = {
        datasets: datasets,
    }
    console.log('🐒 CustomBarMetric:', { datasets, configsArray })

    const baseOptions: ChartOptions<'bar'> = {
        parsing: {
            xAxisKey: xAxisKeyName,
            yAxisKey: yAxisKeyName
        },
        /* note: type == 'category' and stacked, only works on string fields */
        scales: {
            x: {
                stacked: true,
                type: 'category',
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
                        const config = configsArray[context.datasetIndex]
                        const dataPoint = context.raw as any
                        const yAxisKey = config.YAxisKey || yAxisKeyName
                        const displayValue = yAxisKey ? dataPoint[yAxisKey] : dataPoint.yValue
                        return `${config.DatasetLabel}: ${displayValue} ${yAxisKey}`
                    }
                }
            }
        },
    }

    // Deep merge scales to preserve both x and y axis configs
    const options: ChartOptions<'bar'> = {
        ...baseOptions,
        ...chartOptions,
        scales: {
            ...baseOptions.scales,
            ...(chartOptions?.scales || {}),
        }
    }

    return { data, options }
}

function BarDebugButtons({
    chartOptions,
    setChartOptions
}: {
    chartOptions: ChartOptions<'bar'> | null,
    setChartOptions: (options: ChartOptions<'bar'>) => void
}) {
    /**
     * @summary attached to a <CustomBarMetric> component to provide debug buttons for toggling chart options
     * @see CustomBarMetric for usage
     *
     */
    const handleUpdateChartDataCommand = () => {
        /**
         * toggles ChartOptions.scales.x.stacked between true and false
         */
        console.group(`🤖 Updated ChartOptions:`)
        if (!chartOptions) { console.groupEnd(); return }

        const newOptions = { ...chartOptions }
        // toggles boolean if existing
        if (newOptions?.scales?.x?.stacked !== undefined) {
            newOptions.scales!.x!.stacked = !newOptions.scales!.x!.stacked
        }
        console.log(newOptions)
        console.groupEnd()
        setChartOptions(newOptions)
    }

    // do not render the button if the property is undeclared (rather than when falsy)
    if (chartOptions?.scales?.x?.stacked === undefined) {
        return (<></>)
    }

    return (<>
        <Button variant="secondary" onClick={handleUpdateChartDataCommand}>
            StackX
        </Button>
    </>)
}


export function CustomBarMetric({
    DatasetConfig,
    ChartConfig,
    ChartTitle,
    Options
}: {
    DatasetConfig: DatasetConfig | DatasetConfig[],
        ChartConfig?: ChartOptions<'bar'>,
    ChartTitle?: string,
        Options?: any // is object
}) {
    /**
     * @summary A customizable bar chart component that supports per-dataset configuration
     * Each dataset can have different RequestUrl, XAxisKey, YAxisKey, and label
     * Displays loading state, errors, and supports multiple concurrent requests
     */
    const enableDebugButtons = true // toggle showing extra debug buttons for chart
    const usingAutoSplitDatasets = Options?.AutoSplitDatasets || false // toggle auto-splitting datasets based on unique XAxisKey values

    const logPrefix = "<CustomBarMetric>:"
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

                // Normalize DatasetConfig to array
                let configsArray = Array.isArray(DatasetConfig) ? DatasetConfig : [DatasetConfig]

                // Auto-split by unique GitUserName if enabled
                if (usingAutoSplitDatasets) {
                    const splitConfigs: DatasetConfig[] = []
                    for (const config of configsArray) {
                        const split = await splitDatasetConfigByUser(config)
                        splitConfigs.push(...split)
                    }
                    configsArray = splitConfigs

                    console.log(`${logPrefix} auto-split into ${configsArray.length} configs by GitUserName`)
                }

                setRequestUrls(configsArray.map(c => c.RequestUrl))

                // Fetch all URLs in parallel
                const fetchPromises = configsArray.map(config =>
                    fetch(config.RequestUrl).then(response => {
                        if (!response.ok) {
                            throw new Error(`Request failed for ${config.RequestUrl} with status ${response.status}`)
                        }
                        return response.json() as Promise<CommitMetricItem[]>
                    })
                )

                const responses = await Promise.all(fetchPromises)

                if (isMounted) {
                    const { data: transformedData, options: transformedOptions } =
                        TransformedMetricData(responses, configsArray, ChartTitle, ChartConfig)

                    console.group(logPrefix)
                    console.log(`${logPrefix} requesting ${configsArray.length} dataset(s)`)
                    configsArray.forEach((config, index) => {
                        console.log(`${logPrefix} [${index}] config:`, config)
                        console.log(`${logPrefix} [${index}] response with ${responses[index].length} items:`, responses[index])
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
    }, [DatasetConfig, ChartTitle, usingAutoSplitDatasets]) // re-run if auto-split setting changes

    if (isLoading) {
        return (<><h3>Loading Metric...</h3></>)
    }

    if (errorMessage) {
        return (<><h3>Failed to load Metric</h3><p>{errorMessage}</p></>)
    }

    if (!chartData || !chartData.datasets || chartData.datasets.length === 0) {
        return (<><h3>No Metric found</h3></>)
    }

    const chartElem = <Bar data={chartData} options={chartOptions} />
    const debugBarElems = (
        <BarDebugButtons chartOptions={chartOptions} setChartOptions={setChartOptions} />
    )
    return (
        <>
            <section className="chart__with__details">
                {chartElem}
                <div>
                    {requestUrls.map((url, index) => (
                        <ResponseDetailsPopoverButton
                            ButtonLabel={index.toString()}
                            key={index}
                            RequestUrl={url}
                            DisplayJson={detailsJson}
                        />
                    ))}
                    {enableDebugButtons && debugBarElems}

                </div>
            </section>
        </>
    )
}
