FROM node:alpine
WORKDIR /usr/src/app
COPY package*.json /usr/src/app/
COPY . /usr/src/app/
RUN npm install && npm run build

EXPOSE 8000

ENTRYPOINT npm start
