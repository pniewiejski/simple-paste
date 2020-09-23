FROM node:12-alpine

WORKDIR /opt/simplepaste/


COPY package*.json ./
RUN npm install

COPY . .

RUN npm run build

ENV PORT 3000
EXPOSE ${PORT}

ENV NODE_ENV production
CMD ["node", "./build/index.js"]