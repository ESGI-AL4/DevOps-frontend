# Base server
FROM node:22-alpine as base

USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

# Build
FROM base as build
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

# Production
FROM base as prod
COPY --from=build --chown=node:node /app/dist ./dist
COPY --from=build --chown=node:node /app/node_modules ./node_modules
CMD ["node", "dist/src/main.js"]