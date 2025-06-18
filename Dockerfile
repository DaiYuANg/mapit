FROM node:22-alpine AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

FROM base AS build
COPY . /usr/src/app
WORKDIR /usr/src/app
RUN --mount=type=cache,id=pnpm,target=/pnpm/store pnpm install --frozen-lockfile
RUN pnpm run -r build
RUN pnpm deploy --filter=@mapit/server --prod /prod/server

FROM base AS server
COPY --from=build /prod/server/dist /prod/server/dist
COPY --from=build /prod/server/package.json /prod/server/package.json
COPY --from=build /prod/server/node_modules /prod/server/node_modules

WORKDIR /prod/server
EXPOSE 3000
CMD [ "node", "dist/main.js" ]

#FROM base AS web
#COPY --from=build /prod/app2 /prod/app2
#WORKDIR /prod/app2
#EXPOSE 8001
#CMD [ "pnpm", "start" ]