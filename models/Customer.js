const Sequelize = require('sequelize');
const dbTest = require('../utils/dbConnection').getDB

const db = dbTest()
const Customer = db.define('Customers', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true,
  },
  Customer_Name: {
    type: Sequelize.STRING,
  },
  Customer_Address: {
    type: Sequelize.STRING,
  },
  Customer_City: {
    type: Sequelize.STRING,
  },
  Customer_State: {
    type: Sequelize.STRING,
  },
  Customer_Zip: {
    type: Sequelize.STRING,
  },
  Customer_Phone: {
    type: Sequelize.STRING,
  },
  Customer_Email: {
    type: Sequelize.STRING,
  },
  createdAt: {
    type: Sequelize.DATE,
  },
  updatedAt: {
    type: Sequelize.DATE,
  },
});

module.exports = Customer;
