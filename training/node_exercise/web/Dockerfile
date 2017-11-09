FROM node:8

RUN mkdir -p /usr/app/src
WORKDIR /usr/app/

ENV PATH /usr/app/node_modules/.bin:$PATH

ARG REACT_APP_USERS_SERVICE_URL
ARG REACT_APP_MOVIES_SERVICE_URL
ARG NODE_ENV

ENV REACT_APP_USERS_SERVICE_URL=$REACT_APP_USERS_SERVICE_URL
ENV REACT_APP_MOVIES_SERVICE_URL=$REACT_APP_MOVIES_SERVICE_URL
ENV NODE_ENV=$NODE_ENV

COPY package.json yarn.lock /usr/app/
RUN yarn install && yarn global add pushstate-server

COPY ./src /usr/app/src/
COPY ./public /usr/app/public/

RUN yarn run build

CMD ["pushstate-server", "build"]
