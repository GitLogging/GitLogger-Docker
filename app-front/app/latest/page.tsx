"use client"
import { useMemo, Suspense, useState, useEffect } from "react"
import type { DateFnOption } from "@/app/types/pwsh-api/repo/list"
import type { ChartOptions } from "chart.js"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import OwnerRepoPairPicker from "@/app/components/input/OwnerRepoPairPicker"
import { CustomLineMetric } from "@/app/components/charts/CustomLineMetric"

// import type { ChartOptions } from "chart.js"
// import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
// import { BarMetric } from "@/app/components/charts/BarMetric"
// import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
// import { fetchRepoList, RepoSummaryItem, fetchRepoListNames } from "@/app/types/pwsh-api/repo/list"
// import { DefaultDeserializer } from "v8"
// import { Line } from "react-chartjs-2"


function LineMetricWithPicker() {
    const [repoPairName, setRepoPairName] = useState(`startautomating/pssvg`)
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
                    unit: `month`,
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
            />
            {/* <CustomLineMetric
                DatasetConfig={configTotalNin1}
                ChartTitle="recent: Nin | totalCommits"
             ChartConfig={axisPerMonth}
            /> */}

            <h3>Pulse for StartAutomating</h3>
            <CustomLineMetric
                ChartTitle="pulse: PsSVG | totalCommits | Monthly"
                DatasetConfig={{
                    RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repoPairName}&period=${`month`}`,

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

                </section>
            </article>
        </>
    )
}
