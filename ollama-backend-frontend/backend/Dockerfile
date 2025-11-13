FROM node:20-alpine

WORKDIR /app

COPY package*.json .

RUN npm install
# otra forma (en este no instala las dependencias de desarrollo) --> RUN npm ci --omit=dev

COPY src ./src

EXPOSE 3002

CMD ["node", "src/mini-server.js"]