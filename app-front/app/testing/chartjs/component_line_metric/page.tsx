"use client"
// import { useState, Suspense, useEffect } from "react"
import type { ChartOptions } from "chart.js"
import { useMemo, useState } from "react"
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap"
import { BarMetric } from "@/app/components/charts/BarMetric"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
import { CustomLineMetric } from "@/app/components/charts/CustomLineMetric"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { DefaultDeserializer } from "v8"
import { Line } from "react-chartjs-2"

interface DateFnOptionTesting {
    unit: "day" | "week" | "month" | "year"
}

function ShowTopLine() {
    /**
     * $list_repos | sort NewestCommitDate -Descending | select -First 5
     */

    const yourTop5 = [
        "ninmonkey/GitServed",
        // "junegunn/fzf",
        // "microsoft/vscode",
        // "powershell/powershelleditorservices",
        "burntsushi/ripgrep",
    ]

    const period = `day`
    const since = `2.months`
    // const dateFnUnit_Slicer =
    const [dateFnOptionTesting, setDateFnOptionTesting] =
        useState<DateFnOptionTesting["unit"]>(`week`)

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

    // const axisPerWeek: ChartOptions<"line"> = useMemo(
    //     () => ({
    //         scales: {
    //             x: {
    //                 type: "time",
    //                 time: {
    //                     parser: "yyyy-MM-dd",
    //                     unit: dateFnOptionTesting,
    //                     displayFormats: {
    //                         day: "yyyy-MM-dd",
    //                     },
    //                 },
    //             },
    //         },
    //     }),
    //     [dateFnOptionTesting],
    // )

    return (
        <>
            <article>
                <h3>Your Commits</h3>
                <CustomLineMetric
                    DatasetConfig={configTotal1}
                    ChartTitle="Your Top 5 | totalCommits"
                // ChartConfig={axisPerWeek}
                />
                <ButtonGroup>
                    <DropdownButton
                        as={ButtonGroup}
                        title={"date-fn: " + dateFnOptionTesting}
                        id="bg-nested-dropdown"
                    >
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOptionTesting("day")
                            }}
                        >
                            Day
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOptionTesting("week")
                            }}
                        >
                            Week
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOptionTesting("month")
                            }}
                        >
                            Month
                        </Dropdown.Item>
                        <Dropdown.Item
                            onClick={(e) => {
                                e.preventDefault()
                                setDateFnOptionTesting("year")
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
        </>
    )
}
