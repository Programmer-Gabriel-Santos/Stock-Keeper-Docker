FROM node:alpine

WORKDIR /app

COPY package.json .

COPY tsconfig.json .

ENV DB_HOST 172.18.0.2

ENV DB_USER root

ENV DB_DATABASE my_store

ENV DB_PASSWORD root

RUN npm i -D ts-node-dev

EXPOSE 3003

CMD ["npm", "run", "dev"]