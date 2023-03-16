FROM node:13.12.0-alpine

WORKDIR /frontend

COPY . .

RUN npm ci

EXPOSE 3000

CMD ["npm", "start"]
