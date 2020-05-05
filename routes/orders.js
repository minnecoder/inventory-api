const express = require('express');

const { getOrderProduct } = require('../controllers/orderProducts');
const { addOrder } = require('../controllers/orders');

const router = express.Router();

router.route('/').post(addOrder);

module.exports = router;
