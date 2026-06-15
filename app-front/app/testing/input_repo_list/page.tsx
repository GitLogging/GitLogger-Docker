"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { RepoListPicker } from "@/app/components/input/RepositoryNamePicker"

export default function Page() {
    /**
     * @summary this page is for testing individual components
     * */
    return (
        <>
            {PageHeaderContent()}
            <article>
                <section>
                    <h1>Testing single component: input_repo_list</h1>
                </section>
            </article>
        </>
    )
}
