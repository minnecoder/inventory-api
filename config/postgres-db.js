const Sequelize = require('sequelize');

module.exports = new Sequelize(
  process.env.POSTGRES_DB,
  process.env.POSTGRES_USER,
  process.env.POSTGRES_PWD,
  {
    host: process.env.POSTGRES_SERVER,
    dialect: 'postgres',
  }
);
