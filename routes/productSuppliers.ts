import express from 'express';
import {
  getProductSuppliers,
  addProductSupplier,
  getSingleProductSupplier,
  updateProductSupplier,
  deleteProductSupplier,
} from '../controllers/productSuppliers';

const router = express.Router();

router.route('/').get(getProductSuppliers).post(addProductSupplier);
router
  .route('/:id')
  .get(getSingleProductSupplier)
  .put(updateProductSupplier)
  .delete(deleteProductSupplier);

module.exports = router;
