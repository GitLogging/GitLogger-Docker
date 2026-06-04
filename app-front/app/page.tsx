"use client"
import Image from "next/image"
import Stack from "react-bootstrap/Stack"
import Table from "react-bootstrap/Table"
// import Tab from 'react-bootstrap/Tab'
// import Tabs from 'react-bootstrap/Tabs'
import { use } from "react"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'

export async function RepoListingTable() {
    const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    const clonedRepos = await data.json()
    console.log(`clonedRepos:`, clonedRepos)

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
                {clonedRepos.RepoList.map((repo: any) => (
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

export async function CloneRepoUrlForm() {
    const defaultCloneUrl = `https://github.com/sharkdp/fd.git`

    async function handleClick() {
        const hostPort = 3001
        const queryUrl = `http://127.0.0.1:${hostPort}/repo/clone?=url=${defaultCloneUrl}`
        console.log(`clone`, { hostPort, queryUrl })
        // const data = await fetch(queryUrl)
        // const dataJson = data.json()

        // console.log(`click: `, { defaultUrl: defaultUrl })
        // const queryUrl = `http://127.0.0.1:${port}/repo/clone?url=https://github.com/BurntSushi/ripgrep.git"`
        // const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    }
    return (
        <>
            <InputGroup className="mb-3">
                <Form.Control
                    placeholder="Git Repository URL"
                    aria-label="Git Repository URL"
                    aria-describedby="git-repo-clone-button"
                    defaultValue={defaultCloneUrl}
                    onSubmit={handleClick}
                />
                <Button variant="outline-secondary" id="git-repo-clone-button" onClick={handleClick}>
                    Clone
                </Button>
            </InputGroup>
        </>
    )
}

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

            {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
            {/* <main className="flex flex-1 w-full max-w-3xl flex-col"> */}
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-8">
                {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center dark:bg-black"> */}

                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        <a href="https://gitlogger.com/">GitLogger</a> <b>Docker App</b>
                    </h2>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Get started by cloning your repository
                    </p>
                    {CloneRepoUrlForm()}
                </div>

                {RepoListingTable()}
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <Stack direction="horizontal" gap={2}>
                        <Button as="a" variant="primary">
                            Clone Repo
                        </Button>
                        <Button as="a" variant="success">
                            List Repos
                        </Button>
                    </Stack>
                </div>





            </main>


        </div>
    )
}
