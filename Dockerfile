FROM node:22-alpine AS builder

WORKDIR /app

# 从 dist/server 复制产物和依赖
COPY dist/server/dist ./dist
COPY dist/server/package.json ./
COPY dist/server/node_modules ./node_modules

# 设置入口
CMD [ "node", "dist/main.js" ]