"use client"
import { PageHeaderContent } from "@/app/components/PageHeaderContent"
// import { RepoListPicker } from "@/app/components/input/RepositoryNamePicker"
import { RepositoryUrlPicker } from "@/app/components/input/CloneRepositoryUrlPicker"

function RepoSourcesDataListPicker() {
    return (
        <>
            <div id="mainFormContent">
                {/* <a href="#" id="resetCachedPageListRepos">Refresh</a> */}
                <div className="horizontalMenuBar" id="repoSelectByUrl">
                    <form id="cloneRepo-form">
                        <div className="row">
                            <input
                                type="search"
                                list="cloneRepo-url-list"
                                id="cloneRepo-url-choice"
                                name="cloneRepo-url-choice"
                                defaultValue={true ? `` : `https://github.com/microsoft/vscode-powerquery`}
                                placeholder="Enter a git repository url"
                                required={false}
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
                    <h1>refactored import: app-front/app/components/input/RepositoryNamePicker.tsx</h1>
                    <RepositoryUrlPicker />
                </section>
                <section>
                    <h1>Testing single component: input_repo_list</h1>
                    <RepoSourcesDataListPicker />
                </section>
            </article>
        </>
    )
}
