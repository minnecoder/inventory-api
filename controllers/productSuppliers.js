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
      count: productSuppliers.length,
      data: productSuppliers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Get Single Product Supplier
// @route GET /productSupplier/:id
// @access User
exports.getSingleProductSupplier = async (req, res) => {
  try {
    const productSupplier = await ProductSupplier.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product, Supplier],
    });
    if (!productSupplier) {
      return res.status(404).send("Product supplier not found")
    }
    return res.status(200).json({
      data: productSupplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Add Product Supplier
// @route POST /productSupplier
// @access Admin
exports.addProductSupplier = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.body.ProductId,
      },
    });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    const supplier = await Supplier.findOne({
      where: {
        id: req.body.SupplierId,
      },
    });

    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }

    const productSupplier = await ProductSupplier.create(req.body);
    return res.status(200).json({
      data: productSupplier,
    });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

// @desc Update Product Supplier
// @route PUT /productSupplier/:id
// @access Admin
exports.updateProductSupplier = async (req, res) => {
  try {
    await ProductSupplier.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

// @desc Delete Product Supplier
// @route DELETE /productSupplier/:id
// @access Admin
exports.deleteProductSupplier = async (req, res) => {
  try {
    await ProductSupplier.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};
