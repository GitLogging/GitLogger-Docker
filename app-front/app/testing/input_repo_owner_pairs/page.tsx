"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
// import { RepoListPicker } from "@/app/components/input/RepositoryNamePicker"
import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"

import OwnerRepoPairPicker from "@/app/components/input/OwnerRepoPairPicker"

export default function Page() {
    /**
     * @summary this page is for testing individual components
     * */
    return (
        <>
            <PageHeaderContent />
            <article>
                <section>
                    <h1>Choose owner/repo pairs</h1>
                    <OwnerRepoPairPicker />

                </section>
            </article>
        </>
    )
}
