const express = require('express');

const {
  getOrders,
  addOrder,
  getSingleOrder,
  updateOrder,
  deleteOrder,
  changeOrderStatus,
} = require('../controllers/orders');

const router = express.Router();

router.route('/').get(getOrders).post(addOrder);
router.route('/:id').get(getSingleOrder).put(updateOrder).delete(deleteOrder);
router.route('/status/:id').put(changeOrderStatus);

module.exports = router;
