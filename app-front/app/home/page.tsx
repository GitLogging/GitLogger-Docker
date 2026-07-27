"use client"
// import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { BarMetric } from "@/app/components/charts/BarMetric"
import { ChartOptions } from "chart.js"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
// import { InputGroup, Form, Button } from "react-bootstrap"
// import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
// import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
// import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
// import { CommitMetricItem, CommitMetricUrl, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
// import { FlatLineChart } from "@/app/components/charts/FlatLineChart"

function PageSummary() {
    return (

        <>
            <article>


                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=startAutomating/GitLogger&since=12.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />

                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=12.months&period=month",
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=startAutomating/GitLogger&since=12.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/emoji&since=30.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=startAutomating/GitLogger&since=12.months&period=day",
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=month",
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />

            </article>
        </>

    )

}

function ShowTop5() {
    /**
     * $list_repos | sort NewestCommitDate -Descending | select -First 5
     */
    const configTotal1 = [
        {
            // RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=12.months&period=day`,
            RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=BurntSushi/ripgrep&period=day&since=5.months`,
            XAxisKey: `XAxisKey`,
            YAxisKey: `TotalCommits`,
            DatasetLabel: `RipGrep`
        },
        {
            // RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=12.months&period=day`,
            RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=junegunn/fzf&period=day&since=5.months`,
            XAxisKey: `XAxisKey`,
            YAxisKey: `TotalCommits`,
            DatasetLabel: `Fzf`
        },
    ]

    // const opts1: ChartOptions<'bar'> = {
    //     scales: {
    //         x: {
    //             stacked: false,
    //             // stacked: true,
    //             type: 'category',
    //         },
    //         y: {
    //             stacked: true,
    //         },
    //     },
    // }
    // const axisPerDay: ChartOptions<'bar'> = {
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 parser: "yyyy-MM-dd'T'HH:mm:ssxxx",  // ISO 8601 with timezone offset (date-fns format)
    //                 unit: 'day',
    //                 displayFormats: {
    //                     day: 'yyyy-MM-dd'
    //                 },
    //                 ticks: {
    //                     maxTicksLimit: 20
    //                 }
    //             }
    //         }
    //     }
    // }
    // const axisPerMonth: ChartOptions<'bar'> = {
    //     scales: {
    //         x: {
    //             type: 'time',
    //             time: {
    //                 parser: "yyyy-MM-dd'T'HH:mm:ssxxx",  // ISO 8601 with timezone offset (date-fns format)
    //                 unit: 'month',
    //                 displayFormats: {
    //                     month: 'MMM yyyy'
    //                 },
    //                 // ticks: {
    //                 //     maxTicksLimit: 12
    //                 // }
    //             }
    //         }
    //     }
    // }
    const axisPerDay: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    // parser: "yyyy-MM-dd'T'HH:mm:ssxxx",  // ISO 8601 with timezone offset (date-fns format)
                    parser: "yyyy-MM-dd",  // ISO 8601 with timezone offset (date-fns format)
                    unit: 'day',
                    displayFormats: {
                        day: 'yyyy-MM-dd',
                        // year: 'yyyy',
                    },
                },
            },

        },


    }

    return (

        <>
            <article>

                <h3>Your Top 5</h3>
                <CustomBarMetric
                    DatasetConfig={configTotal1}
                    ChartTitle="6:1:A | totalCommits"
                />
                <h3>date-fn date axis</h3>
                <CustomBarMetric
                    DatasetConfig={configTotal1}
                    ChartTitle="6:1:B | totalCommits"
                    ChartConfig={axisPerDay}
                // ChartConfig={axisPerMonth}
                // Options={{
                //     AutoSplitDatasets: false,
                // }}
                // ChartConfig={opts1}
                />
            </article>
        </>

    )
}


export default function Page() {
    return (
        <>
            <PageHeaderContent />
            <ShowTop5 />
            {false && <PageSummary />}
        </>
    )
}
