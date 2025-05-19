FROM node:22 AS deps
WORKDIR /usr/src/app

RUN apt-get update && \
    apt-get install -y --no-install-recommends \
      make && \
    rm -rf /var/lib/apt/lists/*

COPY package.json package-lock.json ./
RUN npm ci

FROM node:22 AS development
WORKDIR /usr/src/app

COPY --from=deps /usr/src/app/node_modules ./node_modules

COPY . .

COPY entrypoint.sh /entrypoint.sh
RUN chmod +x /entrypoint.sh

ENV NODE_ENV=development
ENV PORT=3003

EXPOSE 3003

ENTRYPOINT ["/entrypoint.sh"]
CMD ["npm", "run", "start"]
