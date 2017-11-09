const express = require('express');
const logger = require('morgan');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

// load API endpoints
const routes = require('./routes/users');

// load utility middleware functions for express
const util = require('./utils');

const app = express();

// initialize headers
app.use(util.initHeaders);

// setup and configure morgan for logging
app.use(logger('dev'));

// setup and configure js object parsing in request's body or urls
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser());

// use the endpoints defined
app.use('/users', routes);

// return 404 on wrong endpoints
app.use(util.handleUndefinedRoutes);

// give detailed info on errors
app.use(util.handleError);

module.exports = app;
