var faker = require('faker');

let createRecord = (knex, id) => {
  return knex('documents').insert({
    project_id: faker.random.number({
      'min': 1,
      'max': 9
    }),
    name: faker.lorem.sentence(),
    url: faker.internet.url(),
    created_at: new Date(),
    updated_at: new Date()
  })
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('documents').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 40; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
