## Use the official Node.js image as the base image
#FROM node:22-alpine AS builder
#
#ENV NODE_ENV production
## Set the working directory inside the container
#WORKDIR /usr/src/app
#
#RUN npm config set registry https://registry.npmmirror.com
#
#RUN npm install -g pnpm
## Copy package.json and package-lock.json to the working directory
#COPY package.json ./
#
## Install the application dependencies
#RUN pnpm install
#
## Copy the rest of the application files
#COPY . .
#
## Build the NestJS application
#RUN pnpm run build
#
#FROM node:22-alpine AS runner
#
#ENV NODE_ENV production
#
#WORKDIR /app
#
## 只复制构建结果
#COPY --from=builder /usr/src/app/dist ./dist
#COPY --from=builder /usr/src/app/package.json ./package.json
#COPY --from=builder /usr/src/app/node_modules ./node_modules
#
#CMD ["node", "dist/main.js"]
###################
# DEVELOPMENT STAGE (for caching dependencies)
###################
FROM node:22-alpine as development

# 使用 corepack 管理 pnpm
RUN corepack enable && corepack prepare pnpm@9.10.0 --activate

WORKDIR /usr/src/app

# 只复制锁文件用于缓存依赖
COPY --chown=node:node package.json ./

# 使用 fetch 提前缓存依赖
RUN pnpm fetch --prod

# 复制完整源码
COPY --chown=node:node . .

# 安装所有依赖（包含 dev）
RUN pnpm install

USER node


###################
# BUILD STAGE
###################
FROM node:22-alpine as build

RUN corepack enable && corepack prepare pnpm@9.10.0 --activate

WORKDIR /usr/src/app

# 拷贝依赖缓存（注意要与 fetch 产物相匹配）
COPY --chown=node:node package.json ./
COPY --chown=node:node --from=development /usr/src/app/node_modules ./node_modules

# 复制全部源码
COPY --chown=node:node . .

# 构建项目
RUN pnpm build

# 设置生产环境变量
ENV NODE_ENV=production

# 安装生产依赖，确保只包含必要内容
RUN pnpm install --prod

USER node


###################
# PRODUCTION STAGE
###################
FROM node:slim as production

WORKDIR /app

# 使用 node 用户
USER node

# 拷贝运行时依赖
COPY --chown=node:node --from=build /usr/src/app/node_modules ./node_modules
COPY --chown=node:node --from=build /usr/src/app/package.json ./
COPY --chown=node:node --from=build /usr/src/app/dist ./dist

# 设置入口
CMD [ "node", "dist/main.js" ]
