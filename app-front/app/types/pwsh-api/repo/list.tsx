export interface RepoSummaryItem {
    /**
     * @summary properties returned from the api endpoint: http://127.0.0.1:3001/repo/list
     */
    Name: string
    Owner: string
    CommitCount: string | number
    NewestCommitDate: string
    NewestCommitRelative: string
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