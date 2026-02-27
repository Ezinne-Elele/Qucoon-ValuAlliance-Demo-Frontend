# ─── ValuAlliance Backend API ───
# Node.js + Express + MongoDB (deployed on Render)

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY tsconfig.json ./
COPY src/ ./src/
RUN npm run build

# ─── Production Stage ───
FROM node:20-alpine

WORKDIR /app

# Install production deps only
COPY package.json package-lock.json ./
RUN npm ci --omit=dev && npm cache clean --force

# Copy compiled output
COPY --from=builder /app/dist ./dist

# Render injects PORT automatically; default to 4000 for local testing
ENV PORT=4000
ENV NODE_ENV=production

EXPOSE 4000

CMD ["node", "dist/index.js"]
