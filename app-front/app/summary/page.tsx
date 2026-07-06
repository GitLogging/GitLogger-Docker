"use client"
import { useState, Suspense } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { InputGroup, Form, Button } from "react-bootstrap"
import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"

export default function ListPage() {
    return (
        <>
            {PageHeaderContent()}

            <article>
                <section>
                    <h2>Select Repository</h2>
                    <RepoListNamePicker />
                </section>
            </article>


        </>
    )
}
