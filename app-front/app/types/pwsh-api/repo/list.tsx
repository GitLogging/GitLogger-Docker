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