# About

React test for GitLogger site using react-bootstrap


## How to Run

```ps1
# [1] first run the pwsh web server
pushd 'H:\data\2026\pwsh\Sketch.📁\GitDocker.📁'
. ./app/server-run -PortNumber 3001

# [2] run react front end
pushd 'H:/data/2026/web/Sketch.📁/Other.📁/2026-06-01.ReactTut/app-front'
pnpm run dev
# [3] open browser
Start-Process -FilePath 'http://127.0.0.1:3000'
```

## Repo initialized using

```ps1
pnpm create next-app@latest app-front
```

## `pnpm` scripts `package.json`

Config

```json 
{ 
    "dev": "next dev",
    "build": "next build",
    "start": "next start",
    "lint": "biome check",
    "format": "biome format --write"
}
```

These scripts refer to the different stages of developing an application:

- `next dev`: Starts the development server using Turbopack (default bundler).
- `next build`: Builds the application for production.
- `next start`: Starts the production server.
- `biome check`: Runs Biome (ESLint alternative) for linting.
- `biome format --write`: Formats the code using Biome.

Turbopack is now the default bundler. To use Webpack run next dev --webpack or next build --webpack. See the Turbopack docs for configuration details.

## Customize `Bootstrap` `Sass` variables

- [customizing bootstrap css variables](https://react-bootstrap.github.io/docs/getting-started/introduction/#sass)

## Running as local debugging mode

<!-- the old path was: 
pushd 'H:\data\2026\pwsh\Sketch.📁\GitDocker.📁'
. H:\data\2026\pwsh\Sketch.📁\GitDocker.📁\app\server-run.ps1 -PortNumber 3001
-->

```bash
# process [1] : pwsh server
#      or: gh repo clone ninmonkey/GitServe

pushd 'H:\data\2026\pwsh\AlphaModule.📁\GitServed'
. ./build/Build.Module.ps1
Import-Module './GitServe' -force -pass
GitServe.Start -HostName '127.0.0.1' -Port 3001

# to cleanup HttpListeners, use:
GitServe.Stop
```

```bash
# process [2] : The React front end 
pushd 'H:\data\2026\web\Sketch.dir\2026-06-01.ReactTut\app-front'
pnpm run dev
````