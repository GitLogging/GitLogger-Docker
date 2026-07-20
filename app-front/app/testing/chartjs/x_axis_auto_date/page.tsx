"use client"
// import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
import { ChartOptions } from "chart.js"
import { config } from "next/dist/build/templates/pages"
// import { InputGroup, Form, Button } from "react-bootstrap"
// import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
// import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
// import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
// import { CommitMetricItem, CommitMetricUrl, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
// import { FlatLineChart } from "@/app/components/charts/FlatLineChart"

function Chart1() {
    const chart1 = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=day`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        }]

    const chart2 = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=week`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        }]
    const chart3 = [
        ...chart1,
        ...chart2,
    ]

    return (

        <>
            <article>

                <CustomBarMetric
                    DatasetConfig={chart3}
                    ChartTitle="1:3"

                />
                <CustomBarMetric
                    DatasetConfig={chart1}
                    ChartTitle="1:1"
                />
                <CustomBarMetric
                    DatasetConfig={chart2}
                    ChartTitle="1:2"
                />
            </article>
        </>

    )
}
function Chart2() {
    const config = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        },
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
            XAxisKey: `CommitDate`,
            YAxisKey: `LinesChanged`,
            DatasetLabel: `LinesChanged`
        }
    ]

    const opts1: ChartOptions<'bar'> = {
        scales: {
            x: {
                stacked: false,
                // stacked: true,
                type: 'category',
            },
            y: {
                stacked: true,
            },
        },
    }
    const opts2: ChartOptions<'bar'> = {
        scales: {
            x: {
                stacked: true,
                type: 'category',
            },
            y: {
                stacked: true,
            },
        },
    }
    return (

        <>
            <article>


                <CustomBarMetric
                    DatasetConfig={config}
                    ChartTitle="2:2 | opts2"
                    ChartConfig={opts2}
                />
                <CustomBarMetric
                    DatasetConfig={config}
                    ChartTitle="2:1 | opts1"
                    ChartConfig={opts1}
                />
            </article>
        </>

    )

}

export default function Page() {
    return (
        <>
            <PageHeaderContent />
            <Chart1 />
            <Chart2 />
        </>
    )
}
