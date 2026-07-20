"use client"
import { useEffect, useState } from "react"
import { splitDatasetConfigByUser, DatasetConfig } from "@/app/components/charts/CustomBarMetric"
import { CommitMetricItem } from "@/app/types/pwsh-api/repo/metric/commit"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"

export default function TestSplitDatasetPage() {
    const [rawData, setRawData] = useState<CommitMetricItem[] | null>(null)
    const [uniqueUsers, setUniqueUsers] = useState<string[]>([])
    const [splitConfigs, setSplitConfigs] = useState<DatasetConfig[]>([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState<string | null>(null)

    const testUrl = `http://127.0.0.1:3001/repo/metric/commit?name=junegunn/fzf&since=1.months&period=day`

    useEffect(() => {
        async function runTest() {
            try {
                setLoading(true)
                setError(null)

                // Step 1: Fetch raw data
                console.log("📡 Fetching raw API data...")
                const response = await fetch(testUrl)
                if (!response.ok) {
                    throw new Error(`API call failed with status ${response.status}`)
                }

                const data: CommitMetricItem[] = await response.json()
                console.log("✅ Raw API response:", data)
                setRawData(data)

                // Step 2: Extract unique users
                const users = Array.from(
                    new Map(data.map(item => [item.GitUserName, item])).keys()
                )
                console.log("👥 Unique users found:", users)
                setUniqueUsers(users)

                // Step 3: Call splitDatasetConfigByUser
                console.log("🔄 Calling splitDatasetConfigByUser...")
                const config: DatasetConfig = {
                    RequestUrl: testUrl,
                    XAxisKey: "CommitDate",
                    YAxisKey: "CommitCount",
                }
                const result = await splitDatasetConfigByUser(config)
                console.log("✅ Split configs result:", result)
                setSplitConfigs(result)
            } catch (err) {
                const message = err instanceof Error ? err.message : String(err)
                console.error("❌ Test error:", message)
                setError(message)
            } finally {
                setLoading(false)
            }
        }

        runTest()
    }, [])

    return (
        <>
            <PageHeaderContent />
            <article style={{ padding: "2rem" }}>
                <h1>Test: splitDatasetConfigByUser()</h1>

                <section>
                    <h2>Test Configuration</h2>
                    <pre style={{ background: "#222", padding: "1rem", borderRadius: "4px", overflow: "auto" }}>
                        {JSON.stringify(
                            {
                                testUrl,
                                config: {
                                    RequestUrl: testUrl,
                                    XAxisKey: "CommitDate",
                                    YAxisKey: "CommitCount",
                                }
                            },
                            null,
                            2
                        )}
                    </pre>
                </section>

                {loading && (
                    <section>
                        <h2>⏳ Loading...</h2>
                    </section>
                )}

                {error && (
                    <section>
                        <h2>❌ Error</h2>
                        <pre style={{ background: "#400", padding: "1rem", borderRadius: "4px", color: "#f88" }}>
                            {error}
                        </pre>
                    </section>
                )}

                {!loading && !error && rawData && (
                    <>
                        <section>
                            <h2>📊 Raw API Data</h2>
                            <p><strong>Total records:</strong> {rawData.length}</p>
                            <p><strong>Unique users:</strong> {uniqueUsers.length}</p>
                            <p><strong>User names:</strong> {uniqueUsers.join(", ")}</p>

                            <h3>Sample records (first 5):</h3>
                            <pre style={{ background: "#222", padding: "1rem", borderRadius: "4px", overflow: "auto", maxHeight: "400px" }}>
                                {JSON.stringify(rawData.slice(0, 5), null, 2)}
                            </pre>
                        </section>

                        <section>
                            <h2>🔄 Split Result</h2>
                            <p><strong>Number of configs generated:</strong> {splitConfigs.length}</p>
                            <p><strong>One config per user:</strong> {splitConfigs.length === uniqueUsers.length ? "✅ YES" : "❌ NO"}</p>

                            <h3>Generated configs:</h3>
                            <pre style={{ background: "#222", padding: "1rem", borderRadius: "4px", overflow: "auto", maxHeight: "600px" }}>
                                {JSON.stringify(splitConfigs, null, 2)}
                            </pre>

                            <h3>Verification:</h3>
                            <ul>
                                {splitConfigs.map((config, index) => (
                                    <li key={index}>
                                        <strong>{config.DatasetLabel}</strong>
                                        {" - "}
                                        GitUserName field: {config.GitUserName || "(not set)"} {config.GitUserName ? "✅" : "❌"}
                                        {" - "}
                                        RequestUrl matches: {config.RequestUrl === testUrl ? "✅" : "❌"}
                                    </li>
                                ))}
                            </ul>

                            <h3>Data Filtering Verification:</h3>
                            <p>
                                When these configs are used in a chart component, the data will be filtered 
                                by GitUserName so each dataset only shows that user's commits.
                            </p>
                            {rawData && uniqueUsers.map((userName) => {
                                const userRecords = rawData.filter(item => item.GitUserName === userName)
                                return (
                                    <div key={userName} style={{ marginBottom: "1rem", padding: "1rem", background: "#1a1a1a", borderRadius: "4px" }}>
                                        <strong>{userName}</strong>: {userRecords.length} records
                                        <ul style={{ marginTop: "0.5rem", fontSize: "0.9em" }}>
                                            {userRecords.slice(0, 3).map((record, idx) => (
                                                <li key={idx}>
                                                    {record.CommitDate} - {record.CommitCount} commits
                                                </li>
                                            ))}
                                            {userRecords.length > 3 && <li>... and {userRecords.length - 3} more</li>}
                                        </ul>
                                    </div>
                                )
                            })}
                        </section>
                    </>
                )}
            </article>
        </>
    )
}
