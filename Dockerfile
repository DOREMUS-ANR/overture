FROM node:24-alpine

LABEL maintainer "Pasquale Lisena <pasquale.lisena@eurecom.fr>"

ENV NODE_ENV=production

WORKDIR /usr/src/app
COPY . /usr/src/app

RUN npm install --omit=dev --no-audit --no-fund


EXPOSE 3333

CMD npm run prod
