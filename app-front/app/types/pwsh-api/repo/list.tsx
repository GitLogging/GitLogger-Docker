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

export interface RepoListResponse {
    /**
     * @summary array of records from the api endpoint: http://127.0.0.1:3001/repo/list
     */
    RepoList?: RepoSummaryItem[]
}

export type RepoListApiResponse = RepoSummaryItem[] | RepoListResponse

export async function fetchRepoList(repoPattern: string): Promise<string[]> {
    const response = await fetch("http://127.0.0.1:3001/repo/list")
    if (!response.ok) {
        throw new Error(`Failed to fetch repo list: ${response.status}`)
    }

    const clonedRepos: RepoListApiResponse = await response.json()
    const repoSummaryList = Array.isArray(clonedRepos)
        ? clonedRepos
        : Array.isArray(clonedRepos.RepoList)
            ? clonedRepos.RepoList
            : []

    const repoRegex = new RegExp(repoPattern, "i")
    return repoSummaryList
        .filter((repo) => repoRegex.test(repo.OwnerRepoPair))
        .map((repo) => repo.OwnerRepoPair)
}