# ─────────────────────────────
# STAGE 1: Build
# ─────────────────────────────
FROM golang:1.24 AS builder

# 设置环境变量，开启模块支持和静态编译
ENV CGO_ENABLED=0 \
    GOOS=linux \
    GO111MODULE=on

# 设置工作目录
WORKDIR /app

# 将 go.mod 和 go.sum 提前复制并下载依赖，加速构建
COPY go.mod go.sum ./
RUN go mod download

# 复制项目源码
COPY . .

# 编译为静态二进制文件
RUN go build -ldflags="-s -w" -o app ./main.go

# ─────────────────────────────
# STAGE 2: Run
# ─────────────────────────────
FROM alpine:latest

# 安装基础依赖（如果需要证书验证等）
RUN apk --no-cache add ca-certificates

# 创建非 root 用户（可选）
# RUN adduser -D -g '' appuser
# USER appuser

# 设置工作目录
WORKDIR /app

# 从 builder 阶段复制二进制文件
COPY --from=builder /app/app .

# 暴露端口（可选）
EXPOSE 8080

# 启动服务
CMD ["./app"]
