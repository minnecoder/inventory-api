const express = require('express');

const {
    getOrderPickers,
    getSingleOrderPicker,
    updateOrderPicker,
} = require('../controllers/orderPickers');

const router = express.Router();

router.route('/').get(getOrderPickers);
router.route('/:id').get(getSingleOrderPicker).put(updateOrderPicker);

module.exports = router