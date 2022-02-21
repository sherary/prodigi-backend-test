'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Products extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  };
  Products.init({
    title: {
      type: DataTypes.STRING,
      allowNull: false,
    },

    description: {
      type: DataTypes.STRING,
    },

    admin_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },

    brand_id: {
      type: DataTypes.BIGINT,
    },

    type_id: {
      type: DataTypes.BIGINT,
    },

    price: {
      type: DataTypes.DECIMAL,
      allowNull: false,
      defaultValue: 0
    },

    views: {
      type: DataTypes.BIGINT,
    },

    wishlisted: {
      type: DataTypes.BIGINT,
    },

    images: {
      type: DataTypes.BLOB("long"),
    }
  }, {
    sequelize,
    modelName: 'Products',
    tableName: 'Products',
    freezeTableName: true
  });

  return Products;
};