
# Stage 1: Build the application
FROM oven/bun:1 as build
WORKDIR /usr/src/app

# Copy application files
COPY package.json bun.lockb ./
COPY src ./src
COPY tsconfig.json ./

# Install dependencies and build
RUN bun install --frozen-lockfile
RUN bun run build

# Stage 2: Run the application
FROM oven/bun:1
WORKDIR /usr/src/app

# Copy built application
COPY --from=build /usr/src/app/dist ./dist
COPY package.json bun.lockb ./

# Install only production dependencies
RUN bun install --frozen-lockfile --production

# Set the entrypoint
CMD ["bun", "dist/index.js"]
