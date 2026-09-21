FROM mcr.microsoft.com/powershell AS powershell

# Install packages
# [1] without npm
# RUN --mount=type=cache,target=/var/cache/apt \
#     --mount=type=cache,target=/var/lib/apt/lists \
#     apt-get update && \
#     apt-get install -y git gh && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

# [1] using npm
# ref: <https://github.com/vercel/next.js/blob/55b20af2d104b2126c2302ae4cabc9d6bd768714/examples/with-docker/Dockerfile#L17-L30>
RUN --mount=type=cache,target=/var/cache/apt \
    --mount=type=cache,target=/var/lib/apt/lists \
    apt-get update && \
    apt-get install -y git gh curl && \
    curl -fsSL https://deb.nodesource.com/setup_22.x | bash - && \
    apt-get install -y nodejs && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*


# RUN npm install -g pnpm

# Copy docker-build scripts into the container FIRST
COPY docker-build /docker-build
COPY pwsh-modules /pwsh-modules

# COPY --from=dependencies /app/node_modules ./node_modules

ENV InstallModule="ugit,pansies"

# Now run the build script with mounts for your source code
RUN --mount=type=bind,src=./app-front,target=/app-front \
    --mount=type=bind,src=./pwsh-modules,target=/pwsh-modules \
    /bin/pwsh -nologo -command /docker-build/Container.Create.ps1

# disable
    # --mount=type=bind,src=./app-gitserve,target=/app-gitserve \

# Set environment variables
ENV PWSH_HOST=*
ENV PWSH_PORT=3001
ENV APPDIR=/app-front

WORKDIR $APPDIR

# Copy the actual code into the image
COPY app-front /app-front
# COPY GitServed /app-gitserve
# COPY app-gitserve /app-gitserve

RUN pnpm run

EXPOSE 3001

# Entrypoint runs when the container starts
ENTRYPOINT ["/bin/pwsh", "-noexit", "-file", "/app-front/server-run.ps1"]
