const OrderProduct = require('../models/OrderProduct');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc get all orderProducts
// @route GET /orderproducts
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
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc add orderProduct
// @route POST /orders part 2
// @access User
exports.addOrderProduct = async (req, res) => {
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

  // Check if items are included in the order

  const orderProduct = await OrderProduct.create();
};
