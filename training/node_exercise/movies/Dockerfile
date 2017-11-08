FROM node:8-alpine

# install bash
RUN apk add --update bash && rm -rf /var/cache/apk/*

# create app directory and change to it
RUN mkdir -p /app
WORKDIR /app

# add locally installed node packages to the PATH
ENV PATH app/node_modules/.bin:$PATH

# copy basic stuff and install dependencies
COPY package.json yarn.lock /app/
RUN yarn install

# copy application
COPY ./src /app/src/

# copy entrypoint
COPY entrypoint.sh /app

# make entrypoint executable
RUN chmod +x ./entrypoint.sh

# start app
CMD ["./entrypoint.sh"]
