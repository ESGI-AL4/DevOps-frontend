# Base server
FROM node:22-alpine as base

USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

# Build
FROM base as build
RUN npm ci
COPY --chown=node:node . .
RUN npm run build-only

# Production
FROM nginx:stable-alpine as prod
COPY --from=build --chown=node:node /app/dist /usr/share/nginx/html
# COPY --from=build --chown=node:node /app/node_modules ./node_modules
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]