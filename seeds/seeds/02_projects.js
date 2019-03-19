var faker = require('faker');

let createRecord = (knex, id) => {
  return knex('projects').insert({
    user_id: faker.random.number({
      'min': 2,
      'max': 9
    }),
    name: faker.lorem.sentence(),
    created_at: new Date(),
    updated_at: new Date()
  })
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('projects').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 10; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
