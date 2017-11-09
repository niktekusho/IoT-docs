#!/bin/bash

knex migrate:latest --env $NODE_ENV --knexfile src/config.js
knex seed:run --env $NODE_ENV --knexfile src/config.js
yarn start
