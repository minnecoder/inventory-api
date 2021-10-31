const Sequelize = require('sequelize');
const db = require('../config/postgres-db');
const Product = require('./Product');
const Supplier = require('./Supplier');

const ProductSupplier = db.define('Product_Suppliers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
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

Product.hasMany(ProductSupplier);
ProductSupplier.belongsTo(Product);
Supplier.hasMany(ProductSupplier);
ProductSupplier.belongsTo(Supplier);

module.exports = ProductSupplier;
