"use client"
import { useState, Suspense } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { InputGroup, Form, Button, Spinner } from "react-bootstrap"
import { RepoListNamePicker } from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { RepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"


export default function ListPage() {
    return (
        <>
            <article>

                {PageHeaderContent()}
            </article>
            <article>
                <section>
                    <h2>Clone Repository</h2>
                    <RepositoryUrlPicker />
                </section>
            </article>
            <article>
            </article>
            <article>
                <section>
                    <h2>Your Repos</h2>
                    <RepoSummaryTable />
                    {/* <Suspense fallback={<div>Loading repositories...</div>}>
                        <RepoListNamePicker />
                        <RepoSummaryTable />
                    </Suspense> */}
                </section>
            </article>

        </>
    )
}
