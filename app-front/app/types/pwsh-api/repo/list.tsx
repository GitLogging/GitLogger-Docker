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

async function fetchAsArray<T>(response: Response): Promise<T[]> {
    /**
     * @summary ensure an endpoint returns an array of that type, even if it's a single value
     */
    const data: T | T[] | null = await response.json()
    if (Array.isArray(data)) {
        return data
    }
    return data ? [data] : []
}

export async function fetchRepoList(repoPattern?: string): Promise<RepoSummaryItem[]> {
    /**
     * @summary fetch metadata from `/repo/list` optionally filtering by OwnerRepoPair with the regex `repoPattern`
     */
    console.info(`Fetching repo list with pattern: ${repoPattern ?? 'none'}`)
    const cacheClearResponse = await fetch("http://127.0.0.1:3001/cache/clear")
    if (!cacheClearResponse.ok) {
        throw new Error(`Failed to clear repository cache: ${cacheClearResponse.status}`)
    }

    const response = await fetch("http://127.0.0.1:3001/repo/list", { cache: "no-store" })
    if (!response.ok) {
        throw new Error(`Failed to fetch repo list: ${response.status}`)
    }
    const repoSummaryList: RepoSummaryItem[] = await fetchAsArray<RepoSummaryItem>(response)

    if (!repoPattern) {
        return repoSummaryList
    }

    const repoRegex = new RegExp(repoPattern, "i")

    return repoSummaryList
        .filter((repo) => repoRegex.test(repo.OwnerRepoPair))
}
export async function fetchRepoListNames(repoPattern?: string): Promise<string[]> {
    /**
     * @summary fetch names from `/repo/list` optionally filtering by OwnerRepoPair with the regex `repoPattern`
     */
    const response = await fetch("http://127.0.0.1:3001/repo/list")
    if (!response.ok) {
        throw new Error(`Failed to fetch repo list: ${response.status}`)
    }

    const repoSummaryList = await fetchAsArray<RepoSummaryItem>(response)

    if (!repoPattern) {
        return repoSummaryList.map((repo) => repo.OwnerRepoPair)
    }

    const repoRegex = new RegExp(repoPattern, "i")
    return repoSummaryList
        .filter((repo) => repoRegex.test(repo.OwnerRepoPair))
        .map((repo) => repo.OwnerRepoPair)
}