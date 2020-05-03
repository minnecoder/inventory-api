const Sequelize = require('sequelize');
const db = require('../config/postgres-db');
const Customer = require('./Customer');

const Order = db.define('Orders', {
  OrderId: {
    type: Sequelize.INTEGER,
  },
  CustomerId: {
    type: Sequelize.INTEGER,
    references: {
      model: Customer,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  Order_Status: {
    type: Sequelize.STRING,
  },
  Order_Total: {
    type: Sequelize.FLOAT,
  },
});

module.exports = Order;
