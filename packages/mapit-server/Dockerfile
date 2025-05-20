# ---- 构建阶段 ----
FROM node:22-alpine AS builder

WORKDIR /repo

# 安装 pnpm
RUN npm install -g pnpm

# 拷贝根配置
COPY pnpm-workspace.yaml ./
COPY pnpm-lock.yaml ./
COPY package.json ./

# 拷贝 monorepo 中所有 packages
COPY packages ./packages

# 安装所有依赖（包含 dev）
RUN pnpm install --frozen-lockfile

# 构建 mapit-server
WORKDIR /repo/packages/mapit-server
RUN pnpm build:tsup

# ---- 生产阶段 ----
FROM node:22-alpine AS runtime

WORKDIR /app

# 安装 pnpm（或选择复制 .output 的 node_modules，但更推荐这样干净）
RUN npm install -g pnpm

# 只复制根 package 和目标包的依赖描述
COPY package.json pnpm-lock.yaml ./
COPY packages/mapit-server/package.json ./packages/mapit-server/

# 安装生产依赖
RUN pnpm install --prod --frozen-lockfile

# 复制构建产物
COPY --from=builder /repo/packages/mapit-server/dist ./dist

# 设置入口（根据你的 nest 项目入口）
CMD ["node", "dist/main.js"]
