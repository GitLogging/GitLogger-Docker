"use client"

import { useEffect, useState } from "react"
import { RepoListItem, RepoListResponse } from "@/app/components/block/RepositorySummaryTable"

export default function RepoListNamePicker() {
    /**
     * @summary Select a repository from the list of known cloned repos
    * gets repo metadata from http://127.0.0.1:3001/repo/list
    * then creates an input select that shows just the OwnerRepoPair by names
    */
    const [repoList, setRepoList] = useState<RepoListItem[]>([])
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
        return (<><p>Loading repositories...</p></>)
    }

    if (errorMessage) {
        return (<><p>Could not load repository list: {errorMessage}</p></>)
    }

    if (repoList.length === 0) {
        return (<><p>No repositories available.</p></>)
    }

    return (
        <>
            <label>
                Repository
                <select name="selectedRepository">
                    {repoList.map((repo) => (
                        <option
                            key={repo.Path}
                            value={repo.Path}>{repo.Name}
                        </option>
                    ))}
                </select>
            </label>
        </>
    )
}