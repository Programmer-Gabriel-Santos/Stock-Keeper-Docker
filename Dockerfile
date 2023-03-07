FROM node:alpine

WORKDIR /app

ENV DB_HOST=db \
    DB_USER=root \
    DB_DATABASE=StockKeeper \
    DB_PASSWORD=root \
    DB_PORT=3306 \
    PORT=3003 \
    JWT_KEY=ajsuegdtchbsm\
    JWT_EXPIRES_IN=24h \
    BCRYPT_SALT_ROUNDS=12

COPY package.json .
COPY build /app/build

RUN npm install --production

CMD ["npm", "run", "start"]
