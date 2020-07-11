const Product = require('../models/Product');

// @desc Get Product
// @route GET /products
// @access User
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll({
      attributes: { exclude: ['id', 'Reorder_Level', 'Reorder_Qty', 'createdAt', 'updatedAt'] },
    });
    return res.status(200).json({
      success: true,
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Get Single Product
// @route GET /products/:id
// @access User
exports.getSingleProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: { exclude: ['id', 'Reorder_Level', 'Reorder_Qty', 'createdAt', 'updatedAt'] },
    });

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Add Product
// @route POST /products
// @access User
exports.addProduct = async (req, res) => {
  try {
    const customer = await Product.create(req.body);

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Update Product
// @route UPDATE /products/:id
// @access User
exports.updateProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: { id: req.params.id },
    });
    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    await Product.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Delete Product
// @route DELETE /products/:id
// @access User
exports.deleteProduct = async (req, res) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'Product not found',
      });
    }
    await Product.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
