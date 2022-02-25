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

    role_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      defaultValue: 1,
    },

    online: {
      type: DataTypes.BOOLEAN,
    },

    wishlist: {
      type: DataTypes.STRING,
    },

    view_history: {
      type: DataTypes.STRING,
    },
  }, {
    sequelize,
    modelName: 'Users',
    tableName: 'Users',
    freezeTableName: true,
  });

  return Users;
};