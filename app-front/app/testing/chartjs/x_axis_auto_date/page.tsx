"use client"
// import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
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
                />
                <CustomBarMetric
                    DatasetConfig={chart1}
                />
                <CustomBarMetric
                    DatasetConfig={chart2}
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
    return (

        <>
            <article>


                <CustomBarMetric
                    DatasetConfig={config}
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
