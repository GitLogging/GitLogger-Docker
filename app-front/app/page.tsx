"use client"
import Image from "next/image"
// import Stack from "react-bootstrap/Stack"
import { use } from "react"
// import Button from 'react-bootstrap/Button'
import { PageHeaderContent } from "./components/PageHeaderContent"

export function OriginalGitloggerSite() {
    console.log(`skip components`)
    // return (

    //     <article>
    //         {PageHeaderContent()}
    //     </article>
    // )

    return (
        <article>
            {PageHeaderContent()}
            <section className="callout">
                <div className="callout-img">
                    {/* <img src="./img/screenshot/busymonth-by-repo-commits.png" alt="Busiest month by repo commits chart"> */}
                </div>
                <div className="callout-text">
                    <h2>Know Your Busiest Days</h2>
                    <p>See commit volume across all your repos at a glance. GitLogger surfaces your team's most active periods so you can plan
                        sprints, spot burnout early, and celebrate momentum when it matters.</p>
                    <p className="callout-detail">Understand the rhythm of your codebase — by week, by month, by repo.</p>
                </div>
            </section>

            <section className="callout callout--reverse">
                <div className="callout-img">
                    {/* <img src="./img/screenshot/cluster-commits-by-repo-and-author.png" alt="Commit clusters by repo and author chart"> */}
                </div>
                <div className="callout-text">
                    <h2>See Every Contributor's Impact</h2>
                    <p>Compare commit activity across repos and authors in a single view. GitLogger helps you understand who is driving
                        progress, where effort is concentrated, and how your team stacks up across projects.</p>
                    <p className="callout-detail">Know your repos inside and out — and the people behind every push.</p>
                </div>
            </section>

            <section className="metrics" id="metrics">
                <h2 className="metrics-heading">What GitLogger Measures</h2>
                <p className="metrics-sub">Every metric is computed per contributor and per repo, so comparisons are always apples-to-apples.</p>
                <ul className="metrics-grid">
                    <li>
                        <span className="metric-name">Attach Rate</span>
                        <span className="metric-desc">Percentage of commit messages that reference an issue number or pull request.</span>
                    </li>
                    <li>
                        <span className="metric-name">Busy Day of Week</span>
                        <span className="metric-desc">Total lines changed broken down by day of week.</span>
                    </li>
                    <li>
                        <span className="metric-name">Busy Month</span>
                        <span className="metric-desc">Total lines changed broken down by calendar month.</span>
                    </li>
                    <li>
                        <span className="metric-name">Churn</span>
                        <span className="metric-desc">Average number of files touched per commit, per contributor.</span>
                    </li>
                    <li>
                        <span className="metric-name">Commit Cadence</span>
                        <span className="metric-desc">Total commits per contributor divided by their active timeframe.</span>
                    </li>
                    <li>
                        <span className="metric-name">Commit Count</span>
                        <span className="metric-desc">Raw number of commits by each contributor.</span>
                    </li>
                    <li>
                        <span className="metric-name">Commit Message Prefix</span>
                        <span className="metric-desc">Breakdown of conventional-style prefixes used in commit messages.</span>
                    </li>
                    <li>
                        <span className="metric-name">Commit Repeats</span>
                        <span className="metric-desc">Total repeated commit messages per user — a signal for copy-paste habits.</span>
                    </li>
                    <li>
                        <span className="metric-name">Commits by Language</span>
                        <span className="metric-desc">Percentage of commits referencing specific programming languages.</span>
                    </li>
                    <li>
                        <span className="metric-name">Issue Breadth</span>
                        <span className="metric-desc">Distinct number of issues mentioned in commits by user.</span>
                    </li>
                    <li>
                        <span className="metric-name">Line Cadence</span>
                        <span className="metric-desc">Total lines changed per user divided by the time between commits.</span>
                    </li>
                    <li>
                        <span className="metric-name">Lines Changed</span>
                        <span className="metric-desc">Total insertions and deletions attributed to each user.</span>
                    </li>
                    <li>
                        <span className="metric-name">Net Line Cadence</span>
                        <span className="metric-desc">Net lines (insertions minus deletions) per user divided by time between commits.</span>
                    </li>
                    <li>
                        <span className="metric-name">Net Lines Changed</span>
                        <span className="metric-desc">Total insertions minus total deletions per user — who is growing the codebase?</span>
                    </li>
                    <li>
                        <span className="metric-name">Repo Summary</span>
                        <span className="metric-desc">Date range, distinct contributor count, and key activity stats rolled into one view.</span>
                    </li>
                </ul>
            </section>

            {/* <section className="pricing" id="pricing">
                <div className="pricing-inner">
                    <h2>Simple, Honest Pricing</h2>
                    <p className="pricing-amount">$1 <span>/ repo / month</span></p>
                    <p className="pricing-desc">Connect as many repos as you need. Cancel any time. No per-seat fees, no surprise bills — just clear
                        metrics for every repository you care about.</p>
                    <a href="getting-started.html" className="cta-btn">Start Watching Your Git</a>
                </div>
            </section> */}
        </article>
    )
}

export default function Home() {
    // div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
    //                     <Stack direction="horizontal" gap={2}>
    //                         <Button as="a" href="/list" variant="primary">
    //                             Clone Repo
    //                         </Button>
    //                         <Button as="a" href="/list" variant="success">
    //                             List Repos
    //                         </Button>
    //                     </Stack>
    //                 </div>
    return (
        <>
            {OriginalGitloggerSite()}

            {/* <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
                <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-8">
                    <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                        <h2 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                            <a href="https://gitlogger.com/">GitLogger</a> <b>Docker App</b>
                        </h2>
                        <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                            Get started by cloning your repository
                        </p>
                    </div>
                </main>
            </div> */}
        </>
    )
}
