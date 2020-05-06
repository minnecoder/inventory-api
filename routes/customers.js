const express = require('express');

const { getCustomers, addCustomer } = require('../controllers/customers');

const router = express.Router();

router.route('/').get(getCustomers).post(addCustomer);

module.exports = router;
