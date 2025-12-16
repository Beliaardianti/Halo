# Build stage
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files
COPY package*.json ./

# Install dependencies (ignore engine warnings)
RUN npm install --force --legacy-peer-deps

# Copy source code
COPY . .

# Build app
RUN npm run build

# Runtime stage
FROM node:22-alpine

WORKDIR /app

# Copy from builder
COPY --from=builder /app/.output ./.output
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./package.json

# Expose port
EXPOSE 3000

# Environment
ENV NODE_ENV=production

# Start app
CMD ["node", ".output/server/index.mjs"]
