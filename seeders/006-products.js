const faker = require('faker');
const moment = require('moment');

let data = []
for(let i = 0; i < 200; i++) {
  data.push({
    id: data.length + 1,
    title: faker.commerce.productName(),
    description: faker.commerce.productDescription(),
    admin_id: faker.datatype.number({ min: 1, max: 100 }),
    brand_id: faker.datatype.number({ min: 1, max: 20 }),
    type_id: faker.datatype.number({ min: 1, max: 10 }),
    price: faker.commerce.price(),
    views: faker.datatype.number({ min: 100, max: 100000000 }),
    wishlisted: faker.datatype.number({ min: 1, max: 1000000 }),
    createdAt: faker.date.recent(),
    updatedAt: faker.date.recent()
  })
}
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Products', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Products', null, {})
  }
};
