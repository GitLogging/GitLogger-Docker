"use client"
// import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { BarMetric } from "@/app/components/charts/BarMetric"
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
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=week",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />

            </article>
        </>

    )

}




export default function Page() {
    return (
        <>
            <PageHeaderContent />
            <PageSummary />
        </>
    )
}
