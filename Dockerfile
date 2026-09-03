ARG NODE_VERSION=24.14.0-slim

FROM node:${NODE_VERSION} AS dependencies
WORKDIR /app

COPY package.json package.json* ./

RUN npm install


FROM node:${NODE_VERSION} AS builder
WORKDIR /app

COPY --from=dependencies /app/node_modules ./node_modules
COPY . .

EXPOSE 3000

ENV PORT=3000
ENV NODE_ENV=development

CMD ["npm", "run dev"]
