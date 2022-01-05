import express from 'express';
import {
  getSuppliers,
  addSupplier,
  getSingleSupplier,
  updateSupplier,
  deleteSupplier,
} from '../controllers/suppliers';

const router = express.Router();

router.route('/').get(getSuppliers).post(addSupplier);
router.route('/:id').get(getSingleSupplier).put(updateSupplier).delete(deleteSupplier);

module.exports = router;
