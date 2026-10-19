'use client'

import { useEffect, useState } from "react"
import { fetchRepoList, type RepoSummaryItem } from "@/app/types/pwsh-api/repo/list"
import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"
import { defaultRepoUrlList } from "@/app/default-data/repository-urls"
import { InputGroup, Form } from "react-bootstrap"

// import { defaultRepoUrlList } from "@/app/default-data/repository-urls"
// import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"
// import { CloneRepoButton } from "@/app/components/input/CloneRepoButton"
// import { InputGroup, Form } from "react-bootstrap"

function buildDataList({ dataListId, children }: { dataListId?: string; children?: React.ReactNode }) {
    /**
     * @summary Build a datalist element with the provided list of <options>, or fallback to defaults if no options are provided
     */
    if (!dataListId) {
        console.error(`<RepositoryUrlPicker> -> buildDataList: missing dataListId`)
    }
    if (!children) {
        // console.error(`<RepositoryUrlPicker> -> buildDataList: missing required children`)
        children = BuildInputOptionsFrom(defaultRepoUrlList, { label: 'label', value: 'url' })
    }
    /*
    example output:
        <option
        label="VS Code"
            value="https://github.com/microsoft/vscode"
            data-repo-url="https://github.com/microsoft/vscode"
        ></option>
    */
    return (
        <datalist id={dataListId}>
            {/*

          `Option.Label` is optional, but can be used to provide a more human-readable name for the url
          */}
            {children}
        </datalist>
    )
}

function PairPickerForm({
    isSubmitting,
    setIsSubmitting,
    onCloneSettled,
}: {
    isSubmitting: boolean
    setIsSubmitting: (value: boolean) => void
    onCloneSettled?: () => void
}) {
    /**
     * @summary (internal) Builds the input form elements for listing and cloning repo urls
     */
    // should these by dynamic?
    const dataListId = `repo-name-picker-source-list`
    const inputElementId = `repo-name-picker-choice`
    const formId = `clone-repo-form`
    const [repoList, setRepoList] = useState<RepoSummaryItem[]>([])

    useEffect(() => {
        let cancelled = false
        fetchRepoList()
            .then((items) => {
                if (cancelled) return
                const byOwner = new Map<string, RepoSummaryItem>()
                for (const item of items) {
                    const owner = item.OwnerRepoPair.split('/')[0]
                    if (!byOwner.has(owner)) byOwner.set(owner, item)
                }
                setRepoList([...byOwner.values()])
            })
            .catch((error) => {
                console.error(`<OwnerRepoPairPicker>: fetchRepoList failed:`, error)
            })
        return () => {
            cancelled = true
        }
    }, [])

    const repoOptions = repoList.length > 0
        ? repoList.map((repo) => (
            <option key={repo.OwnerRepoPair.split('/')[0]} value={repo.OwnerRepoPair.split('/')[0]} label={repo.Remote} />
        ))
        : undefined
    // const cloneButton = <OwnerRepoPairPicker isLoading={isSubmitting} />

    async function handleSubmitCloneRepo(e: React.FormEvent<HTMLFormElement>) {
        /**
         * @summary calls `GitServe`'s /repo/clone endpoint
         */
        e.preventDefault() // prevent page reload
        if (isSubmitting) {
            return
        }

        console.log('Clone url: ', { eventObj: e })
        const formData = new FormData(e.currentTarget)
        const port = 3001
        const cloneUrlValue = formData.get(inputElementId)
        const cloneUrl = typeof cloneUrlValue === 'string' ? cloneUrlValue : ''
        const requestUrl = `http://127.0.0.1:${port}/repo/clone?url=${encodeURIComponent(cloneUrl)}`
        // `http://127.0.0.1:${hostPort}/repo/clone?url=${encodeURIComponent(cloneUrl)}`

        setIsSubmitting(true)
        try {
            const response = await fetch(requestUrl)
            if (!response.ok) {
                throw new Error(`Clone request failed with status ${response.status}`)
            }
            const data = await response.json()
            console.log(`<OwnerRepoPairPicker>.onSubmit: response:`, data)
        }
        catch (error) {
            console.error(`<OwnerRepoPairPicker>.onSubmit: promise threw when cloning repo:`, error)
        }
        finally {
            onCloneSettled?.()
            setIsSubmitting(false)
        }

        console.log(`<OwnerRepoPairPicker>.onSubmit(Sync): request`, { port: port, eventObj: e })

    }

    const formContents = (
        <div
            className={'mb-3 input-group'}
            style={{
                // display: 'flex',
                // alignItems: 'center',
                // gap: '1.5ch',
            }}
        >
            <InputGroup className="mb-3">
                <Form.Control
                    type="search"
                    list={dataListId}
                    id={inputElementId}
                    name={inputElementId}
                    placeholder="Enter a git repository url"
                    aria-label="Git Repository URL"
                    aria-describedby="git-repo-clone-button"
                    required={false}
                // defaultValue={true ? `` : `https://github.com/microsoft/vscode-powerquery`}
                >

                </Form.Control>
                {/* {cloneButton} */}
            </InputGroup>
            {/* <input
                style={{
                    flexGrow: 2,
                }}
                type="search"
                list={dataListId}
                id={inputElementId}
                name={inputElementId}
                defaultValue={true ? `` : `https://github.com/microsoft/vscode-powerquery`}
                placeholder="Enter a git repository url"
                required={false}
            /> */}

        </div>
    )


    return (
        <>
            <form id={formId} onSubmit={handleSubmitCloneRepo}>
                {formContents}
            </form>
            {/* <input name="graphtype" id="graphTypeChoice0" value="bar" checked="true" type="checkbox"> */}
            {buildDataList({
                dataListId: dataListId,
                children: repoOptions,

            })}

            {/* end of: div#mainFormContent */}
        </>
    )
}

/**
 * @summary Select a repository from the list of known cloned "Owner/Repo" pairs. Entry point for this component
 */
export default function OwnerRepoPairPicker({
    onCloneSettled,
}: {
    onCloneSettled?: () => void
}) {
    /**
     * @summary Git urls to clone. Autocomplete urls, but also allow freeform entry for new ones
     * @description If no list is provided, fallback to example repo urls.
     */

    const [isSubmitting, setIsSubmitting] = useState(false)

    return (<>
        <h1>Owner/Repo pair picker here</h1>
        {/* <CloneRepoForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onCloneSettled={onCloneSettled}
        /> */}
        <PairPickerForm
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onCloneSettled={onCloneSettled}
        />
    </>
    )
}