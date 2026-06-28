"use client"

import { useEffect, useState } from "react"
import Table from "react-bootstrap/esm/Table"
// import { Table } from "react-bootstrap/Table"
// import Nav from 'react-bootstrap/Nav'
// import NavBar from 'react-bootstrap/NavBar'

interface RepoSummaryItem {
    Name: string
    Owner: string
    CommitCount: string | number
    NewestCommitDate: string
    NewestCommitRelative: string
    Path: string
    Remote: string
}

interface RepoListResponse {
    RepoList?: RepoSummaryItem[]
}

export function RepoSummaryTable() {
    const [repoList, setRepoList] = useState<RepoSummaryItem[]>([])
    const [isLoading, setIsLoading] = useState(true)
    const [errorMessage, setErrorMessage] = useState<string | null>(null)

    useEffect(() => {
        let isMounted = true

        async function loadRepoList() {
            try {
                setIsLoading(true)
                setErrorMessage(null)

                const data = await fetch("http://127.0.0.1:3001/repo/list")
                if (!data.ok) {
                    throw new Error(`Request failed with status ${data.status}`)
                }

                const clonedRepos: RepoListResponse = await data.json()
                if (isMounted) {
                    setRepoList(Array.isArray(clonedRepos.RepoList) ? clonedRepos.RepoList : [])
                }
            } catch (error) {
                if (isMounted) {
                    setErrorMessage(error instanceof Error ? error.message : "Unknown error")
                    setRepoList([])
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false)
                }
            }
        }

        loadRepoList()

        return () => {
            isMounted = false
        }
    }, [])

    if (isLoading) {
        return (<><h1>Loading repositories...</h1></>)
    }

    if (errorMessage) {
        return (<><h1>Failed to load repositories</h1><p>{errorMessage}</p></>)
    }

    if (repoList.length === 0) {
        return (<><h1>No repositories found</h1></>)
    }

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Owner</th>
                    <th>Commit Count</th>
                    <th>Newest Commit Date</th>
                    <th>Newest Commit Relative</th>
                    <th>Path</th>
                    <th>Remote</th>
                </tr>
            </thead>
            <tbody>
                {repoList.map((repo) => (
                    <tr key={repo.Path}>
                        <td>{repo.Name}</td>
                        <td>{repo.Owner}</td>
                        <td>{repo.CommitCount}</td>
                        <td>{repo.NewestCommitDate}</td>
                        <td>{repo.NewestCommitRelative}</td>
                        <td>{repo.Path}</td>
                        <td>{repo.Remote}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}

// function RepoListingTable() {
//     return (
//             <RepoSummaryTable />
//         // <Suspense fallback={<div>Loading repositories...</div>}>
//         //     <RepoSummaryTable />
//         // </Suspense>
//     )
// }