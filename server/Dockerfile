FROM node:18.16.1

WORKDIR /usr/app

COPY package*.json ./


RUN npm install

COPY dist .

EXPOSE 80

CMD ["npm", "run", "start"]

