"use client"
// import { useState, Suspense, useEffect } from "react"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric"
import { ChartOptions } from "chart.js"
import { config } from "next/dist/build/templates/pages"
// import { InputGroup, Form, Button } from "react-bootstrap"
// import RepoListNamePicker from "@/app/components/input/RepositoryNamePicker"
// import { RepoSummaryTable } from "@/app/components/block/RepositorySummaryTable"
// import { CloneRepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"
// import { CommitMetricItem, CommitMetricUrl, MetricCommitToChartData } from "@/app/types/pwsh-api/repo/metric/commit"
// import { FlatLineChart } from "@/app/components/charts/FlatLineChart"

function Chart1() {
    const chart1 = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=day`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        }]

    const chart2 = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        }]
    const chart3 = [
        ...chart1,
        ...chart2,
    ]

    return (

        <>
            <article>
                <h2>button for scales.stackX toggle</h2>

                <CustomBarMetric
                    DatasetConfig={chart3}
                    ChartTitle="1:3"

                />
                <CustomBarMetric
                    DatasetConfig={chart1}
                    ChartTitle="1:1"
                />
                <CustomBarMetric
                    DatasetConfig={chart2}
                    ChartTitle="1:2"
                />
            </article>
        </>

    )
}
function Chart2() {
    const config = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        },
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
            XAxisKey: `CommitDate`,
            YAxisKey: `LinesChanged`,
            DatasetLabel: `LinesChanged`
        }
    ]

    const opts1: ChartOptions<'bar'> = {
        scales: {
            x: {
                stacked: false,
                // stacked: true,
                type: 'category',
            },
            y: {
                stacked: true,
            },
        },
    }
    const opts2: ChartOptions<'bar'> = {
        scales: {
            x: {
                stacked: true,
                type: 'category',
            },
            y: {
                stacked: true,
            },
        },
    }
    return (

        <>
            <article>
                <h2><strong>NYI:</strong> show two different metrics stacked on bars, ex: total lines changed: inserts vs deletions</h2>

                <CustomBarMetric
                    DatasetConfig={config}
                    ChartTitle="2:2 | opts2"
                    ChartConfig={opts2}
                />
                <CustomBarMetric
                    DatasetConfig={config}
                    ChartTitle="2:1 | opts1"
                    ChartConfig={opts1}
                />
            </article>
        </>

    )

}
function Chart3() {
    const config1 = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=day`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        },
        // {
        //     RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
        //     XAxisKey: `CommitDate`,
        //     YAxisKey: `LinesChanged`,
        //     DatasetLabel: `LinesChanged`
        // }
    ]
    const config2 = [
        {
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=month`,
            XAxisKey: `DateDisplay`,  // Use DateDisplay instead of CommitDate
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount`
        },
        // {
        //     RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
        //     XAxisKey: `CommitDate`,
        //     YAxisKey: `LinesChanged`,
        //     DatasetLabel: `LinesChanged`
        // }
    ]

    // const opts1: ChartOptions<'bar'> = {
    //     scales: {
    //         x: {
    //             stacked: false,
    //             // stacked: true,
    //             type: 'category',
    //         },
    //         y: {
    //             stacked: true,
    //         },
    //     },
    // }
    const axisPerDay: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: "yyyy-MM-dd'T'HH:mm:ssXXX",  // Matches CommitDate format with timezone
                    unit: 'day',
                    displayFormats: {
                        day: 'yyyy-MM-dd'
                    },
                    ticks: {
                        maxTicksLimit: 20
                    }
                }
            }
        }
    }
    const axisPerMonth: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: "yyyy-MM-dd'T'HH:mm:ssXXX",  // Matches CommitDate format with timezone
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM yyyy'
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }
            }
        }
    }

    return (

        <>
            <article>

                <h3>comparing auto format for days vs months</h3>
                {/* <CustomBarMetric
                    DatasetConfig={config}
                    ChartTitle="2:2 | opts2"
                    ChartConfig={opts2}
                /> */}
                <CustomBarMetric
                    DatasetConfig={config1}
                    ChartTitle="3:1:B | default"
                // ChartConfig={opts1}
                />
                <CustomBarMetric
                    DatasetConfig={config1}
                    ChartTitle="3:1:A | axisPerDay"
                    ChartConfig={axisPerDay}
                // ChartConfig={opts1}
                />
                <CustomBarMetric
                    DatasetConfig={config1}
                    ChartTitle="3:1:C | axisPerMonth"
                    ChartConfig={axisPerMonth}
                // ChartConfig={opts1}
                />
                <CustomBarMetric
                    DatasetConfig={config2}
                    ChartTitle="3:2:A | default"
                />
                <CustomBarMetric
                    DatasetConfig={config2}
                    ChartTitle="3:2:B | axisPerDay"
                    ChartConfig={axisPerDay}
                />
                <CustomBarMetric
                    DatasetConfig={config2}
                    ChartTitle="3:2:C | axisPerMonth"
                    ChartConfig={axisPerMonth}
                />
            </article>
        </>

    )

}
function Chart4() {
    const config1 = [
        {
            // RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&since=12.months&period=day`,
            RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=junegunn/fzf&since=12.months&period=day`,
            XAxisKey: `CommitDate`,
            YAxisKey: `CommitCount`,
            DatasetLabel: `CommitCount: GitServed`
        },
        // {
        //     RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/TinyBits&since=12.months&period=day`,
        //     XAxisKey: `CommitDate`,
        //     YAxisKey: `CommitCount`,
        //     DatasetLabel: `CommitCount`
        // },
        // {
        //     RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
        //     XAxisKey: `CommitDate`,
        //     YAxisKey: `LinesChanged`,
        //     DatasetLabel: `LinesChanged`
        // }
    ]
    // const config2 = [
    //     {
    //         RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/Mintils.ps1&since=12.months&period=month`,
    //         XAxisKey: `CommitDate`,
    //         YAxisKey: `CommitCount`,
    //         DatasetLabel: `CommitCount`
    //     },
    //     // {
    //     //     RequestUrl: `http://127.0.0.1:3001/repo/metric/commit?name=ninmonkey/GitServed&period=month`,
    //     //     XAxisKey: `CommitDate`,
    //     //     YAxisKey: `LinesChanged`,
    //     //     DatasetLabel: `LinesChanged`
    //     // }
    // ]

    // const opts1: ChartOptions<'bar'> = {
    //     scales: {
    //         x: {
    //             stacked: false,
    //             // stacked: true,
    //             type: 'category',
    //         },
    //         y: {
    //             stacked: true,
    //         },
    //     },
    // }
    const axisPerDay: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: "yyyy-MM-dd'T'HH:mm:ssXXX",  // Matches CommitDate format with timezone
                    unit: 'day',
                    displayFormats: {
                        day: 'yyyy-MM-dd'
                    },
                    ticks: {
                        maxTicksLimit: 20
                    }
                }
            }
        }
    }
    const axisPerMonth: ChartOptions<'bar'> = {
        scales: {
            x: {
                type: 'time',
                time: {
                    parser: "yyyy-MM-dd'T'HH:mm:ssXXX",  // Matches CommitDate format with timezone
                    unit: 'month',
                    displayFormats: {
                        month: 'MMM yyyy'
                    },
                    ticks: {
                        maxTicksLimit: 12
                    }
                }
            }
        }
    }

    return (

        <>
            <article>

                <h3>multiple datasets on one axis</h3>
                {/* <CustomBarMetric
                    DatasetConfig={config}
                    ChartTitle="2:2 | opts2"
                    ChartConfig={opts2}
                /> */}
                <CustomBarMetric
                    DatasetConfig={config1}
                    ChartTitle="4:1:A | axisPerDay"
                    ChartConfig={axisPerDay}
                // ChartConfig={opts1}
                />
            </article>
        </>

    )

}

export default function Page() {
    return (
        <>
            <PageHeaderContent />
            <Chart4 />
            <Chart3 />
            {/* <Chart1 /> */}
            {/*
             */}
            {/* <Chart2 /> */}
        </>
    )
}
