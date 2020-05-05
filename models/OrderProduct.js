const Sequelize = require('sequelize');
const db = require('../config/postgres-db');
const Order = require('./Order');
const Product = require('./Product');

const OrderProduct = db.define('Order_Products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  OrderId: {
    type: Sequelize.INTEGER,
    references: {
      model: Order,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  ProductId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  Quantity_Ordered: {
    type: Sequelize.INTEGER,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = OrderProduct;
