'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Users extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Users.init({
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    wishlist: {
      type: DataTypes.STRING,
      get: () => {
        return JSON.parse(this.getDataValue('wishlist'));
      },
      set: (value) => {
        return this.setDataValue('wishlist'), JSON.stringify(value)
      }
    },

    view_history: {
      type: DataTypes.STRING,
      get: () => {
        return JSON.parse(this.getDataValue('view_history'));
      },
      set: (value) => {
        return this.setDataValue('view_history'), JSON.stringify(value)
      }
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    freezeTableName: true,
  });

  return Users;
};