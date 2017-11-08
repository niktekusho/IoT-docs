#!/bin/bash

knex migrate:latest --env test --knexfile src/config/config.js
knex seed:run --env test --knexfile src/config/config.js
yarn start
