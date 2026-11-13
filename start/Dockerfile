FROM node:26.13.1-alpine
WORKDIR /app
COPY app/package.json ./package.json
COPY app/server.js ./server.js
USER node
EXPOSE 8080
CMD ["node", "server.js"]
