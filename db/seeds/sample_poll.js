exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('polls').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('polls').insert({
          admin_email: 'test@test.com',
          question: 'What should we eat?',
          admin_url: 'abc123',
          user_url: 'xyz123'
        })
      ]);
    });
};
