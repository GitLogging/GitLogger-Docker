import Image from "next/image"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"
import Table from "react-bootstrap/Table"

async function ExampleTable() {
    const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    const clonedRepos = await data.json()
    console.log(clonedRepos)


    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Owner</th>
                    <th>RepoUrl</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>ugit</td>
                    <td>https://github.com/ugit/repo</td>
                </tr>
                <tr>
                    <td>ripgrep</td>
                    <td>https://github.com/BurntSushi/ripgrep</td>
                </tr>
            </tbody>
        </Table>
    )
}


export async function RepoListingTable() {
    const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    const clonedRepos = await data.json()
    console.log(clonedRepos)

    return (
        <Table striped bordered hover>
            <thead>
                <tr>
                    <th>Name</th>
                    <th>Path</th>
                    <th>Owner</th>
                    <th>LatestCommit</th>
                    <th>CommitCount</th>
                </tr>
            </thead>
            <tbody>
                {clonedRepos.RepoList.map((repo: any) => (
                    // <tr key={repo.id}>
                    <tr key={repo.Path}>
                        <td>{repo.Name}</td>
                        <td>{repo.Path}</td>
                        <td>{repo.Owner}</td>
                        <td>{repo.LatestCommit}</td>
                        <td>{repo.CommitCount}</td>
                    </tr>
                ))}
            </tbody>
        </Table>
    )
}


export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">

            {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start"> */}
            {/* <main className="flex flex-1 w-full max-w-3xl flex-col"> */}
            {/* <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-8"> */}
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center dark:bg-black">

                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        <a href="https://gitlogger.com/">GitLogger</a> <b>Docker App</b>
                    </h2>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Get started by cloning your repository
                    </p>
                </div>

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

                <h2>Cloned Repos</h2>

                <div>
                    {RepoListingTable()}
                </div>

                <h2>Example Repo List</h2>
                <div>
                    {ExampleTable()}
                </div>
            </main>


        </div>
    )
}
