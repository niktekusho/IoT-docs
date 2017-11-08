#!/bin/sh

echo $PATH

hash knex

knex

/app/node_modules/.bin/knex migrate:latest --env test --knexfile src/config/config.js
/app/node_modules/.bin/knex seed:run --env test --knexfile src/config/config.js
yarn start
