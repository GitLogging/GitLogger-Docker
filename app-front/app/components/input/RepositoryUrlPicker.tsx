import { defaultRepoUrlList } from "@/app/default-data/repository-urls"
import { BuildInputOptionsFrom } from "@/app/components/input/InputObjectsFrom"

interface InputOptionItem {
    /**
     * @summary properties required to build a <datalist>'s <option> elements
     */
    label?: string
    url: string
}

function buildDataList({ dataListId, children }: { dataListId?: string; children?: React.ReactNode }) {
    /**
     * @summary Build a datalist element with the provided list of <options>, or fallback to defaults if no options are provided
     */
    if (!dataListId) {
        console.error(`<RepositoryUrlPicker> -> buildDataList: missing dataListId`)
    }
    if (!children) {
        // console.error(`<RepositoryUrlPicker> -> buildDataList: missing required children`)
        children = BuildInputOptionsFrom(defaultRepoUrlList, { label: 'label', value: 'url' })
    }
    /*
    example output:
        <option
        label="VS Code"
            value="https://github.com/microsoft/vscode"
            data-repo-url="https://github.com/microsoft/vscode"
        ></option>
    */
    return (
        <datalist id={dataListId}>
            {/*

          `Option.Label` is optional, but can be used to provide a more human-readable name for the url
          */}
            {children}
        </datalist>
    )
}

function buildForm() {
    // should these by dynamic?
    const dataListId = `clone-repo-url-source-list`
    const inputElementId = `clone-repo-url-choice`
    const formId = `clone-repo-form`
    const formContents = (
        <div className="row">
            <input
                style={{
                    width: '100%',
                }}
                type="search"
                list={dataListId}
                id={inputElementId}
                name={inputElementId}
                defaultValue={true ? `` : `https://github.com/microsoft/vscode-powerquery`}
                placeholder="Enter a git repository url"
                required={false}
            />
        </div>
    )
    return (
        <>
            <form id={formId}>
                {formContents}
            </form>
            {/* <input name="graphtype" id="graphTypeChoice0" value="bar" checked="true" type="checkbox"> */}
            {buildDataList({
                dataListId: dataListId,
                // children: [],

            })}

            {/* end of: div#mainFormContent */}
        </>
    )
}

/**
 * @summary Select a repository from the list of known cloned repos
 */
export function RepositoryUrlPicker() {
    /**
     * @summary Autocomplete urls, but also allow freeform entry for new ones
     * @description If no list is provided, fallback to example repo urls.
     */

    return (<>
        {buildForm()}
    </>
    )
}