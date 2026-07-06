"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import Form from "react-bootstrap/Form"
import Row from "react-bootstrap/Row"
import Col from "react-bootstrap/Col"

import './input_date.css'

function FullMonthWithTimeDatePicker_Native({ PickerId = `FullMonthWithTimeDatePicker_Native}` }) {
    /**
     * @summary native full datetime UI picker
     * @see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local
     */
    return (

        <form>
            <label htmlFor={PickerId}>Choose event datetime:</label>
            <input
                id={PickerId}
                type="datetime-local"
                name={`{${PickerId}-date}`}
                defaultValue={"2018-06-12T19:30"}
            // min="2017-06-01T08:30"
            // max="2017-06-30T16:30"
            // required

            />
        </form>

    )
}
// function FullMonthWithTimeDatePicker({ PickerId = `InputFullDatePicker}` }) {
function FullMonthWithTimeDatePicker({ PickerId = `FullMonthWithTimeDatePicker` }) {
    /**
     * @summary native full datetime UI picker
     * @see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local
     */
    const usingBootstrapWrapper = true
    // const disabledField = true
    // const disabledFieldComponent = <Form.Control plaintext readOnly defaultValue="email@example.com" />

    return (
        <Form>
            <Form.Group as={Row} className="mb-3" controlId={PickerId}>
                <Form.Label column sm="2">
                    plaintext, readonly
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        plaintext
                        readOnly
                        type="datetime-local"
                        value={"2018-06-12T19:30"}
                    />
                </Col>

                <Form.Label column sm="2">
                    readonly
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        // plaintext
                        // readOnly={false}
                        // contentEditable={false}
                        // defaultValue={"2018-06-12T19:30"}
                        type="datetime-local"
                        defaultValue={"2018-06-12T19:30"}
                    />
                </Col>

                <Form.Label column sm="2">
                    plaintext, editable
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        plaintext
                        // readOnly={false}
                        contentEditable={true}
                        defaultValue={"2018-06-12T19:30"}
                        type="datetime-local"
                    // value={"2018-06-12T19:30"}
                    />
                </Col>

                <Form.Label column sm="2">
                    editable
                </Form.Label>
                <Col sm="10">
                    <Form.Control
                        // plaintext
                        // readOnly={false}
                        contentEditable={true}
                        defaultValue={"2018-06-12T19:30"}
                        type="datetime-local"
                    // value={"2018-06-12T19:30"}
                    />
                </Col>
            </Form.Group>
        </Form>

    )

}
function FullMonthWithTimeDatePicker_Bootstrap({ PickerId = `FullMonthWithTimeDatePicker_Bootstrap}` }) {
    /**
     * @summary full datetime UI picker with Bootstrap styling
     * @see: https://developer.mozilla.org/en-US/docs/Web/HTML/Reference/Elements/input/datetime-local
     */
    return (
        <>
            <Form>
                <Form.Group as={Row} className="mb-3" controlId={PickerId} >
                    <Form.Label column sm="2">
                        Choose event datetime:
                    </Form.Label>
                    <Col sm="10">
                        <Form.Control

                            type="datetime-local"
                            name={`{${PickerId}-date}`}
                            defaultValue={"2018-06-12T19:30"}
                        // min="2017-06-01T08:30"
                        // max="2017-06-30T16:30"
                        // required
                        />
                    </Col>
                </Form.Group>
            </Form>
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
            <article id="atom-input-date">

                <section>
                    <h2>atom: <code>&lt;FullMonthWithTimeDatePicker /&gt;</code></h2>
                    <FullMonthWithTimeDatePicker />
                </section >
                <section>
                    <h2>atom: <code>&lt;FullMonthWithTimeDatePicker_Bootstrap /&gt;</code></h2>
                    <FullMonthWithTimeDatePicker_Bootstrap />
                </section>
                <section>
                    <h2>atom: <code>&lt;FullMonthWithTimeDatePicker_Native /&gt;</code></h2>
                    <FullMonthWithTimeDatePicker_Native />
                </section>
            </article >
        </>
    )
}
