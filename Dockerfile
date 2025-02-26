# Base server
FROM node:22-alpine as base

USER node
WORKDIR /app

COPY --chown=node:node package.json package-lock.json ./

# Déclare un argument avec une valeur par défaut (ici .env.development)
ARG ENV_FILE=.env.development
# Copie le fichier d'environnement sélectionné sous le nom .env
COPY --chown=node:node ${ENV_FILE} .env

# Build
FROM base as build
RUN npm ci
COPY --chown=node:node . .
RUN npm run build

# Production
FROM nginx:stable-alpine as prod
COPY --from=build --chown=node:node /app/dist /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
