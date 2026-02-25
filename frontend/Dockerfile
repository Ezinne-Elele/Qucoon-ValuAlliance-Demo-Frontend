# ─── ValuAlliance Frontend ───
# React (Vite) + Tailwind (deployed on Vercel/Nginx)

FROM node:20-alpine AS builder

WORKDIR /app

# Install dependencies
COPY package.json package-lock.json ./
RUN npm ci

# Copy source and build
COPY ./ ./
RUN npm run build

# ─── Serving Stage (for non-Vercel deployments) ───
FROM nginx:stable-alpine

# Copy the build output to Nginx's public folder
# Based on your vite.config.ts, build output is in dist/public
COPY --from=builder /app/dist/public /usr/share/nginx/html

# Add a default nginx config to handle SPA routing (redirect all to index.html)
RUN echo 'server { \
    listen 80; \
    location / { \
    root /usr/share/nginx/html; \
    index index.html index.htm; \
    try_files $uri $uri/ /index.html; \
    } \
    location /api { \
    proxy_pass ${BACKEND_URL}; \
    } \
    }' > /etc/nginx/conf.d/default.conf

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
