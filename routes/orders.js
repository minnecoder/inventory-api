const express = require('express');

const {
  getOrders,
  addOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
} = require('../controllers/orders');

const router = express.Router();

router.route('/').get(getOrders).post(addOrder);
router.route('/:id').get(getSingleOrder).put(updateOrder).delete(deleteOrder);

module.exports = router;
