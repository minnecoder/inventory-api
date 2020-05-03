const Sequelize = require('sequelize');
const db = require('../config/postgres-db');

const OrderProduct = db.define('Order_Products', {
  OrderId: {
    type: Sequelize.INTEGER,
  },
  ProductId: {
    type: Sequelize.INTEGER,
  },
  Quantity_Ordered: {
    type: Sequelize.INTEGER,
  },
});

module.exports = OrderProduct;
