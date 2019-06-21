exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('selections').del()
    .then(function() {
      return Promise.all([
        // Inserts seed entries
        knex('selections').insert({
          poll_id: 1,
          selection_ranking: JSON.stringify({ Ramen: 0, Pho: 0, Pizza: 0 }),
        })
      ]);
    });
};
