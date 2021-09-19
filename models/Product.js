const Sequelize = require('sequelize');
const db = require('../config/postgres-db');

const Product = db.define('Products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Product_Name: {
    type: Sequelize.STRING,
  },
  Product_Desc: {
    type: Sequelize.STRING,
  },
  Product_Cost: {
    type: Sequelize.FLOAT,
  },
  Product_Price: {
    type: Sequelize.FLOAT,
  },
  On_Hand: {
    type: Sequelize.INTEGER,
  },
  Reorder_Level: {
    type: Sequelize.INTEGER,
  },
  Reorder_Qty: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Product;
