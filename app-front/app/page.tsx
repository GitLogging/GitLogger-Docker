import Image from "next/image"
import Button from "react-bootstrap/Button"
import Stack from "react-bootstrap/Stack"

export default function Home() {
    return (
        <div className="flex flex-col flex-1 items-center justify-center bg-zinc-50 font-sans dark:bg-black">
            <main className="flex flex-1 w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-white dark:bg-black sm:items-start">
                <div className="flex flex-col items-center gap-6 text-center sm:items-start sm:text-left">
                    <h1 className="max-w-xs text-3xl font-semibold leading-10 tracking-tight text-black dark:text-zinc-50">
                        <a href="https://gitlogger.com/">GitLogger</a> <b>Docker App</b>
                    </h1>
                    <p className="max-w-md text-lg leading-8 text-zinc-600 dark:text-zinc-400">
                        Get started by cloning your repository
                    </p>
                </div>
                <div className="flex flex-col gap-4 text-base font-medium sm:flex-row">
                    <Stack direction="horizontal" gap={2}>
                        <Button as="a" variant="primary">
                            Clone Repo
                        </Button>
                        <Button as="a" variant="success">
                            List Repos
                        </Button>
                    </Stack>
                </div>
            </main>
        </div>
    )
}
