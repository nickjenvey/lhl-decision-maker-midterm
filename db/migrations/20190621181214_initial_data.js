exports.up = function(knex, Promise) {
  // knex.schema.dropTableIfExists('polls').then(function() {
  return knex.schema.createTable('polls', function(table) {
    table.increments();
    table.string('admin_email');
    table.string('question');
    table.string('admin_url');
    table.string('user_url');
  });
  // });

};

exports.down = function(knex, Promise) {
  return knex.schema.dropTableIfExists('polls');
};
