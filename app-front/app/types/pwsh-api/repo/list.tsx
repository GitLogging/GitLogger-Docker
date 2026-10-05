export interface RepoSummaryItem {
    /**
     * @summary properties returned from the api endpoint: http://127.0.0.1:3001/repo/list
     */
    Name: string
    NewestCommitDate: string
    NewestCommitRelative: string
    Owner: string
    OwnerRepoPair: string
    Path: string
    Remote: string
}
// for endpoint: /repo/list
// export type RepoListApiResponse = RepoSummaryItem[]

export async function fetchRepoList(): Promise<RepoSummaryItem[]> {
    /**
     * @summary fetch metadata from `/repo/list` optionally filtering by OwnerRepoPair with the regex `repoPattern`
     */
    const response = await fetch("http://127.0.0.1:3001/repo/list")
    if (!response.ok) {
        throw new Error(`Failed to fetch repo list: ${response.status}`)
    }
    const repoSummaryList: RepoSummaryItem[] = await response.json()
    return repoSummaryList
}
export async function fetchRepoListNames(repoPattern?: string): Promise<string[]> {
    /**
     * @summary fetch names from `/repo/list` optionally filtering by OwnerRepoPair with the regex `repoPattern`
     */
    const response = await fetch("http://127.0.0.1:3001/repo/list")
    if (!response.ok) {
        throw new Error(`Failed to fetch repo list: ${response.status}`)
    }

    const repoSummaryList: RepoSummaryItem[] = await response.json()

    if (!repoPattern) {
        return repoSummaryList.map((repo) => repo.OwnerRepoPair)
    }

    const repoRegex = new RegExp(repoPattern, "i")
    return repoSummaryList
        .filter((repo) => repoRegex.test(repo.OwnerRepoPair))
        .map((repo) => repo.OwnerRepoPair)
}