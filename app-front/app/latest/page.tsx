"use client"
import { useMemo, Suspense, useState, useEffect, useCallback, useRef } from "react"
// import type { DateFnOption } from "@/app/types/pwsh-api/repo/list"
import type { ChartOptions } from "chart.js"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import OwnerRepoPairPicker from "@/app/components/input/OwnerRepoPairPicker"
import DatePeriodPicker, { type DatePeriodUnit } from "@/app/components/input/DatePeriodPicker"
import { CustomLineMetric } from "@/app/components/charts/CustomLineMetric"
import Button from 'react-bootstrap/Button'

// import type { ChartOptions } from "chart.js"
// import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
// import { BarMetric } from "@/app/components/charts/BarMetric"
// import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
// import { fetchRepoList, RepoSummaryItem, fetchRepoListNames } from "@/app/types/pwsh-api/repo/list"
// import { DefaultDeserializer } from "v8"
// import { Line } from "react-chartjs-2"

const defaultRepoPair = `startautomating/pssvg`
const buildTotalCommitUrl = (pair: string, period: string) =>
    `http://127.0.0.1:3001/repo/metric/totalcommit?name=${pair}&period=${period}`

function LineMetricWithPicker() {
    // undefined until read back from the chart's initial RequestUrl
    const [repoPairName, setRepoPairName] = useState<string | undefined>(undefined)
    const syncPairFromChart = useCallback((urls: string[]) => {
        const name = new URL(urls[0]).searchParams.get(`name`)
        if (name) setRepoPairName((current) => current ?? name)
    }, [])
    const [period, setPeriod] = useState<DatePeriodUnit>(`month`)

    /**
     * @summary creates a `<CustomLineMetric>` with the picker `<OwnerRepoPairPicker>`
     */
    // const period = `day`
    // const since = `3.months`
    // // const dateFnUnit_Slicer =
    // const [dateFnOption, setDateFnOption] =
    //     useState<DateFnOption["unit"]>(`week`)

    const axisPerMonth: ChartOptions<"line"> =
    {
        scales: {
            x: {
                type: "time",
                time: {
                    parser: "yyyy-MM-dd",
                    unit: period, //#`month`,
                    displayFormats: {
                        day: "yyyy-MM-dd",
                    },
                },
            },
        },
    }

    return (
        <>
            <OwnerRepoPairPicker
                pair={repoPairName}
                onPairChange={setRepoPairName}
                children={
                    <DatePeriodPicker
                        period={period}
                        onPeriodChange={(period) => {
                            console.log(`Selected period: ${period}`)
                            setPeriod(period)
                        }}
                    />
                }
            />
            {/* <DatePeriodPicker
                onPeriodChange={(period) => {
                    console.log(`Selected period: ${period}`)
                    setPeriod(period)
                }}
            /> */}
            <CustomLineMetric
                ChartTitle={`pulse: ${repoPairName ?? defaultRepoPair} | totalCommits | ${period}`}
                DatasetConfig={{
                    RequestUrl: buildTotalCommitUrl(repoPairName ?? defaultRepoPair, period),

                    XAxisKey: `XAxisKey`,
                    YAxisKey: `TotalCommits`,
                    DatasetLabel: repoPairName,
                }}
                ChartConfig={axisPerMonth}
                onRequestUrlsChange={syncPairFromChart}
            />
        </>
    )
}
export default function CreatePage() {
    // each entry is a stable key for one chart; the length drives how many render
    const [chartKeys, setChartKeys] = useState<number[]>([0, 1])
    const nextKey = useRef(2)

    function addChart() {
        setChartKeys((keys) => [...keys, nextKey.current++])
    }

    function removeLastChart() {
        setChartKeys((keys) => keys.slice(0, -1))
    }

    const hasZeroCharts = chartKeys.length === 0
    return (
        <>
            <PageHeaderContent />
            <article>
                <section id="page-latest--command-bar" className="sticky-top" style={{
                    margin: '0px',
                    padding: '0px',
                    marginBottom: '1rem',
                }}>
                    <Button
                        variant="success"
                        onClick={addChart}
                    >Add</Button>

                    <Button
                        variant="danger"
                        onClick={removeLastChart}
                        disabled={hasZeroCharts}
                    >Remove</Button>

                    <Button
                        variant="primary"
                        disabled={hasZeroCharts}
                    >Save</Button>

                    <Button
                        variant="primary"
                    >Load</Button>

                </section>
                <section id="latest-charts" >
                    {chartKeys.map((key, index) => (
                        <LineMetricWithPicker key={index} />
                    ))}
                </section>
            </article>
        </>
    )
}
