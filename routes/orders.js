const express = require('express');

// const { getOrderProduct } = require('../controllers/orderProducts');
const { getOrders, addOrder } = require('../controllers/orders');

const router = express.Router();

router.route('/').get(getOrders).post(addOrder);

module.exports = router;
