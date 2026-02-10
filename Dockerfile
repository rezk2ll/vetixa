FROM node:24-slim AS builder

ENV ADAPTER=node
WORKDIR /app
COPY package*.json .
RUN npm ci
COPY . .
RUN npm run build
RUN npm prune --production

FROM node:24-slim
WORKDIR /app
COPY --from=builder /app/build build/
COPY --from=builder /app/node_modules node_modules/
COPY package.json .
EXPOSE 3000

ENV NODE_ENV=production
CMD [ "node", "build" ]
