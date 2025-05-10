# ========= Build stage =========
FROM node:22-alpine AS builder

WORKDIR /app

RUN sed -i 's/dl-cdn.alpinelinux.org/mirrors.ustc.edu.cn/g' /etc/apk/repositories

RUN apk add --no-cache --virtual .build-deps \
    build-base \
    python3 \
    sqlite-dev && \
    corepack enable && \
    corepack prepare pnpm@latest --activate

COPY pnpm-lock.yaml* package.json ./

RUN pnpm approve-builds

RUN pnpm install --unsafe-perm

RUN cd node_modules/better-sqlite3 && pnpm build-release

COPY . .

# 使用 pnpm 构建（你说的是 build:npx，这里也兼容）
RUN pnpm run build

RUN pnpm prune --prod

RUN apk del .build-deps

RUN find ./node_modules -type d \( \
    -name 'test' -o \
    -name 'tests' -o \
    -name '__tests__' -o \
    -name 'docs' -o \
    -name 'examples' -o \
    -name '*.d.ts' -o \
    -name '*.map' \
    \) -exec rm -rf {} +
# ========= Runtime stage =========
FROM node:22-alpine

WORKDIR /app

# 拷贝运行所需的文件
COPY --from=builder /app/dist ./dist
COPY --from=builder /app/node_modules ./node_modules
COPY --from=builder /app/package.json ./

EXPOSE 3000
CMD ["node", "dist/main"]
