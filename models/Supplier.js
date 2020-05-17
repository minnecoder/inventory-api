const Sequelize = require('sequelize');
const db = require('../config/postgres-db');

const Supplier = db.define('Suppliers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Supplier_Name: {
    type: Sequelize.STRING,
  },
  Supplier_Address: {
    type: Sequelize.STRING,
  },
  Supplier_City: {
    type: Sequelize.STRING,
  },
  Supplier_State: {
    type: Sequelize.STRING,
  },
  Supplier_Zip: {
    type: Sequelize.STRING,
  },
  Supplier_Phone: {
    type: Sequelize.STRING,
  },
  Supplier_Email: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Supplier;
