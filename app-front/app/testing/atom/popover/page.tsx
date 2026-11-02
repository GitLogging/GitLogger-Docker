"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"

import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import './popover-test-page.css'
import Button from "react-bootstrap/esm/Button"
import { useId } from "react"
import { ResponseDetailsPopoverButton } from "@/app/components/block/ResponseDetailsPopoverButton"

function PopoverTooltip({ children }: { children?: React.ReactNode }) {
    return (
        <>
            <h1>nyi: show popover tooltip</h1>
            <div>
                {children}
            </div>
        </>
    )
}

function PopoverButton({
    // Target = `popover-target`,
    Label,
    children
}: {
    Label: string,
    children?: React.ReactNode
}) {
    /**
     * @summary create a button with an auto popoverTarget which contains children elements. popover="auto" means only one tooltip will be shown at once. Escape or clicking outside element will close it.
     * @see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Global_attributes/popover
     */

    const popoverButtonId = useId() // button that triggers popover
    const popoverTargetId = useId() // target element to show
    return (
        <>
            <Button variant="outline-primary" popoverTarget={popoverTargetId}
                id={popoverButtonId}
                size="sm"
            >{Label}</Button>

            {/* <p>id: {popoverButtonId}</p> */}
            {/*
            if no anchor set, include class 'popover--nosource' to center the middle of the page */
            }
            <div id={popoverTargetId} popover="auto" className="popover--nosource">
                {children}
            </div>
        </>
    )
}

export function ShowResponseDetailsSummary({
    RequestUrl, DisplayJson
}: {
    RequestUrl: string,
    DisplayJson: string,
}) {
    /**
     * @summary show response details as a popover. This includes syntax highlighting for json content.
     */

    return (
        <>
            <section className="popover-tooltip--show-json fade">

                <h3 className="popover-header">Request: {RequestUrl}</h3>
                <div className="popover-body">

                <h4>query</h4>
                <div>keys here....</div>


                <h4>response</h4>
                <pre>{DisplayJson}</pre>
                </div>
            </section>
        </>
    )
}

export default function Page() {
    /**
     * @summary this page is for testing individual components
     * */


    return (
        <>
            <PageHeaderContent />
            <article id="popover-test-page">
                <h1>popover</h1>

                <section>
                    <h2>type: auto</h2>
                    <PopoverButton
                        Label="using children param"
                    >
                        <ShowResponseDetailsSummary
                            RequestUrl={`http://127.0.0.1:3001/repo/metric/totalcommit?name=startautomating/pssvg&period=month`}
                            DisplayJson={JSON.stringify({ user: "bob" }, null, 2)}
                        />
                    </PopoverButton>
                    <PopoverButton
                        Label="ⓘ"
                    >
                        <span>Inner content for auto popover</span>
                    </PopoverButton>

                    <PopoverButton
                        Label="using children param"
                        children={<span>Custom content</span>}
                    />
                </section>

                <section>
                    <h2>type: shared id: NYI</h2>
                    {/* <PopoverButton Label="Shared Popover" /> */}
                </section >

                <section>
                    <h2>raw json syntax highlight (tooltip preview)</h2>
                    <ShowResponseDetailsSummary
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/totalcommit?name=startautomating/pssvg&period=month`}
                        DisplayJson={JSON.stringify({ user: "bob" }, null, 2)}
                    />
                </section>
                <section>
                    <h2>raw json syntax highlight (tooltip preview)</h2>
                    {/* <ShowResponseDetailsSummary > */}
                    {/* <ResponseDetailsPopoverButton /> */}
                    <ResponseDetailsPopoverButton
                        ButtonLabel={`see source`}
                        key={`url-12345`}
                        // key={`${url}-${index}`}
                        RequestUrl={`http://127.0.0.1:3001/repo/metric/totalcommit?name=startautomating/pssvg&period=month`}
                        DisplayJson={JSON.stringify({ user: "bob" }, null, 2)}
                    />

                    {/* </ShowResponseDetailsSummary> */}
                </section>
            </article>
        </>
    )
}
