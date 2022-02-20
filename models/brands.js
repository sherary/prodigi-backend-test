'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Brands extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Brands.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
    },

    logo: {
      type: DataTypes.BLOB,
      get() {
        return this.getDataValue('logo').split(';')
      },
      set(value) {
        this.setDataValue('logo', value.join(';'));
      },
    }
  }, {
    sequelize,
    modelName: 'Brands',
    tableName: 'Brands',
    freezeTableName: true,
  });

  return Brands;
};