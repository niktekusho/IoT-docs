const bcrypt = require('bcryptjs');

const knex = require('../db/connection');
const auth = require('./local');

const tableName = 'users';

function createUser(req) {
  const salt = bcrypt.genSaltSync();
  const hash = bcrypt.hashSync(req.body.password, salt);
  return knex(tableName).insert({
    username: req.body.username,
    password: hash,
  }).returning('*');
}

function getUser(username) {
  return knex(tableName).where({username}).first();
}

function comparePassword(userPassword, dbPassword) {
  return bcrypt.compareSync(userPassword, dbPassword);
}

function ensureAuthenticated(req, res, next) {
  if (!(req.headers && req.headers.authorization)) {
    return res.status(400).json({
      status: 'Please log in',
    });
  }
  const header = req.headers.authorization.split(' ');
  const token = header[1];
  auth.decodeToken(token, (err, payload) => {
    if (err) {
      return res.status(401).json({
        status: 'Token expired',
      });
    }
    return knex(tableName)
            .where({id: parseInt(payload.sub, 10) })
            .first()
            .then((user) => {
              req.user = user.id;
              return next();
            })
            .catch(() => res.status(500).json({ status: 'error' }));
  });
}

module.exports = {
  createUser,
  getUser,
  comparePassword,
  ensureAuthenticated,
};
