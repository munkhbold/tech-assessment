FROM node:12.18-slim
WORKDIR /app
COPY package.json package-lock.json ./
RUN apt-get update && \
  mkdir -p /usr/share/man/man1 && \
  mkdir -p /usr/share/man/man7 && \
  apt-get install -y postgresql-client && \
  npm install
COPY . .
RUN npm run build-server
EXPOSE 3010
ENTRYPOINT [ "./docker-entrypoint.sh" ]
CMD ["npm", "run", "start"]