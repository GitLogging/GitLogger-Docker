/**
 * @summary Select a repository from the list of known cloned repos
 */
export async function RepoListNamePicker() {
    const data = await fetch(`http://127.0.0.1:3001/repo/list`)
    const clonedRepos = await data.json()
    console.warn(`clonedRepos: should be cached`, clonedRepos)

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