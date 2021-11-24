const ProductSupplier = require('../models/ProductSupplier');
const Product = require('../models/Product');
const Supplier = require('../models/Supplier');

// @desc Get Product Supplier
// @route GET /productSupplier
// @access User
exports.getProductSuppliers = async (req, res) => {
  try {
    const productSuppliers = await ProductSupplier.findAll({
      include: [Product, Supplier],
    });
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
      include: [Product, Supplier],
    });
    if (!productSupplier) {
      return res.status(404).json({
        success: false,
        error: "Product supplier not found"
      })
    }
    return res.status(200).json({
      success: true,
      data: productSupplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

exports.addProductSupplier = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.body.ProductId,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }

    const supplier = await Supplier.findOne({
      where: {
        id: req.body.SupplierId,
      },
    });

    if (!supplier) {
      return res.status(405).json({
        success: false,
        error: 'Supplier not found',
      });
    }

    const productSupplier = await ProductSupplier.create(req.body);
    return res.status(200).json({
      success: true,
      data: productSupplier,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

exports.updateProductSupplier = async (req, res) => {
  try {
    const productSupplier = await ProductSupplier.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!productSupplier) {
      return res.status(404).json({
        success: false,
        error: 'Product Supplier not found',
      });
    }
    await ProductSupplier.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: productSupplier,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

exports.deleteProductSupplier = async (req, res) => {
  try {
    const productSupplier = await ProductSupplier.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!productSupplier) {
      return res.status(404).json({
        success: false,
        error: 'Product Supplier not found',
      });
    }
    await ProductSupplier.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: productSupplier,
    });
  } catch (error) {
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};
