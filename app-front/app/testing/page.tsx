"use client"
import { useState } from "react"
// import Table from "react-bootstrap/Table"
// import Button from 'react-bootstrap/Button'
// import Form from 'react-bootstrap/Form'
// import InputGroup from 'react-bootstrap/InputGroup'
import { PageHeaderContent } from "@/app/components/PageHeaderContent"

// import Nav from 'react-bootstrap/Nav'
// import NavBar from 'react-bootstrap/NavBar'
// import { Nav, Navbar, NavbarBrand, NavbarCollapse, NavLink, NavbarToggle, NavDropdown, NavDropdownProps } from "react-bootstrap"

function MyButton() {
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
    }

    return (
        <button onClick={handleClick}>
            Clicked {count} times
        </button>
    )
}

export default function PageContent() {
    /**
     * @summary this page is for testing individual components
     * */
    return (
        <>
            {PageHeaderContent()}
            <article>
                <section>
                    <MyButton />
                    <MyButton />
                </section>
            </article>
        </>
    )
}
