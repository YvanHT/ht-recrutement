FROM node:16 AS builder

WORKDIR /ht-recrutement-backoffice

COPY package.json .

RUN npm install

COPY . .

RUN npm run build

EXPOSE 3001

CMD ["sh", "-c", "PORT=3001 npm start"]

