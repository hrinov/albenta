# Dockerfile for server deployment

FROM node:18.16.0

WORKDIR /app

COPY server/ .

RUN npm install

RUN npm run build

EXPOSE 8080

CMD ["npm", "run", "start"]