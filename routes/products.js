const express = require('express');
const { getProducts, addProduct } = require('../controllers/products');

const router = express.Router();

router.route('/').get(getProducts);

router.route('/').post(addProduct);

module.exports = router;
