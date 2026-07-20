"use client"
// import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
// import { InputGroup, Form, Button } from "react-bootstrap"
// import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
// import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
// import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
// import { CommitMetricItem, CommitMetricUrl, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
// import { FlatLineChart } from "@/app/components/charts/FlatLineChart"

function PageSummary() {
    const dataset1Config = {
        RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
    }
    return (

        <>
            <article>


                <CustomBarMetric
                    DatasetConfig={[
                        dataset1Config,
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
