const Sequelize = require('sequelize');
const db = require('../config/postgres-db');
const Product = require('./Product');
const Supplier = require('./Supplier');

const ProductSupplier = db.define('Order_Products', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
  },
  ProductId: {
    type: Sequelize.INTEGER,
    references: {
      model: Product,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },
  SupplierId: {
    type: Sequelize.INTEGER,
    references: {
      model: Supplier,
      key: 'id',
      deferrable: Sequelize.Deferrable.INITIALLY_IMMEDIATE,
    },
  },

  Product_Supplier_Notes: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = ProductSupplier;
