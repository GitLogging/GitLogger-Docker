FROM mcr.microsoft.com/powershell AS powershell

# Install packages
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt/lists \
    apt-get update && \
    apt-get install -y git gh && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Copy docker-build scripts into the container FIRST
COPY docker-build /docker-build

ENV InstallModule="ugit,pansies"

# Now run the build script with mounts for your source code
RUN --mount=type=bind,src=./app-gitserve,target=/app-gitserve \
    --mount=type=bind,src=./app-front,target=/app-front \
    /bin/pwsh -nologo -command /docker-build/Container.Create.ps1

# Set environment variables
ENV PWSH_HOST=*
ENV PWSH_PORT=3001
ENV APPDIR=/app-front

WORKDIR $APPDIR

# Copy the actual code into the image
COPY app-front /app-front
COPY GitServed /app-gitserve
# COPY app-gitserve /app-gitserve

EXPOSE 3001

# Entrypoint runs when the container starts
ENTRYPOINT ["/bin/pwsh", "-noexit", "-file", "/app-front/server-run.ps1"]
