var knex = require('./knex.js');

function Trainer() {
  return knex('trainer');
}

// *** queries *** //

function getAll() {
  return Trainer().select();
}

function add(trainer) {
    return Trainer().insert(trainer, 'id');
  }

module.exports = {
  getAll: getAll
};