FROM node:8

# create app directory and change to it
RUN mkdir -p /usr/app/src
WORKDIR /usr/app

# add locally installed node packages to the PATH
ENV PATH /usr/app/node_modules/.bin:$PATH

# copy basic stuff and install dependencies
COPY package.json yarn.lock /usr/app/
RUN yarn install

# copy application
COPY ./src /usr/app/src/

# copy entrypoint
COPY entrypoint.sh /usr/app/

# make entrypoint executable
RUN chmod +x ./entrypoint.sh

# start app
CMD ["./entrypoint.sh"]
