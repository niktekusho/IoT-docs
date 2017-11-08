#!/bin/bash

knex migrate:latest --env test --knexfile src/config.js
knex seed:run --env test --knexfile src/config.js
yarn start
