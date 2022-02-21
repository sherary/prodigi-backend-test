const faker = require('faker');
const moment = require('moment');

let data = []
for (let i = 0; i < 10; i++) {
    data.push({
        id: data.length + 1,
        name: faker.commerce.productAdjective(),
        createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Types', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Types', null, {})
  }
};
