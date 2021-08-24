# syntax=docker/dockerfile:1
FROM node:16
ENV NODE_ENV=production

WORKDIR /app

COPY . .

RUN npm install
RUN npm run build

EXPOSE 3005

CMD [ "npm", "start", "-- --spa" ]