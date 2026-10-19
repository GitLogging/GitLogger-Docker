<!-- BEGIN:nextjs-agent-rules -->
# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.
<!-- END:nextjs-agent-rules -->

## About

This project uses

- `pnpm`
- `React Bootstrap`

## File Layout

- Routes are named `page.tsx` for example: `app-front/app/**/page.tsx`
- Reusable components like Forms, Inputs, Groups etc are located in the folder `app-front/app/components`
- Interactive tests are in `app-front/app/tests`
- Json schema / REST API responses are located in `app-front/app/types`
- Shared `svg` icons are under `app-front/public`


## To Ignore

- Ignore local modules for the docker image under the folder `pwsh-modules`