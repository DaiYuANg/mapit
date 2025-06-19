FROM node:24-slim AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources && \
    sed -i 's/deb.debian.org/mirrors.ustc.edu.cn/g' /etc/apt/sources.list.d/debian.sources && \
    apt-get update && apt-get install -y python3 make g++ build-essential --fix-missing
RUN corepack enable
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@mapit/server --prod /prod/server

FROM base AS server

RUN npm install -g pm2

COPY --from=build /prod/server/dist /prod/server/dist
COPY --from=build /prod/server/package.json /prod/server/package.json
COPY --from=build /prod/server/node_modules /prod/server/node_modules

WORKDIR /prod/server
EXPOSE 3000
#CMD [ "node", "dist/main.js" ]
CMD ["sh", "-c", "pm2-runtime dist/main.js -i ${PM2_INSTANCES:-max} --exec_mode cluster"]

#FROM base AS web
#COPY --from=build /prod/app2 /prod/app2
#WORKDIR /prod/app2
#EXPOSE 8001
#CMD [ "pnpm", "start" ]