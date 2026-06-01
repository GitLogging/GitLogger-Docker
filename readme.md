# About

React test for GitLogger site using react-bootstrap

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