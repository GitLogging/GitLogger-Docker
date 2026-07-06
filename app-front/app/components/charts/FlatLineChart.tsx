import { Line } from "react-chartjs-2"
import { CommitMetricUrl, CommitMetricItem } from "@/app/types/pwsh-api/repo/metric/commit"

export function FlatLineChart({ RequestUrl }: { RequestUrl: CommitMetricUrl }) {
    /**
     * Entry point for simple line chart
     */
    const data = [0, 3, 4, 5]
    return (
        <>
            <div>chart here</div>
            {/* <Line data={data} /> */}
            {/* key={name.key}
                RequestUrl={`http://127.0.0.1:3001/repo/metric/commit?name=${name.name}&since=${since}`} /> */}
        </>
    )
}



