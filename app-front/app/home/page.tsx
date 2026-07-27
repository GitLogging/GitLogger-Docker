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

    const yourTop5 = ['ninmonkey/GitServed', 'junegunn/fzf', 'microsoft/vscode', 'powershell/powershelleditorservices', 'burntsushi/ripgrep']

    const period = `day`
    const since = `2.months`

    const configTotal1 =
        yourTop5
            // .slice(0, 3)
            .map(repo => ({
                RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repo}&period=${period}&since=${since}`,
            XAxisKey: `XAxisKey`,
            YAxisKey: `TotalCommits`,
                DatasetLabel: repo.split('/')[1],
            }))

    const axisPerWeek: ChartOptions<'bar'> = {
        scales: {
            x: {
                stacked: true,
                type: 'time',
                time: {
                    // parser: "yyyy-MM-dd'T'HH:mm:ssxxx",  // ISO 8601 with timezone offset (date-fns format)
                    parser: "yyyy-MM-dd",  // ISO 8601 with timezone offset (date-fns format)
                    unit: 'week',
                    // unit: 'month',
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
                <h3>Your top 5 (using <strong>date-fn</strong> per <strong>week</strong>)</h3>
                <CustomBarMetric
                    DatasetConfig={configTotal1}
                    ChartTitle="6:1:B | totalCommits"
                    ChartConfig={axisPerWeek}
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
