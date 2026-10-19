'use client'

import { useEffect, useId, useState } from "react"
import { fetchRepoList } from "@/app/types/pwsh-api/repo/list"
import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"
import { InputGroup, Form } from "react-bootstrap"

// import { defaultRepoUrlList } from "@/app/default-data/repository-urls"
// import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"
// import { CloneRepoButton } from "@/app/components/input/CloneRepoButton"
// import { InputGroup, Form } from "react-bootstrap"



function DatePeriodPickerInput({
    onPeriodChange,
}: {
    onPeriodChange?: (period: string) => void
}) {
    /**
     * @summary (internal) Builds the input form elements for picking short cloned repo names
     */
    // useId is unique per component instance; it contains ":" which is valid in ids

    const formContents = (
        <>
            <Form.Select size="sm" onChange={(e) => onPeriodChange?.(e.target.value)}>
                <option>day</option>
                <option>week</option>
                <option>month</option>
                <option>year</option>
            </Form.Select>
        </>
    )
    return (
        <>
            {formContents}
        </>
    )
}

/**
 * @summary Select a repository from the list of known cloned "Owner/Repo" pairs. Entry point for this component
 */
export default function DatePeriodPicker({
    onPeriodChange,
}: {
    onPeriodChange?: (period: string) => void
}) {
    /**
     * @summary Git urls to clone. Autocomplete urls, but also allow freeform entry for new ones
     * @description If no list is provided, fallback to example repo urls.
     */

    // const [isSubmitting, setIsSubmitting] = useState(false)

    return (<>
        {/* <div>Date Period</div> */}
        <DatePeriodPickerInput
            onPeriodChange={onPeriodChange}
        />
        {/* <RepoPairPickerInput
            isSubmitting={isSubmitting}
            setIsSubmitting={setIsSubmitting}
            onCloneSettled={onCloneSettled}
            onPeriodChange={onPeriodChange}
        /> */}
    </>
    )
}