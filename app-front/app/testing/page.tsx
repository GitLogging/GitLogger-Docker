import { PageHeaderContent } from "@/app/components/PageHeaderContent"

import { staticCollectTestingRoutes } from "./staticCollectTestingRoutes"

export const dynamic = "force-static"

export default async function PageContent() {
    /**
     * @summary this page is for testing individual components
     * */
    const endpoints = await staticCollectTestingRoutes()

    return (
        <>
            <PageHeaderContent />
            <article>
                <h1>/testing Components</h1>
                <section>
                    <ul>
                        {endpoints.map((endpoint) => (
                            <li key={endpoint.url}>
                                <a href={endpoint.url}>{endpoint.name}</a>
                            </li>
                        ))}
                    </ul>
                </section>
            </article>
        </>
    )
}
