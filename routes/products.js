const express = require('express');
const {
  getProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} = require('../controllers/products');

const router = express.Router();

router.route('/').get(getProducts).post(addProduct);

router.route('/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
