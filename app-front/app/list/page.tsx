"use client"
import { useState, Suspense } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { RepoListNamePicker } from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
import { BarMetric } from "@/app/components/charts/BarMetric"


function PageSummary() {
    const allRepoNames = [
        'burntsushi/ripgrep', 'junegunn/fzf', 'microsoft/vscode', 'microsoft/vscode-tmdl', 'ninmonkey/GitServed', 'ninmonkey/Mintils.ps1', 'ninmonkey/ninmonkey.powerquerylib', 'powershell/powershelleditorservices', 'powershell/psreadline', 'santisq/pstree', 'startautomating/emoji', 'startautomating/ezout', 'startautomating/GitLogger', 'startautomating/helpout', 'startautomating/obs-powershell', 'startautomating/psadapter', 'startautomating/pssvg', 'startautomating/rocker', 'startautomating/roughdraft', 'startautomating/ugit'
    ]
    const allCharts = []
    allRepoNames.forEach((name) => {
        allCharts.push(
            <BarMetric

                RequestUrl={[
                    `http://127.0.0.1:3001/repo/metric/commit?name=${name}&since=1.months&period=day`,
                ]}
            />
        )
    })
    return (

        <>
            <article>
                {allCharts}
            </article>
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



export default function ListPage() {
    return (
        <>
            {PageHeaderContent()}

            <article>
                <section>
                    <h2>Clone Repository</h2>
                    <CloneRepositoryUrlPicker />
                </section>

                <section>
                    <RepoSummaryTable />
                </section>

            </article>
            <article>
                {PageSummary()}
            </article>


        </>
    )
}
