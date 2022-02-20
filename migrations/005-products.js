'use strict';
module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.BIGINT
      },

      title: {
        type: Sequelize.STRING,
        allowNull: false,
      },

      description: {
        type: Sequelize.STRING,
      },

      admin_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Admins',
          key: 'id',
        },
      },

      brand_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Brands',
          key: 'id',
        },
      },

      type_id: {
        type: Sequelize.BIGINT,
        allowNull: false,
        references: {
          model: 'Types',
          key: 'id',
        },
      },

      price: {
        type: Sequelize.DECIMAL,
        allowNull: false,
        default: 0
      },

      views: {
        type: Sequelize.BIGINT,
      },

      wishlisted: {
        type: Sequelize.BIGINT,
      },

      images: {
        type: Sequelize.STRING,
        get() {
          return this.getDataValue('images').split(';')
        },
        set(value) {
          this.setDataValue('images', value.join(';'));
        },
      },

      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  down: async (queryInterface, Sequelize) => {
    await queryInterface.dropTable('Products');
  }
};