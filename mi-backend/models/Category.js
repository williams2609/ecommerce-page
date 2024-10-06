const {Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database'); // Asegúrate de tener configurado Sequelize

const Category = sequelize.define('category', {
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: DataTypes.STRING,
  },
}, {
  timestamps: true,
});

module.exports = Category;