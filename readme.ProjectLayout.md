# Project File Layout for GitLoggerApp 

- `/app-front` - This app. React front end to display GitLogger charts. Npm install from here. 
- `/docker-build` - Scripts that build and run the docker image
- `/app-front/app/**/page.tsx` - Next.js file-based routing 
- `/app-front/app/**/*.tsx` - Typescript
- `/GitServed` - [Powershell module for GitLogger](https://github.com/ninmonkey/GitServed). This is the backend server that serves the data to the front end
