"use client"
import { useState, Suspense } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { InputGroup, Form, Button } from "react-bootstrap"
import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
import { CommitMetricItem, CommitMetricUrl } from "@/app/types/pwsh-api/repo/metric/commit"
import { FlatLineChart } from "@/app/components/charts/LineChart"


function ShowSingleSummary({ RepoName }) {
    /**
     * @summary shows a single summary record for `<SummaryContainer>`
     */
    const since = `4.months`
    const requestUrl = `http://127.0.0.1:3001/repo/metric/commit?name=${RepoName}&since=${since}`

    return (
        <>
            <div><strong>Owner:</strong> {RepoName}</div>
            <FlatLineChart RequestUrl={requestUrl} />
        </>
    )
}

function SummaryContainer() {
    return (
        <>
            <section>
                <h2>Select Repository</h2>
                <RepoListNamePicker />
            </section>

            <section>
                <ShowSingleSummary
                    RepoName={"microsoft/vscode-tmdl"}
                />
                <ShowSingleSummary
                    RepoName={"santisq/pstree"}
                />
            </section>
        </>
    )
}

export default function ListPage() {
    return (
        <>
            <PageHeaderContent />
            <article>
                <SummaryContainer />
            </article>
        </>
    )
}
