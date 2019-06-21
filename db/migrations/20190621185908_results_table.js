exports.up = function(knex, Promise) {
  return knex.schema.createTable('selections', function(table) {
    table.increments();
    table.integer('poll_id').references('id').inTable('polls').onDelete('NO ACTION');
    table.string('selection_ranking');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('selections');
};
