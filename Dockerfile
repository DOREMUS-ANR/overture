FROM node:current-alpine

MAINTAINER Pasquale Lisena <pasquale.lisena@eurecom.fr>

ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY . /usr/src/app

# Install app dependencies
RUN npm install --production

EXPOSE 3333

CMD npm run prod
