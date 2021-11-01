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
  // When item hits this level a reorder is triggered
  Reorder_Level: {
    type: Sequelize.INTEGER,
  },
  // The number of items to order during a reorder
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
