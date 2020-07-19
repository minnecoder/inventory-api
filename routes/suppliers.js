const express = require('express');
const {
  getSuppliers,
  addSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} = require('../controllers/suppliers');

const router = express.Router();

router.route('/').get(getSuppliers).post(addSupplier);
router.route('/:id').get(getSingleSupplier).put(updateSupplier).delete(deleteSupplier);

module.exports = router;
