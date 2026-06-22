/**
 * @summary Select a repository from the list of known cloned repos
 */
export async function RepoListNamePicker() {
    // return (<><h1>'async server func from client fix it'</h1> </>)
    console.warn(`<RepoListNamePicker> clonedRepos: should be cached`)
    const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    const clonedRepos = await data.json()

    return (
        <>
            <label>
                Repository
                <select name="selectedRepository">
                    {clonedRepos.RepoList.map((repo: any) => (
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