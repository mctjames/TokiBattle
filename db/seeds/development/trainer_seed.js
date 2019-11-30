exports.seed = function(knex, Promise) {
  return knex('trainer').del() // Deletes ALL existing entries
    .then(function() { // Inserts seed entries one by one in series
      return knex('trainer').insert({
        username: 'admin',
        password: 'password',
        admin: '1'
      });
    }).then(function () {
      return knex('trainer').insert({
        username: 'player1',
        password: 'password',
        admin: '0'
      });
    }).then(function () {
      return knex('trainer').insert({
        username: 'player2',
        password: 'password',
        admin: '0'
      });
    }).then(function () {
      return knex('trainer').insert({
        username: 'notadmin',
        password: 'password',
        admin: '0'
      });
    });
};
// exports.seed = function(knex) {
//   // Deletes ALL existing entries
//   return knex('table_name').del()
//     .then(function () {
//       // Inserts seed entries
//       return knex('table_name').insert([
//         {id: 1, colName: 'rowValue1'},
//         {id: 2, colName: 'rowValue2'},
//         {id: 3, colName: 'rowValue3'}
//       ]);
//     });
// };
