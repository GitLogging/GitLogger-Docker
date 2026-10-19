'use client'

import { useEffect, useState } from "react"
import { fetchRepoList } from "@/app/types/pwsh-api/repo/list"
import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"
import { InputGroup, Form } from "react-bootstrap"

// import { defaultRepoUrlList } from "@/app/default-data/repository-urls"
// import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"
// import { CloneRepoButton } from "@/app/components/input/CloneRepoButton"
// import { InputGroup, Form } from "react-bootstrap"

interface OwnerOnlyDataListItem {
    /**
     * @summary properties used to create a datalist for `<RepoOwnerOnlyPicker>`
     */
    name: string
    repoCount: number
}
interface NameOnlyDataListItem {
    /**
     * @summary properties used to create a datalist for `<RepoNameOnlyPicker>`
     */
    name: string
    url: string
}

function buildDataList({ dataListId, children }: { dataListId?: string; children?: React.ReactNode }) {
    /**
     * @summary Build a datalist element with the provided list of <options>, or fallback to defaults if no options are provided
     */
    if (!dataListId) {
        console.error(`<RepositoryUrlPicker> -> buildDataList: missing dataListId`)
    }
    if (!children) {
        // console.error(`<RepositoryUrlPicker> -> buildDataList: missing required children`)
        children = BuildInputOptionsFrom([], { label: 'label', value: 'url' })
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

function RepoOwnerOnlyPicker({
    dataListId,
    inputElementId,
    onOwnerChange,
    isInvalid,
}: {
    dataListId: string
    inputElementId: string
    onOwnerChange?: (owner: string) => void
    isInvalid?: boolean
}) {
    /**
     * @summary Select from short OwnerName Only names to choose cloned repos
     */
    return (
        <Form.Control
            type="search"
            list={dataListId}
            id={inputElementId}
            name={inputElementId}
            onChange={(e) => onOwnerChange?.(e.target.value.trim())}
            isInvalid={isInvalid}
            placeholder="Owner Name"
            aria-label="Git Owner Name"
            aria-describedby="git-pair-picker-button" // fix(aria): ensure implemented
            required={false}
        />
    )
}
function RepoNameOnlyPicker({
    dataListId,
    inputElementId,
    onNameChange,
    value,
    isInvalid,
}: {
    dataListId: string
    inputElementId: string
    onNameChange?: (name: string) => void
    value?: string
    isInvalid?: boolean
}) {
    /**
     * @summary Select from short RepoName Only names to choose cloned repos
     */
    return (
        <Form.Control
            type="search"
            list={dataListId}
            id={inputElementId}
            name={inputElementId}
            onChange={(e) => onNameChange?.(e.target.value)}
            onClick={() => onNameChange?.('')} // todo(ux): clear does not update the datalist until second click
            value={value}
            isInvalid={isInvalid}
            placeholder="Repo Name"
            aria-label="Git Repo Name"
            aria-describedby="git-pair-picker-button" // fix(aria): ensure implemented
            required={false}
        />
    )
}

function RepoPairPickerInput({
    isSubmitting,
    setIsSubmitting,
    onCloneSettled,
}: {
    isSubmitting: boolean
    setIsSubmitting: (value: boolean) => void
    onCloneSettled?: () => void
}) {
    /**
     * @summary (internal) Builds the input form elements for picking short cloned repo names
     */
    // should these by dynamic?
    const dataListOwnerOnlyId = `repo-owner-only-picker-source-list`
    const dataListRepoOnlyId = `repo-name-only-picker-source-list`
    const selectedRepoUrlElementId = `repo-remote-url-choice` // # fix(elementId): ensure unique for multiple instances using dynamic id
    const inputOwnerOnlyElementId = `repo-owner-picker-choice` // # fix(elementId): ensure unique for multiple instances using dynamic id
    const inputNameOnlyElementId = `repo-name-picker-choice` // # fix(elementId): ensure unique for multiple instances using dynamic id
    const formId = `repo-pair-picker-form`
    const [ownerOnlyDataList, setOwnerOnlyDataList] = useState<OwnerOnlyDataListItem[]>([])
    const [nameOnlyDataList, setNameOnlyDataList] = useState<NameOnlyDataListItem[]>([])
    const [selectedOwner, setSelectedOwner] = useState('')
    const [selectedName, setSelectedName] = useState('')

    useEffect(() => {
        let cancelled = false
        fetchRepoList()
            .then((items) => {
                if (cancelled) return
                const ownerOnlyCounts = new Map<string, number>()
                for (const item of items) {
                    const owner = item.OwnerRepoPair.split('/')[0]
                    ownerOnlyCounts.set(owner, (ownerOnlyCounts.get(owner) ?? 0) + 1)
                }
                setOwnerOnlyDataList([...ownerOnlyCounts.entries()].map(([name, repoCount]) => ({ name, repoCount })))

                setNameOnlyDataList(items.map(item => {
                    const name = item.OwnerRepoPair.split('/')[1]
                    return { name, url: item.Remote }
                }))
            })
            .catch((error) => {
                console.error(`<OwnerRepoPairPicker>: fetchRepoList failed:`, error)
            })
        return () => {
            cancelled = true
        }
    }, [])

    const ownerOnlyOptions = ownerOnlyDataList.length > 0
        ? ownerOnlyDataList.map(({ name, repoCount }) => (
            <option key={name} value={name} label={String(repoCount)} />
        ))
        : undefined
    const filteredNameOnlyDataList = selectedOwner
        ? nameOnlyDataList.filter(({ url }) => url.includes(`/${selectedOwner}/`))
        : []
    const repoOnlyOptions = filteredNameOnlyDataList.length > 0
        ? filteredNameOnlyDataList.map(({ name, url }) => (
            <option key={url} value={name} label={url} />
        ))
        : undefined
    // const cloneButton = <OwnerRepoPairPicker isLoading={isSubmitting} />

    async function handleSubmitPairPickerForm(e: React.FormEvent<HTMLFormElement>) {
        /**
         * @summary calls `GitServe`'s /repo/clone endpoint
         */
        e.preventDefault() // prevent page reload
        if (isSubmitting) {
            return
        }
        console.log(`<OwnerRepoPairPicker>.onSubmit: NYI`)
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
                <RepoOwnerOnlyPicker
                    dataListId={dataListOwnerOnlyId}
                    inputElementId={inputOwnerOnlyElementId}
                    onOwnerChange={(owner) => {
                        setSelectedOwner(owner)
                        setSelectedName('')
                    }}
                    isInvalid={!selectedOwner}
                />
                <RepoNameOnlyPicker
                    dataListId={dataListRepoOnlyId}
                    inputElementId={inputNameOnlyElementId}
                    onNameChange={setSelectedName}
                    value={selectedName}
                    isInvalid={!selectedName.trim()}
                />
            </InputGroup>
            <InputGroup className="mb-3">
                <Form.Control

                    id={selectedRepoUrlElementId}
                    type="text"
                    placeholder="Repo Url"
                    readOnly
                    value={
                        selectedOwner && selectedName ?
                            nameOnlyDataList
                                .filter((item) => item.name == selectedName)
                                .flatMap((item) => item.url) :
                            ''


                    }
                />
            </InputGroup>

        </div>
    )


    return (
        <>
            <form id={formId} onSubmit={handleSubmitPairPickerForm}>
                {formContents}
            </form>
            {/* <input name="graphtype" id="graphTypeChoice0" value="bar" checked="true" type="checkbox"> */}
            {buildDataList({
                dataListId: dataListOwnerOnlyId,
                children: ownerOnlyOptions,
            })}
            {buildDataList({
                dataListId: dataListRepoOnlyId,
                children: repoOnlyOptions,
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
        <RepoPairPickerInput
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onCloneSettled={onCloneSettled}
        />
    </>
    )
}