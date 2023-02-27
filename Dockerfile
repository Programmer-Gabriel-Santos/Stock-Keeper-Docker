FROM node:alpine

WORKDIR /app

COPY package.json .

COPY .env .

COPY tsconfig.json .

RUN npm i -D ts-node-dev

EXPOSE 3003

CMD ["npm", "run", "dev"]