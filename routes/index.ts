import express from 'express'
import swaggerUI from 'swagger-ui-express';
import swaggerDoc from '../swagger/swagger-compiled.json';
import customers from './customers';
import orders from './orders';
import orderProducts from './orderProducts';
import products from './products';
import suppliers from './suppliers';
import productSuppliers from './productSuppliers';
import productReviews from "./productReviews"
import users from './users'

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