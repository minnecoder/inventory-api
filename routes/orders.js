const express = require('express');

// const { getOrderProduct } = require('../controllers/orderProducts');
const { getOrders, addOrder } = require('../controllers/orders');
const { addOrderProduct } = require('../controllers/orderProducts');

const router = express.Router();

router.route('/').get(getOrders).post(addOrder, addOrderProduct);

module.exports = router;
