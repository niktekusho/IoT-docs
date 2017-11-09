FROM node:8

# create app directory and change to it
RUN mkdir /usr/src/app
WORKDIR /usr/src

# add locally installed node packages to the PATH
ENV PATH /usr/src/node_modules/.bin:$PATH

# copy basic stuff and install dependencies
COPY package.json yarn.lock /usr/src/
RUN yarn install

# copy application
COPY ./src /usr/src/src/

# copy entrypoint
COPY entrypoint.sh /usr/src/

# make entrypoint executable
RUN chmod +x ./entrypoint.sh

# docker image build time argument
ARG USERS_SERVICE_URL

ENV USERS_SERVICE_URL=$USERS_SERVICE_URL

# start app
CMD ["./entrypoint.sh"]
