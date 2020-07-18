const express = require('express');

const {
  getCustomers,
  addCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} = require('../controllers/customers');

const router = express.Router();

router.route('/').get(getCustomers).post(addCustomer);
router.route('/:id').get(getSingleCustomer).update(updateCustomer);

module.exports = router;
