import express from 'express';
import {
  getProducts,
  addProduct,
  getSingleProduct,
  updateProduct,
  deleteProduct,
} from '../controllers/products';

const router = express.Router();

router.route('/').get(getProducts).post(addProduct);

router.route('/:id').get(getSingleProduct).put(updateProduct).delete(deleteProduct);

module.exports = router;
