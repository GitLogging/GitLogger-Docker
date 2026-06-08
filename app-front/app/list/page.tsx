"use client"
import Table from "react-bootstrap/Table"
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import InputGroup from 'react-bootstrap/InputGroup'
import { PageHeaderContent } from "@/app/components/PageHeaderContent"

// import Nav from 'react-bootstrap/Nav'
// import NavBar from 'react-bootstrap/NavBar'
import { Nav, Navbar, NavbarBrand, NavbarCollapse, NavLink, NavbarToggle, NavDropdown, NavDropdownProps } from "react-bootstrap"



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

export default function ListPage() {
    return (
        <>
            {PageHeaderContent()}
            <article>
                <section>
                    <h2>Clone Repository</h2>
                    {CloneRepoUrlForm()}
                </section>
                <section>
                    <h2>Repo Listing</h2>
                    {RepoListingTable()}
                </section>
            </article>
        </>
    )
}
