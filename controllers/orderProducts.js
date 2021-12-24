const OrderProduct = require('../models/OrderProduct');
const Order = require('../models/Order');
const Product = require('../models/Product');

// @desc get all orderProducts
// @route GET /orderproducts
// @access User
exports.getOrderProducts = async (req, res) => {
  try {
    const orderProducts = await OrderProduct.findAll({
      include: [Order, Product],
    });
    return res.status(200).json({
      count: orderProducts.length,
      data: orderProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
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
      include: [Order, Product],
    });
    if (!orderProduct) {
      return res.status(404).send("Order product not found")
    }

    return res.status(200).json({
      data: orderProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc add orderProduct
// @route POST /orders
// @access Admin
exports.addOrderProduct = async (req, res) => {
  try {
    // Check if OrderId exists
    const order = await Order.findOne({
      where: {
        id: req.body.items.OrderId,
      },
    });

    if (!order) {
      return res.status(404).send('Order Id not found');
    }

    // Check if ProductId exists
    const product = await Product.findOne({
      where: {
        id: req.body.items.ProductId,
      },
    });

    if (!product) {
      return res.status(404).send('Product Id not found');
    }

    const orderProduct = await OrderProduct.create(req.body);

    return res.status(200).json({
      data: orderProduct,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Update OrderProduct
// @route UPDATE /orderProducts/:id
// @access Admin
exports.updateOrderProduct = async (req, res) => {
  try {
    await OrderProduct.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200)
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Delete OrderProduct
// @route DELETE /orderProducts/:id
// @access Admin
exports.deleteOrderProduct = async (req, res) => {
  try {
    await OrderProduct.destroy({
      where: {
        id: req.params.id,
      },
    });
    return res.sendStatus(200)
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
