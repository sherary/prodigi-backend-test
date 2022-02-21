const faker = require('faker');
const moment = require('moment');

let data = []
for (let i = 0; i < 20; i++) {
  data.push({
    id: data.length + 1,
    name: `${faker.company.companyName()} ${faker.company.companySuffix()}`,
    description: faker.company.catchPhrase(),
    createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
    updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
  })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Brands', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Brands', null, {})
  }
};
