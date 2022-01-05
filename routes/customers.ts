import express from "express"

import {
  getCustomers,
  addCustomer,
  getSingleCustomer,
  updateCustomer,
  deleteCustomer,
} from '../controllers/customers';

const router = express.Router();

router.route('/').get(getCustomers).post(addCustomer);
router.route('/:id').get(getSingleCustomer).put(updateCustomer).delete(deleteCustomer);

module.exports = router;
