"use client"
import { useState, Suspense } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { InputGroup, Form, Button } from "react-bootstrap"
import { RepoListNamePicker } from "@/app/components/input/RepositoryNamePicker"
import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"

export function CloneRepoControl() {
    /**
     * @summary Input a git clone url, and call the /repo/clone endpoint
     */
    const [cloneUrl, setCloneUrl] = useState(`https://github.com/sharkdp/fd.git`)

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault() // prevent page reload
        console.log('Clone url: ', cloneUrl)
        const port = 3001
        // const queryUrl = `http://127.0.0.1:${port}/repo/clone?=url=${defaultCloneUrl}`
        // `http://127.0.0.1:${hostPort}/repo/clone?url=${encodeURIComponent(cloneUrl)}`
        const queryUrl = `http://127.0.0.1:${port}/repo/clone?url=${encodeURIComponent(cloneUrl)}`

        try {
            const response = await fetch(queryUrl)
            const data = await response.json()
            console.log(`CloneRepoControl.Submit response:`, data)
        }
        catch (error) {
            console.error(`CloneRepoControl.Submit: error cloning repo:`, error)
        }

        console.log(`clone`, { port: port, queryUrl })

    }
    return (
        <form onSubmit={handleSubmit}>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Git Repository URL"
                    aria-label="Git Repository URL"
                    aria-describedby="git-repo-clone-button"
                    value={cloneUrl}
                    onChange={(e) => setCloneUrl(e.target.value)}
                />
                <Button
                    variant="outline-secondary"
                    id="git-repo-clone-button"
                    type="submit"
                >
                    Clone
                </Button>
            </InputGroup>
        </form>
    )
}

export default function ListPage() {
    return (
        <>
            <article>

                {PageHeaderContent()}
            </article>
            <article>
                <section>
                    <h2>Clone Repository</h2>
                    <CloneRepositoryUrlPicker />
                </section>
            </article>
            <article>
                <section>
                    <RepoSummaryTable />
                </section>
            </article>

        </>
    )
}
