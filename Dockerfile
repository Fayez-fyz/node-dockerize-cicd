FROM node:alpine 

WORKDIR /usr/src/app

COPY package*.json .

RUN npm ci

COPY . .

RUN npm run build

USER node

CMD ["npm", "run", "start"]

