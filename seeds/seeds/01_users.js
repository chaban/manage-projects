var faker = require('faker');

var roles = ['user', 'admin']

let createRecord = (knex, id) => {
  roles.sort(function() {
    return 0.5 - Math.random()
  });
  return knex('users').insert({
    name: id === 1 ? 'admin' : faker.name.findName(),
    email: id === 1 ? 'admin@example.com' : faker.internet.exampleEmail(),
    role: id === 1 ? 'admin' : 'user',
    password: id === 1 ? "$2y$12$TIBv/wqXdjTg5eUcErDN0.yyFR6WDxO6v5RROxC4ISYBMURQ6ttpK" : "$2y$12$iub9bB4nNVVjfpk4U0o67u22d2AEcHFoKe1SwZJ1KSh9Arlzw4zPC",
    profile: {
      address: faker.address.streetAddress(),
      phone: faker.phone.phoneNumber()
    },
    created_at: new Date(),
    updated_at: new Date()
  })
};

exports.seed = function(knex, Promise) {
  // Deletes ALL existing entries
  return knex('users').del()
    .then(() => {
      let records = [];

      for (let i = 1; i < 10; i++) {
        records.push(createRecord(knex, i))
      }

      return Promise.all(records);
    });
};
