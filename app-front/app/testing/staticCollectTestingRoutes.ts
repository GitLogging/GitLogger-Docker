import { readdir } from "node:fs/promises"
import path from "node:path"

export type TestingRoute = {
    /** Route segment derived from the testing page folder name, such as "button_counts". */
    name: string
    /** Server-relative URL for the route, such as "/testing/button_counts". */
    url: string
}

const TESTING_ROOT = path.join(process.cwd(), "app", "testing")

export async function staticCollectTestingRoutes(): Promise<TestingRoute[]> {
    /**
     * @summary (static, ran at build time). Collects all routes from the testing directory: `/app/testing/*`
     * @returns A sorted list of testing routes discovered under the directory.
     * @see collectTestingRoutesFromDirectory
     */
    return collectTestingRoutesFromDirectory(TESTING_ROOT)
}

/**
 * Walks the testing route directory and builds a list of route entries.
 *
 * @param directoryPath Absolute    filesystem path to the directory being scanned.
 * @param routePrefix Route segment accumulated from parent folders.
 * @returns A sorted list of testing routes discovered under the directory.
 * @see staticCollectTestingRoutes
 */
async function collectTestingRoutesFromDirectory(
    directoryPath: string,
    routePrefix = "",
): Promise<TestingRoute[]> {
    const entries = await readdir(directoryPath, { withFileTypes: true })
    const routes: TestingRoute[] = []

    for (const entry of entries) {
        if (entry.isDirectory()) {
            const nestedRoutePrefix = routePrefix ? `${routePrefix}/${entry.name}` : entry.name
            const nestedRoutes = await collectTestingRoutesFromDirectory(
                path.join(directoryPath, entry.name),
                nestedRoutePrefix,
            )
            routes.push(...nestedRoutes)
            continue
        }

        if (entry.isFile() && entry.name === "page.tsx" && routePrefix) {
            routes.push({
                name: routePrefix,
                url: `/testing/${routePrefix}`,
            })
        }
    }

    return routes.sort((left, right) => left.name.localeCompare(right.name))
}