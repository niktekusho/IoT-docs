const knex = require('knex');

const config = require('../config');

// check if the node process is in production or in development
const env = process.env.NODE_ENV || 'development';

// load the appropriate configuration based on the current environment
const currentConfig = config[env];

// exports knex with current configuration
module.exports = knex(currentConfig);
