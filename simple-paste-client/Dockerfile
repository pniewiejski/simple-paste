# Build image
FROM node:12-alpine as build
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

# Read https://hub.docker.com/_/nginx for more information about
# environment variable substitution in docker image.
#   > Out-of-the-box, nginx doesn't support environment
#   > variables inside most configuration blocks.
# 
# https://github.com/nginxinc/docker-nginx/blob/master/stable/alpine/20-envsubst-on-templates.sh
# uses templates to create correct config files before nginx itself is started
COPY ./nginx.conf.template /etc/nginx/templates/default.conf.template
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]