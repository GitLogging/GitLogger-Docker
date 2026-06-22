
import { useState } from 'react'
import { Button } from 'react-bootstrap'

export function CloneRepoButton() {
    /**
     * @summary On click call the clone repository endpoint
     */
    const [count, setCount] = useState(0)

    function handleClick() {
        setCount(count + 1)
        console.log('CloneRepoButton: clicked')
    }

    return (
        <Button
            variant="outline-secondary"
            id="git-repo-clone-button"
            type="submit"
            onClick={handleClick}
        >
            Clone
        </Button>
    )
}
