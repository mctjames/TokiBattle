
exports.up = function(knex, Promise) {
return knex.schema.createTable('trainer', function(table){
    //table.increments();
    table.string('username').notNullable().unique();
    table.string('password').notNullable();
    table.string('admin').notNullable();
    });
};

exports.down = function(knex, Promise) {
    return knex.schema.dropTable('trainer'); 
};
