const faker = require('faker');
const moment = require('moment');

let data = []
for (let i = 0; i < 100; i++) {
  let firstname = faker.name.firstName()
    data.push({
        id: data.length + 1,
        name: `${firstname} ${faker.name.lastName()}`,
        email: faker.internet.email(),
        username: faker.internet.userName(firstname),
        password: faker.internet.password(),
        role_id: 1,
        online: faker.datatype.boolean(),
        createdAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss'),
        updatedAt: moment(Date.now()).format('YYYY-MM-DD HH:mm:ss')
    })
}

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Users', data)
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Users', null, {})
  }
};
