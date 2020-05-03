const express = require('express');

const { getOrderProduct } = require('../controllers/orderProducts');

const router = express.Router();

router.route('/').get(getOrderProduct);

module.exports = router;
