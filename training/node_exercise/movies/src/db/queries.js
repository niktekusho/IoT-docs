// require the correctly configured knex
const knex = require('./connection');

// define some constants
const tableName = 'movies';

function getSavedMovies(userId) {
  return knex(tableName).select().where('user_id', userId);
}

function addMovie(movie) {
  return knex(tableName).insert(movie);
}

module.exports = {
  getSavedMovies,
  addMovie,
};
