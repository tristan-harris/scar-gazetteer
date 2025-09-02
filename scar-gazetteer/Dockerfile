# step 1
FROM node:14-alpine as builder

WORKDIR /tmp/app
COPY ./ .
RUN npm cache clean --force
RUN npm install && npm run build

# step 2
FROM nginx:latest

COPY ./default.conf.template /etc/nginx/templates/default.conf.template
COPY --from=builder /tmp/app/dist/ /usr/share/nginx/html/

HEALTHCHECK --interval=60s --timeout=3s CMD curl --fail http://localhost/ || exit 1
