const tableName = 'users';

exports.up = (knex) => {
  return knex.schema.createTable(tableName, (table) => {
    table.increments();
    table.string('username').notNullable();
    table.string('password').notNullable();
    table.boolean('admin').notNullable().defaultTo(false);
    table.timestamp('created_at').notNullable().defaultTo(knex.raw('now()'));
  });
};

exports.down = (knex) => {
  return knex.schema.dropTable(tableName);
}
