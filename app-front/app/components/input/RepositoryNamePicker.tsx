"use client"

import { useEffect, useState } from "react"
import { RepoListApiResponse, RepoListResponse, RepoSummaryItem } from "@/app/types/pwsh-api/repo/list"

export default function RepoListNamePicker() {
    /**
     * @summary Select a repository from the list of known cloned repos
    * gets repo metadata from http://127.0.0.1:3001/repo/list
    * then creates an input select that shows just the OwnerRepoPair by names
    */

    return (
        <>
            <p>repo name picker</p>
        </>
    )
}