const faker = require('faker');
const { QueryTypes } = require('sequelize');
const { sequelize } = require('../models')

module.exports = {
  up: async (queryInterface, Sequelize) => {
    let data = []
    const query = `SELECT p.id, p.price FROM Products p
    LEFT JOIN Transactions t ON t.product_id = p.id`
    
    try {
      await sequelize.query(query, {
        type: QueryTypes.SELECT
      }).then(result => {
        console.log(result)
        for (let i = 0; i < 200; i++) {
          data.push({
            id: data.length + 1,
            product_id: faker.datatype.number({ min: 1, max: 200 }),
            user_id: faker.datatype.number({ min: 1, max: 100 }),
            discount: 0,
            total: Number(result[i].price),
            createdAt: faker.date.recent(),
            updatedAt: faker.date.recent(),
          })
        }  
      })
    } catch (error) {
        console.log(error)
    }

    await queryInterface.bulkInsert('Transactions', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Transactions', null, {})
  }
};
