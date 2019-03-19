var faker = require('faker');

let createRecord = (knex, id) => {
  return knex('messages').insert({
    project_id: faker.random.number({
      'min': 1,
      'max': 9
    }),
    user_id: faker.random.number({
      'min': 1,
      'max': 9
    }),
    body: faker.lorem.sentence(),
    created_at: new Date(),
    updated_at: new Date()
  })
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('messages').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 40; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
