
'use client'

import { Button, Spinner } from 'react-bootstrap'

interface CloneRepoButtonProps {
    isLoading?: boolean
}

export function CloneRepoButton({ isLoading = false }: CloneRepoButtonProps) {
    /**
     * @summary On click call the clone repository endpoint
     */
    return (
        <Button
            variant="outline-primary"
            id="git-repo-clone-button"
            type="submit"
            disabled={isLoading}
        >
            Clone
            {isLoading && (
                <Spinner
                    as="span"
                    animation="border"
                    variant="primary"
                    size="sm"
                    role="status"
                    aria-hidden="true"
                    className="ms-2"
                />
            )}
        </Button>
    )
}
