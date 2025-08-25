# Stage 1: Build
FROM node:20-alpine AS builder

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN npm run build

# Stage 2: Prod
FROM node:20-alpine

WORKDIR /app

RUN apk add --no-cache postgresql-client bash

COPY package*.json ./
RUN npm install --production

COPY --from=builder /app/dist ./dist

ENV PORT=3000

EXPOSE 3000

CMD ["sh", "-c", "until pg_isready -h test-colmena-db -p 5432; do echo 'Waiting for Postgres...'; sleep 2; done && npm run migration:run && node dist/main.js"]
