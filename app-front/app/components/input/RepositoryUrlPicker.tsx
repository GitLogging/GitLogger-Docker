interface InputOptionItem {
    /**
     * @summary properties required to build a <datalist>'s <option> elements
     */
    label?: string
    url: string
}

interface PropertyMapping {
    /**
     * Converts keyvalue pairs into a layout that a <InputOptionItem> requires
     */
    label?: string
    value?: string
}

/**
 * @summary Convert an array of items into <option> elements. Optionally declare property names
 * @description Allows custom property mapping for label and value properties
 * @example
 * BuildInputOptionsFrom(items) // uses default 'label' and 'value' properties
 * BuildInputOptionsFrom(items, { label: 'label', value: 'url' }) // custom mapping
 */
function BuildInputOptionsFrom(
    items: any[],
    mapping?: PropertyMapping
): React.ReactNode {
    const defaultMapping: PropertyMapping = {
        label: 'label',
        value: 'value',
    }

    const finalMapping = { ...defaultMapping, ...mapping };

    return (
        <>
            {items.map((item, index) => (
                <option
                    key={index}
                    label={item[finalMapping.label!]}
                    value={item[finalMapping.value!]}
                />
            ))}
        </>
    )
}

function buildDefaultDataListOptions() {
    const items: InputOptionItem[] = [
        { label: 'VsCode TMDL', url: 'https://github.com/microsoft/vscode-tmdl' },
        { label: 'Vertipaq Analzyer', url: 'https://github.com/sql-bi/vertipaq-analyzer' },
        { label: 'Dotfiles', url: 'https://www.github.com/ninmonkey/dotfiles_git' },
        { label: 'PSEditor Services', url: 'https://www.github.com/PowerShell/PowerShellEditorServices' },
        { label: 'PowerShell', url: 'https://www.github.com/powershell/powershell' },
        { label: 'PSSvg', url: 'https://www.github.com/startautomating/pssvg' },
        { url: 'https://www.github.com/startautomating/psadapter' },
        { url: 'https://www.github.com/startautomating/emoji' },
        { url: 'https://www.github.com/startautomating/obs-powershell' },
        { label: 'UGit', url: 'https://www.github.com/startautomating/ugit' },
        { url: 'https://www.github.com/startautomating/helpout' },
        { url: 'https://www.github.com/startautomating/ezout' },
        { url: 'https://www.github.com/startautomating/rocker' },
        { url: 'https://www.github.com/startautomating/roughdraft' },
        { label: 'PowerQueryLib', url: 'https://www.github.com/ninmonkey/ninmonkey.PowerQueryLib' },
        { label: 'PSReadLine', url: 'https://www.github.com/powershell/PSReadLine' },
        { label: 'VS Code', url: 'https://github.com/microsoft/vscode' },
        { label: 'Windows Terminal', url: 'https://github.com/microsoft/terminal' },
    ];

    return BuildInputOptionsFrom(items, { label: 'label', value: 'url' })
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
        children = buildDefaultDataListOptions()
    }
    return (
        <datalist id={dataListId}>
            {/*
          <option
        label="VS Code"
              value="https://github.com/microsoft/vscode"
              data-repo-url="https://github.com/microsoft/vscode"
          ></option>
          */}
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