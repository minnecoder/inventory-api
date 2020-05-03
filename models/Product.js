const Sequelize = require('sequelize');
const db = require('../config/postgres-db');

const Product = db.define('Products', {
  ProductId: {
    type: Sequelize.INTEGER,
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
  Reorder_Level: {
    type: Sequelize.INTEGER,
  },
  Reorder_Qty: {
    type: Sequelize.INTEGER,
  },
  SupplierId: {
    type: Sequelize.INTEGER,
  },
});

module.exports = Product;
