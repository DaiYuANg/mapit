#############################
## 1️⃣ 依赖阶段 —— 安装 node_modules
#############################
#FROM node:22-alpine AS deps
#WORKDIR /app
#
## 复制包管理文件（能最大化地命中构建缓存）
#COPY package.json yarn.lock* package-lock.json* pnpm-lock.yaml* .npmrc* ./
#
## 判断锁文件类型并安装依赖
#RUN npm install -g pnpm && pnpm i;
#
#############################
## 2️⃣ 构建阶段 —— 编译 Refine 前端
#############################
#FROM node:22-alpine AS builder
#WORKDIR /app
#
## 先拷贝依赖，避免再次安装
#COPY --from=deps /app/node_modules ./node_modules
#
## 再拷贝源代码并构建
#COPY . .
#ENV NODE_ENV=production
#RUN pnpm run build  # 或 yarn build / pnpm build
#
#############################
## 3️⃣ 运行阶段 —— nginx:alpine 托管静态文件
#############################
#FROM nginx:alpine AS runner
## 如有自定义配置就 COPY；若用默认配置可省略
##COPY default.conf /etc/nginx/default.conf
#
## 拷贝构建产物到 nginx 默认静态目录
#COPY --from=builder /app/dist /usr/share/nginx/html
#
#EXPOSE 80
#CMD ["nginx", "-g", "daemon off;"]

FROM nginx:alpine AS runner
## 如有自定义配置就 COPY；若用默认配置可省略
COPY default.conf /etc/nginx/conf.d/default.conf
#
## 拷贝构建产物到 nginx 默认静态目录
COPY dist /usr/share/nginx/html
#
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
