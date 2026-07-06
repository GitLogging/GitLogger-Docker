"use client"
import { useState, Suspense } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { RepoListNamePicker } from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"

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


        </>
    )
}
