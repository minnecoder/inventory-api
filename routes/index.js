const express = require('express')
const swaggerUI = require('swagger-ui-express');
const swaggerDoc = require('../swagger/swagger-compiled.json');
const customers = require('./customers');
const orders = require('./orders');
const orderProducts = require('./orderProducts');
const products = require('./products');
const suppliers = require('./suppliers');
const productSuppliers = require('./productSuppliers');
const productReviews = require("./productReviews")
const users = require('./users')

const routes = express.Router()

routes.use('/api/v1/customers', customers);
routes.use('/api/v1/orders', orders);
routes.use('/api/v1/orderproducts', orderProducts);
routes.use('/api/v1/products', products);
routes.use('/api/v1/suppliers', suppliers);
routes.use('/api/v1/productSuppliers', productSuppliers);
routes.use("/api/v1/productreviews", productReviews)
routes.use('/api/v1/users', users)
routes.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDoc));

module.exports = routes