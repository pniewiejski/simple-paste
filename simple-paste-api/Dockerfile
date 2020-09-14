FROM node:12

WORKDIR /opt/simplepaste/


COPY package*.json ./
RUN npm install

COPY . .

ENV PORT 3000
EXPOSE ${PORT}

ENV NODE_ENV production
CMD ["node", "index.js"]