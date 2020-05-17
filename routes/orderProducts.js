const express = require('express');

const { addOrderProduct } = require('../controllers/orderProducts');

const router = express.Router();

router.route('/').post(addOrderProduct);

module.exports = router;
