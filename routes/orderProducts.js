const express = require('express');

const { addOrderProduct, getOrderProducts } = require('../controllers/orderProducts');

const router = express.Router();

router.route('/').get(getOrderProducts).post(addOrderProduct);

module.exports = router;
