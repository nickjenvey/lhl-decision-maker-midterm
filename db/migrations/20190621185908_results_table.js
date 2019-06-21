exports.up = function(knex, Promise) {
  return knex.schema.createTable('results', function(table) {
    table.increments();
    table.integer('poll_id').references('id').inTable('polls');
    table.string('option_ranking');
    table.string('option_content');
  });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('results');
};
