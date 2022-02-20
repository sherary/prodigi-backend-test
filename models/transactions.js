'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Transactions extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Transactions.init({
    product_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    user_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    discount: {
      type: DataTypes.INTEGER
    },

    total: {
      type: DataTypes.DECIMAL,
    }
  }, {
    sequelize,
    modelName: 'Transactions',
    tableName: 'Transactions',
    freezeTableName: true
  });

  return Transactions;
};