FROM node:16 AS build-stage

WORKDIR /usr/src/app/hello-test

COPY . .

RUN npm ci

RUN npm run build

# This is a new stage, everything before this is gone, except the files we want to COPY
FROM nginx:1.20-alpine

# COPY the directory build from build-stage to /usr/share/nginx/html
# The target location here was found from the docker hub page
COPY --from=build-stage /usr/src/app/hello-test/build /usr/share/nginx/html

#RUN npm install -g serve

#CMD ["serve", "build"]