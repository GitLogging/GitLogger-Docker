import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { RepoListNamePicker } from "@/app/components/input/RepositoryNamePicker"
import { Suspense } from "react"
import Table from "react-bootstrap/esm/Table"
// import { Table } from "react-bootstrap/Table"
// import Nav from 'react-bootstrap/Nav'
// import NavBar from 'react-bootstrap/NavBar'


export async function RepoSummaryTable() {

    const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    const clonedRepos = await data.json()
    console.warn(`clonedRepos: should be cached`, clonedRepos)

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

function RepoListingTable() {
    return (
        <Suspense fallback={<div>Loading repositories...</div>}>
            <RepoSummaryTable />
        </Suspense>
    )
}