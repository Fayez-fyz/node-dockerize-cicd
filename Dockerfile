FROM node:alpine 

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

USER node

EXPOSE 5000

CMD ["npm", "run", "start"]

