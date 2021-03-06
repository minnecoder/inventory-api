const OrderProduct = require('../models/OrderProduct');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc get all orderProducts
// @route GET /orderproducts
// @access User
exports.getOrderProducts = async (req, res) => {
  try {
    const orderProducts = await OrderProduct.findAll();
    return res.status(200).json({
      success: true,
      count: orderProducts.length,
      data: orderProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

// @desc get all orderProducts
// @route GET /orderproducts/:id
// @access User
exports.getSingleOrderProduct = async (req, res) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: orderProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

// @desc add orderProduct
// @route POST /orders part 2
// @access User
exports.addOrderProduct = async (req, res) => {
  try {
    // Check if OrderId exists
    const order = await Order.findOne({
      where: {
        id: req.body.items.OrderId,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'OrderId was not found',
      });
    }

    // Check if ProductId exists
    const product = await Product.findOne({
      where: {
        id: req.body.items.ProductId,
      },
    });

    if (!product) {
      return res.status(404).json({
        success: false,
        error: 'ProductId was not found',
      });
    }

    const orderProduct = await OrderProduct.create(req.body);

    return res.status(200).json({
      success: true,
      data: orderProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};

// @desc Update OrderProduct
// @route UPDATE /orderProducts/:id
// @access User
exports.updateOrderProduct = async (req, res) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: { id: req.params.id },
    });
    if (!orderProduct) {
      return res.status(404).json({
        success: false,
        error: 'Order Product not found',
      });
    }
    await OrderProduct.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: orderProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Delete OrderProduct
// @route DELETE /orderProducts/:id
// @access User
exports.deleteOrderProduct = async (req, res) => {
  try {
    const orderProduct = await OrderProduct.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!orderProduct) {
      return res.status(404).json({
        success: false,
        error: 'Order Product not found',
      });
    }
    await OrderProduct.destroy({
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
