import Button from 'react-bootstrap/Button'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Popover from 'react-bootstrap/Popover'
import { ListGroup, ListGroupItem } from "react-bootstrap"
import './ResponseDetailsPopoverButton.css'

export function ResponseDetailsPopoverButton({
    RequestUrl, ButtonLabel, DisplayJson, children
}: {
    RequestUrl: string,
    ButtonLabel?: string,
    DisplayJson: string,
    children?: React.ReactNode
}) {
    /**
     * @summary Create a popover that shows request, query parameters, and the JSON response as a popover button
     */
    const urlObj = new URL(RequestUrl)
    const abbrPathWithQuery = urlObj.pathname + urlObj.search
    function keysAsDefinitionList(Url) {
        const url = new URL(Url)
        const items = Array.from(url.searchParams.entries()).map(([key, value]) => (
            <ListGroupItem key={key}>
                {key}: {value}
            </ListGroupItem>
        ))
        return (
            <>
                <ListGroup>
                    {items}
                </ListGroup>
            </>
        )
    }

    // todo(clean):
    const popover = (
        // id="popover-basic"
        <Popover
            className="popover-tooltip--show-json"
        >
            <Popover.Header as="h3">Request:
                <a href={RequestUrl} target="_blank" rel="noopener noreferrer">{abbrPathWithQuery}</a>
            </Popover.Header>
            <Popover.Body>
                <h4>query</h4>
                {keysAsDefinitionList(RequestUrl)}
                {children}
                <h4>response</h4>
                <pre>{DisplayJson}</pre>
            </Popover.Body>
        </Popover>
    )

    return (
        <>
            <OverlayTrigger trigger="click" placement="right" overlay={popover}>
                <Button variant="success">{ButtonLabel ?? 'View'}</Button>
            </OverlayTrigger>
        </>
    )
}
