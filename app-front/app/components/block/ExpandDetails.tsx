
export default function ExpandDetails({ Summary, Details }: { Summary: React.ReactNode; Details: React.ReactNode }) {
    /**
     * @summary A simple wrapper around the HTML <details> element, which provides built-in expand/collapse functionality. The <summary> element is used as the clickable header, and the rest of the content is hidden until expanded.
     * @example
     * <ExpandDetails
     *   Summary={<h3>Click to expand</h3>}
     *  Details={<p>This content is hidden until you click the summary.</p>}
     * />
     *
     */
    return (
        <details>
            <summary>{Summary}</summary>
            <div className="details-body">
                {Details}
            </div>
        </details>
    )
}
