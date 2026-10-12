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

# install node / npm runtime (pinned so the layer stays cached)
RUN corepack enable && corepack prepare pnpm@9 --activate
# was: RUN corepack enable && corepack prepare pnpm@latest --activate

ENV InstallModule="ugit,pansies"

# Slow, stable setup: only re-runs when this script changes
COPY docker-build/Container.Create.ps1 /docker-build/Container.Create.ps1
RUN /bin/pwsh -nologo -command /docker-build/Container.Create.ps1

# Set environment variables
ENV PWSH_HOST=*
ENV PWSH_PORT=3001
ENV HTTP_PORT=3003

WORKDIR /app-front

# Install dependencies (only re-runs when package.json / lockfile change)
COPY app-front/package.json app-front/pnpm-lock.yaml ./
RUN --mount=type=cache,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile --ignore-scripts
# was: RUN corepack enable && corepack prepare pnpm@latest --activate

# Copy the actual code and build
COPY app-front /app-front
RUN pnpm run build

# Most volatile: PowerShell modules (profile adds /pwsh-modules to PSModulePath at runtime)
COPY pwsh-modules /pwsh-modules

# next.js uses env:PORT
ENV PORT=$HTTP_PORT
EXPOSE $HTTP_PORT
# Entrypoint runs when the container starts
ENTRYPOINT ["/bin/pwsh", "-noexit", "-file", "/app-front/server-run.ps1"]