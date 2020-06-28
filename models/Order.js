const Sequelize = require('sequelize');
const db = require('../config/postgres-db');
const Customer = require('./Customer');

const Order = db.define('Orders', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
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
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Order;
