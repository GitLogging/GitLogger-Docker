import { readdir } from "node:fs/promises"
import path from "node:path"

export type TestingRoute = {
    name: string
    url: string
}

const TESTING_ROOT = path.join(process.cwd(), "app", "testing")

export async function collectTestingRoutes(): Promise<TestingRoute[]> {
    return collectTestingRoutesFromDirectory(TESTING_ROOT)
}

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