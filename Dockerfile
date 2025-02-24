FROM oven/bun:1 AS base
WORKDIR /usr/src/app

FROM base AS install
RUN mkdir -p /temp
COPY package.json bun.lock /temp/
RUN cd /temp && bun install --frozen-lockfile

FROM base AS development
COPY --from=install /temp/node_modules node_modules
COPY . .

ENV NODE_ENV=development
ENV BUN_ENV=development
ENV PORT=3003

EXPOSE 3003

# COPY entrypoint.sh ./
# RUN chmod +x entrypoint.sh

# ENTRYPOINT [ "/entrypoint.sh" ]

CMD ["bun", "start"]
