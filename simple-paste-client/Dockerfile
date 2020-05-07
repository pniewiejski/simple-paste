# Build image
FROM node:13.12.0-alpine as build
WORKDIR /app
ENV PATH /app/node_modules/.bin:$PATH
COPY ./simple-paste/package.json ./
COPY ./simple-paste/package-lock.json ./
RUN npm install
COPY ./simple-paste/. ./
RUN npm run build

CMD ["/bin/bash"]

# Production image
FROM nginx:stable-alpine
COPY --from=build /app/build /usr/share/nginx/html

COPY ./nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]