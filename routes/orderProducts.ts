import express from "express"

import {
  addOrderProduct,
  getOrderProducts,
  getSingleOrderProduct,
  updateOrderProduct,
  deleteOrderProduct,
} from '../controllers/orderProducts';

const router = express.Router();

router.route('/').get(getOrderProducts).post(addOrderProduct);
router.route('/:id').get(getSingleOrderProduct).put(updateOrderProduct).delete(deleteOrderProduct);

module.exports = router;
