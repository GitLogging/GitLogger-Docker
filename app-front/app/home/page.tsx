"use client"
// import { useState, Suspense, useEffect } from "react"
import type { ChartOptions } from "chart.js"
import { useMemo, useState, useEffect } from "react"
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
import { BarMetric } from "@/app/components/charts/BarMetric"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
import { CustomLineMetric } from "@/app/components/charts/CustomLineMetric"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { DefaultDeserializer } from "v8"
import { Line } from "react-chartjs-2"

// import { InputGroup, Form, Button } from "react-bootstrap"
// import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
// import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
// import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
// import { CommitMetricItem, CommitMetricUrl, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
// import { FlatLineChart } from "@/app/components/charts/FlatLineChart"

function PageSummary() {
    return (
        <>
            <article>
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=startAutomating/GitLogger&since=12.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />

                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=12.months&period=month",
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=startAutomating/GitLogger&since=12.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/emoji&since=30.months&period=month",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=startAutomating/GitLogger&since=12.months&period=day",
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=month",
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
                <BarMetric
                    RequestUrl={[
                        "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/GitLogger&since=30.months&period=day",
                        // "http://127.0.0.1:3001/repo/metric/commit?name=StartAutomating/pssvg&since=30.months&period=month",
                    ]}
                />
            </article>
        </>
    )
}

interface DateFnOption {
    unit: "day" | "week" | "month" | "year"
}
function ShowTop5() {
    /**
     * $list_repos | sort NewestCommitDate -Descending | select -First 5
     */

    const yourTop5 = [
        "ninmonkey/GitServed",
        "junegunn/fzf",
        "microsoft/vscode",
        "powershell/powershelleditorservices",
        "burntsushi/ripgrep",
    ]

    const period = `month`
    const since = `2.months`
    // const dateFnUnit_Slicer =
    const [dateFnOption, setDateFnOption] =
        useState<DateFnOption["unit"]>(`week`)

    const configTotal1 = useMemo(
        () =>
            yourTop5.map((repo) => ({
                RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repo}&period=${period}&since=${since}`,
                XAxisKey: `XAxisKey`,
                YAxisKey: `TotalCommits`,
                DatasetLabel: repo.split("/")[1],
            })),
        [],
    )

    const axisPerWeek: ChartOptions<"bar"> = useMemo(
        () => ({
            scales: {
                x: {
                    stacked: true,
                    type: "time",
                    time: {
                        parser: "yyyy-MM-dd",
                        unit: dateFnOption,
                        displayFormats: {
                            day: "yyyy-MM-dd",
                        },
                    },
                },
            },
        }),
        [dateFnOption],
    )

    return (
        <>
            <article>
                <h3>Your Top 5</h3>
                <CustomBarMetric
                    DatasetConfig={configTotal1}
                    ChartTitle="Your Top 5 | totalCommits"
                />
                <h3>
                    Your top 5 (using <strong>date-fn</strong> per <strong>week</strong>)
                </h3>
                <CustomBarMetric
                    DatasetConfig={configTotal1}
                    ChartTitle="Your Top 5 | totalCommits (date-fn per week)"
                    ChartConfig={axisPerWeek}
                // ChartConfig={axisPerMonth}
                // Options={{
                //     AutoSplitDatasets: false,
                // }}
                // ChartConfig={opts1}
                />
                <ButtonGroup>
                    <DropdownButton
                        as={ButtonGroup}
                        title={"date-fn: " + dateFnOption}
                        id="bg-nested-dropdown"
                    >
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("day")
                            }}
                        >
                            Day
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("week")
                            }}
                        >
                            Week
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("month")
                            }}
                        >
                            Month
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("year")
                            }}
                        >
                            Year
                        </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </article>
        </>
    )
}
function ShowTopLine() {
    /**
     * $list_repos | sort NewestCommitDate -Descending | select -First 5
     */

    const selectAuthorNin = [
        "ninmonkey/GitServed",
        "GitLogging/GitLogger-Docker",
        // "junegunn/fzf",
        // "microsoft/vscode",
        // "powershell/powershelleditorservices",
    ]

    const period = `day`
    const since = `2.months`
    // const dateFnUnit_Slicer =
    const [dateFnOption, setDateFnOption] =
        useState<DateFnOption["unit"]>(`week`)

    const configTotalNin1 = useMemo(
        () =>
            selectAuthorNin.map((repo) => ({
                RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repo}&period=${period}&since=${since}`,
                XAxisKey: `XAxisKey`,
                YAxisKey: `TotalCommits`,
                DatasetLabel: repo.split("/")[1],
            })),
        [],
    )

    // Fetch and cache the dynamic list of repos matching startautomating|gitlogger pattern
    const [automatingRepoList, setAutomatingRepoList] = useState<string[]>([])
    // Fetch repo list on component mount
    useEffect(() => {
        const fetchRepoList = async () => {
            try {
                const response = await fetch('http://127.0.0.1:3001/repo/list')
                if (!response.ok) throw new Error('Failed to fetch repo list')
                const repos = await response.json()

                // Filter repos matching startautomating|gitlogger pattern and extract OwnerRepoPair
                const filteredRepos = repos
                    .filter((repo: { OwnerRepoPair: string }) =>
                        /startautomating|gitlogger/i.test(repo.OwnerRepoPair)
                    )
                    .flatMap((repo: { OwnerRepoPair: string }) => repo.OwnerRepoPair)

                setAutomatingRepoList(filteredRepos)
            } catch (error) {
                console.error('Error fetching repository list:', error)
                setAutomatingRepoList([])
            }
        }

        fetchRepoList()
    }, [])

    const periodAutomating = `month`
    const afterAutomating = `2020-01-01`

    const selectAuthorAutomating = [
        'StartAutomating/PSAdapter', // PSAdapter-Init',
        'StartAutomating/ugit', // ugit-updates',
        'StartAutomating/escape'
    ]


    const configTotal_Automating_SelectHistory = useMemo(
        () =>
            selectAuthorAutomating.map((repo) => ({
                // &since=${since}
                RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repo}&period=${periodAutomating}&after=${afterAutomating}`,
                XAxisKey: `XAxisKey`,
                YAxisKey: `TotalCommits`,
                DatasetLabel: repo.split("/")[1],
            })),
        [selectAuthorAutomating, periodAutomating, afterAutomating],
    )

    const configTotal_Automating_AllHistory = useMemo(
        () =>
            automatingRepoList.map((repo) => ({
                // &since=${since}
                RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repo}&period=${periodAutomating}&after=${afterAutomating}`,
                XAxisKey: `XAxisKey`,
                YAxisKey: `TotalCommits`,
                DatasetLabel: repo.split("/")[1],
            })),
        [automatingRepoList, periodAutomating, afterAutomating],
    )

    const axisPerMonth: ChartOptions<"line"> =
    {
        scales: {
            x: {
                type: "time",
                time: {
                    parser: "yyyy-MM-dd",
                    unit: `month`,
                    displayFormats: {
                        day: "yyyy-MM-dd",
                    },
                },
            },
        },
    }



    return (
        <>
            <article>
                <h3>Pulse for StartAutomating</h3>
                <CustomLineMetric
                    ChartTitle="pulse: PsSVG | totalCommits | Monthly"
                    DatasetConfig={{
                        RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${`startautomating/pssvg`}&period=${`month`}`,

                        XAxisKey: `XAxisKey`,
                        YAxisKey: `TotalCommits`,
                        DatasetLabel: `PsSvg`
                    }}
                    ChartConfig={axisPerMonth}
                />
                {/* <CustomLineMetric
                    ChartTitle="pulse: PsSVG | totalCommits Monthly"
                    DatasetConfig={{
                        RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${`startautomating/pssvg`}&period=${`month`}`,

                        XAxisKey: `XAxisKey`,
                        YAxisKey: `TotalCommits`,
                        DatasetLabel: `PsSvg`
                    }}
                // ChartConfig={axisPerWeek}
                /> */}
                <h3>Recent for Ninmonkey</h3>
                <CustomLineMetric
                    DatasetConfig={configTotalNin1}
                    ChartTitle="recent: Nin | totalCommits"
                // ChartConfig={axisPerWeek}
                />
                <h3>Select History for StartAutomating</h3>
                <CustomLineMetric
                    DatasetConfig={configTotal_Automating_SelectHistory}
                    ChartTitle="Pulse: StartAutomating | totalCommits | Monthly"
                    ChartConfig={axisPerMonth}
                />
                <h3>All Repos for StartAutomating</h3>
                <CustomLineMetric
                    DatasetConfig={configTotal_Automating_AllHistory}
                    ChartTitle="Pulse: StartAutomating | totalCommits | Monthly"
                    ChartConfig={axisPerMonth}
                />
                <ButtonGroup>
                    <DropdownButton
                        as={ButtonGroup}
                        title={"date-fn: " + dateFnOption}
                        id="bg-nested-dropdown"
                    >
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("day")
                            }}
                        >
                            Day
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("week")
                            }}
                        >
                            Week
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("month")
                            }}
                        >
                            Month
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOption("year")
                            }}
                        >
                            Year
                        </Dropdown.Item>
                    </DropdownButton>
                </ButtonGroup>
            </article>
        </>
    )
}

export default function Page() {
    return (
        <>
            <PageHeaderContent />
            <ShowTopLine />
            {true && <ShowTop5 />}
            {false && <PageSummary />}
        </>
    )

}
