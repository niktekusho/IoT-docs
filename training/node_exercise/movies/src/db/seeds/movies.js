exports.seed = (knex, Promise) => {
  return knex('movies').del().then(() => {
    return Promise.join(
      knex('movies').insert({
        user_id: 1,
        title: 'Test',
      })
    );
  }).catch(err => console.err(err));
};
