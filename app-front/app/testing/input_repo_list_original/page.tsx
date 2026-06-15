"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
import { RepoListNamePicker } from "@/app/components/input/RepositoryNamePicker"

function OriginalRepoSourcesDataListPicker() {
    return (
        <>
            <div id="mainFormContent">
                {/* <a href="#" id="resetCachedPageListRepos">Refresh</a> */}
                <div className="horizontalMenuBar" id="repoSelectByUrl">
                    <form id="cloneRepo-form">
                        <div className="row">
                            <label htmlFor="cloneRepo-user-name">Owner Name</label>
                            <input
                                type="text"
                                list="cloneRepo-user-name-list"
                                id="cloneRepo-user-name"
                                name="cloneRepo-user-name"
                                defaultValue="ninmonkey"
                                placeholder="Enter a github user name"
                            />
                            <label htmlFor="cloneRepo-url-choice">Url</label>
                            {/* was type: url */}
                            <input
                                type="search"
                                list="cloneRepo-url-list"
                                id="cloneRepo-url-choice"
                                name="cloneRepo-url-choice"
                                defaultValue="https://github.com/microsoft/vscode-powerquery"
                                placeholder="Enter a git repository url"
                                required={false}
                            />
                            <a
                                href="#"
                                id="cloneRepoListUrlButton"
                                data-repo-url="https://www.github.com/powershell/powershell"
                            >
                                Clone
                            </a>
                            <img
                                id="cloneRepo-loading-icon"
                                src="./image/icon/load-spin.svg"
                                className="opacity-min"
                                role="img"
                            />
                            {/* required if type is url, but not search. <a href="#" id="clearRepoChoiceUrlButton">Clear</a> */}
                            <span id="cloneRepo-errorStatus">Error cloning!</span>
                        </div>
                        <div className="row">
                            <label htmlFor="cloneRepo-param-noSingleBranch">NoSingleBranch</label>
                            <input
                                type="checkbox"
                                id="cloneRepo-param-noSingleBranch"
                                name="cloneRepo-param-noSingleBranch"
                            />
                            <label htmlFor="cloneRepo-param-monthsAgo">Recent Months:</label>
                            <input
                                type="number"
                                id="cloneRepo-param-monthsAgo"
                                name="cloneRepo-param-monthsAgo"
                                defaultValue={4}
                                min={0}
                                max={20}
                            />
                        </div>
                    </form>
                    {/* <input name="graphtype" id="graphTypeChoice0" value="bar" checked="true" type="checkbox"> */}
                    {/*
      This list define the mapping of names to urls for args when cloning
      */}
                    <datalist id="cloneRepo-user-name-list">
                        <option value="Ninmonkey" label="Ninmonkey" />
                        <option value="StartAutomating" />
                        <option value="Microsoft" />
                        <option value="PowerShellWeb" />
                    </datalist>
                    <datalist id="cloneRepo-url-list">
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
                    </datalist>
                </div>
                {/* <div id="rootBodyContents">
      <div id="repoListParent"></div>
  </div> */}
            </div>
            {/* end of: div#mainFormContent */}
        </>
    )
}

export default function Page() {
    /**
     * @summary this page is for testing individual components
     * */
    return (
        <>
            {PageHeaderContent()}
            <article>
                <section>
                    <h1>Testing single component: input_repo_list</h1>
                    <OriginalRepoSourcesDataListPicker />
                </section>
            </article>
        </>
    )
}
