const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [{
      id: 1,
      name: 'User',
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    },
    {
      id: 2,
      name: 'Admin',
      createdAt: faker.date.recent(),
      updatedAt: faker.date.recent()
    }]
  )},

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {})
  }
};
