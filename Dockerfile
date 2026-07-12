FROM node:22-alpine

WORKDIR /app

# 复制静态文件
COPY index.html .
COPY css/ ./css/
COPY js/ ./js/

# 使用 serve 提供静态文件服务
RUN npm install -g serve

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:3000/ > /dev/null || exit 1

CMD ["serve", "-s", ".", "-l", "3000"]