const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Product extends Model {}

Product.init({
  title: {
    type: DataTypes.STRING,
    allowNull: false
  },
  price: {
    type: DataTypes.FLOAT,
    allowNull: false
  },
  description: {
    type: DataTypes.TEXT,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  thumbnail: {
    type: DataTypes.STRING,
  },
  category: {
    type: DataTypes.STRING,
  },
  discountPercentage: {
    type: DataTypes.FLOAT,
    allowNull: true
  }
}, {
  sequelize,
  modelName: 'Product'
});

module.exports = Product;