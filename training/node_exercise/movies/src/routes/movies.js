const express = require('express');
const request = require('request-promise');

const queries = require('../db/queries');

const router = express.Router();

function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({ status: 'Please log in' });
  }
  const options = {
    method: 'GET',
    uri: 'http://users-service:3000/users/user',
    json: true,
    headers: {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${req.headers.authorization.split(' ')[1]}`,
    },
  };
  return request(options).then((res) => {
    req.userId = res.user;
    return next();
  }).catch(err => next(err));
}

if (process.env.NODE_ENV === 'test') {
  ensureAuthenticated = (req, res, next) => {
    req.userId = 1;
    return next();
  };
}

// test endpoint
router.get('/ping', (req, res) => {
  res.send('pong');
});

// get movies by user
router.get('/user', ensureAuthenticated, (req, res, next) => {
  return queries.getSavedMovies(req.userId)
    .then((movies) => {
      res.json({
        status: 'success',
        data: movies,
      });
    }).catch(err => next(err));
});

// add a movie
router.post('/', ensureAuthenticated, (req, res, next) => {
  req.body.user_id = req.userId;
  console.log('test');
  return queries.addMovie(req.body).then(() => {
    res.json({
      status: 'success',
      data: 'Movie added',
    });
  }).catch(err => next(err));
});

module.exports = router;
