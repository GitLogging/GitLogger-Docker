"use client"
import { useMemo, Suspense, useState, useEffect } from "react"
// import type { DateFnOption } from "@/app/types/pwsh-api/repo/list"
import type { ChartOptions } from "chart.js"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import OwnerRepoPairPicker from "@/app/components/input/OwnerRepoPairPicker"
import DatePeriodPicker from "@/app/components/input/DatePeriodPicker"
import { CustomLineMetric } from "@/app/components/charts/CustomLineMetric"

// import type { ChartOptions } from "chart.js"
// import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
// import { BarMetric } from "@/app/components/charts/BarMetric"
// import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
// import { fetchRepoList, RepoSummaryItem, fetchRepoListNames } from "@/app/types/pwsh-api/repo/list"
// import { DefaultDeserializer } from "v8"
// import { Line } from "react-chartjs-2"

export interface DatePeriodChoice {
    unit: "day" | "week" | "month" | "year"
}

function LineMetricWithPicker() {
    const [repoPairName, setRepoPairName] = useState(`startautomating/pssvg`)
    const [period, setPeriod] = useState<DatePeriodChoice["unit"]>(`month`)

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

            <h2>Latest</h2>
            <OwnerRepoPairPicker
                onPairChange={setRepoPairName}
            />
            <DatePeriodPicker
                onPeriodChange={(period) => {
                    console.log(`Selected period: ${period}`)
                    setPeriod(period)
                }}
            />
            <CustomLineMetric
                ChartTitle={`pulse: ${repoPairName} | totalCommits | Monthly`}
                DatasetConfig={{
                    RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repoPairName}&period=${period}`,

                    XAxisKey: `XAxisKey`,
                    YAxisKey: `TotalCommits`,
                    DatasetLabel: `PsSvg`
                }}
                ChartConfig={axisPerMonth}
            />
        </>
    )
}
export default function CreatePage() {
    return (
        <>
            <PageHeaderContent />

            <article>
                <section>
                    <LineMetricWithPicker />
                    <LineMetricWithPicker />

                </section>
            </article>
        </>
    )
}
