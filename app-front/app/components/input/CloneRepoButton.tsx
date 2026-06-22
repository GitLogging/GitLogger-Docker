
import { useState } from 'react'

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
        <button onClick={handleClick} >
            Clone
        </button>
    )
}
