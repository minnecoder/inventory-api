const Sequelize = require('sequelize');
const db = require('../config/postgres-db');

const Order = db.define('Orders', {
  OrderId: {
    type: Sequelize.INTEGER,
  },
  CustomerId: {
    type: Sequelize.INTEGER,
  },
  Order_Status: {
    type: Sequelize.STRING,
  },
  Order_Total: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Order;
