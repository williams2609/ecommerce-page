const { Sequelize } = require('sequelize');

const sequelize = new Sequelize('ecommerce','postgres','lobo2609',{
    host: 'localhost',
    dialect: 'postgres',
});

module.exports = sequelize;