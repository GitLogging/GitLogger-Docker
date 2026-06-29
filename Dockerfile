# FROM mcr.microsoft.com/powershell:7.4-alpine-3.18
FROM mcr.microsoft.com/powershell AS powershell

# runs powershell server under /app
# RUN apk add --no-cache gh

# install packages, and clean up temp files
#
#   ex: cache version syntax:
#       apt-get install -y git=1:* gh=* && \
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt/lists \
    apt-get update && \
    apt-get install -y git && \
    apt-get install -y gh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Set the module name to the name of the module we are building
# ENV ModuleName=WebSocket
# ENV InstallAptGet="git","curl","ca-certificates","libc6","libgcc1"
ENV InstallModule="ugit,pansies"
# Copy the module into the container
RUN --mount=type=bind,src=./,target=/app-gitserve /bin/pwsh -nologo -command /docker-build/Initialize/Container.init.ps1
# Set the entrypoint to the script we just created.


# Notes:
#
# Powershell modules are installed to:
#   /root/.local/share/powershell/Modules


# ENV PWSH_HOST=127.0.0.1
# ENV PWSH_HOST=0.0.0.0
ENV PWSH_HOST=*
ENV PWSH_PORT=3001

ENV APPDIR=/app-front
WORKDIR $APPDIR

COPY /app-front /app-front
# SHELL ["pwsh", "-NoProfile", "-NoLogo", "-Command"]

RUN --mount=type=bind,src=.,target=/app
EXPOSE 3001
# if process before node, then:
    # CMD ["pwsh", "-NoProfile", "-NoLogo", "-File", "/app/server-routing.ps1"]
    # CMD ["pwsh", "-NoProfile", "-NoLogo", "-NoExit", "-File", "/app/min-server.ps1"]

    # RUN pwsh -Nop -Nol -F .\app\server-run.ps1 -Port 3002 -Host 127.0.0.1
    # RUN ./app/server-run.ps1 -Port 3002 -Host 127.0.0.1
    # CMD ["pwsh", "-NoProfile", "-NoLogo", "-File", "server-run.ps1"]
    # RUN pwsh -F ./server-run.ps1 -Port 3000 -Host '127.0.0.1'

# or serve as default command
# Note: You might want to use '-NoExit'
#   if you are using "docker run -it tag"
#   but not when using "docker run tag"
# ENTRYPOINT [ "/bin/pwsh","-file","/app/server-run.ps1" ]
ENTRYPOINT [ "/bin/pwsh","-noexit","-file","/app-gitserve/server-run.ps1" ]
# ENTRYPOINT [ "/bin/pwsh","-nologo","-noexit","-file","/Container.start.ps1" ]

# RUN --mount=type=bind,src=/app,target=/app2
# RUN --mount=type=bind,target=. go build -o /myapp ./cmd
# RUN npm install --omit=dev
# CMD ["node", "src/index.js"]
# SHELL ["pwsh", "-NoLogo", "-Command"]
# CMD [ "Get-Location | Write-Host" ]
# CMD ["pwsh", "-NoProfile", "-NoLogo", "-File", "/app/server-run.ps1"]
# CMD ["pwsh", "-Command", "'hi world'|write-host"]
# CMD ["pwsh", "-NoProfile", "-NoLogo", "-File", "server-run.ps1"]
