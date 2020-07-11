const ProductSupplier = require('../models/ProductSupplier');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// @desc Get Product Supplier
// @route GET /productSupplier
// @access User
exports.getProductSuppliers = async (req, res) => {
  try {
    const productSuppliers = await ProductSupplier.findAll();
    return res.status(200).json({
      success: true,
      count: productSuppliers.length,
      data: productSuppliers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

exports.getSingleProductSupplier = async (req, res) => {
  try {
    const productSupplier = await ProductSupplier.findOne({
      where: {
        id: req.params.id,
      },
    });
    // Need to finish this
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};
