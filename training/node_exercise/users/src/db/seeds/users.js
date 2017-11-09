const bcrypt = require('bcryptjs');

exports.seed = (knex, Promise) => {
  return knex('users').del().then(() => {
    const salt = bcrypt.genSaltSync();
    const hash = bcrypt.hashSync('test', salt);
    return Promise.join(
      knex('users').insert({
        username: 'test',
        password: hash,
      })
    );
  }).catch(err => console.error(err));
};
