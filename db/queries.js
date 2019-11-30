var knex = require('./knex.js');

function Trainer() {
  return knex('trainer');
}

// *** queries *** //

function getAll() {
  return Trainer().select();
}


module.exports = {
  getAll: getAll
};