"use client";
// import { useState, Suspense, useEffect } from "react"
import type { ChartOptions } from "chart.js";
import { useMemo, useState } from "react";
import { ButtonGroup, Dropdown, DropdownButton } from "react-bootstrap";
import { BarMetric } from "@/app/components/charts/BarMetric";
import { CustomBarMetric } from "@/app/components/charts/CustomBarMetric";
import { PageHeaderContent } from "@/app/components/PageHeaderContent";

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
  );
}

interface DateFnOption {
  unit: "day" | "week" | "month" | "year";
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
  ];

  const period = `day`;
  const since = `2.months`;
  // const dateFnUnit_Slicer =
  const [dateFnOption, setDateFnOption] =
    useState<DateFnOption["unit"]>(`week`);

  const configTotal1 = useMemo(
    () =>
      yourTop5.map((repo) => ({
        RequestUrl: `http://127.0.0.1:3001/repo/metric/totalcommit?name=${repo}&period=${period}&since=${since}`,
        XAxisKey: `XAxisKey`,
        YAxisKey: `TotalCommits`,
        DatasetLabel: repo.split("/")[1],
      })),
    [],
  );

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
  );

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
            title="date-fn"
            id="bg-nested-dropdown"
          >
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setDateFnOption("day");
              }}
            >
              Day
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setDateFnOption("week");
              }}
            >
              Week
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setDateFnOption("month");
              }}
            >
              Month
            </Dropdown.Item>
            <Dropdown.Item
              onClick={(e) => {
                e.preventDefault();
                setDateFnOption("year");
              }}
            >
              Year
            </Dropdown.Item>
          </DropdownButton>
        </ButtonGroup>
      </article>
    </>
  );
}

export default function Page() {
  return (
    <>
      <PageHeaderContent />
      <ShowTop5 />
      {false && <PageSummary />}
    </>
  );
}
