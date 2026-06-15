function buildDefaultDataListOptions() {
    return (
        <>
            <option
                label="VsCode TMDL"
                value="https://github.com/microsoft/vscode-tmdl"
            />
            <option
                label="Vertipaq Analzyer"
                value="https://github.com/sql-bi/vertipaq-analyzer"
            />
            <option
                label="Dotfiles"
                value="https://www.github.com/ninmonkey/dotfiles_git"
            />
            <option
                label="PSEditor Services"
                value="https://www.github.com/PowerShell/PowerShellEditorServices"
            />
            <option
                label="PowerShell"
                value="https://www.github.com/powershell/powershell"
            />
            <option
                label="PSSvg"
                value="https://www.github.com/startautomating/pssvg"
            />
            <option value="https://www.github.com/startautomating/psadapter" />
            <option value="https://www.github.com/startautomating/emoji" />
            <option value="https://www.github.com/startautomating/obs-powershell" />
            <option
                label="UGit"
                value="https://www.github.com/startautomating/ugit"
            />
            <option value="https://www.github.com/startautomating/helpout" />
            <option value="https://www.github.com/startautomating/ezout" />
            <option value="https://www.github.com/startautomating/rocker" />
            <option value="https://www.github.com/startautomating/roughdraft" />
            <option
                label="PowerQueryLib"
                value="https://www.github.com/ninmonkey/ninmonkey.PowerQueryLib"
            />
            <option
                label="PSReadLine"
                value="https://www.github.com/powershell/PSReadLine"
            />
            <option label="VS Code" value="https://github.com/microsoft/vscode" />
            <option
                label="Windows Terminal"
                value="https://github.com/microsoft/terminal"
            />
        </>
    )

}

function buildDataList({ dataListId, children }: { dataListId?: string; children?: React.ReactNode }) {
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
    return (
        <>

            <form id="oldcloneRepo-form">
                <div className="row">
                    <input
                        type="search"
                        list={dataListId}
                        id={inputElementId}
                        name={inputElementId}
                        defaultValue={true ? `` : `https://github.com/microsoft/vscode-powerquery`}
                        placeholder="Enter a git repository url"
                        required={false}
                    />
                </div>
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