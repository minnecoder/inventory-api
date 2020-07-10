const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Customer = require('../models/Customer');

// @desc Get Orders
// @route GET /orders
// @access User
exports.getOrders = async (req, res) => {
  try {
    const orders = await Order.findAll();
    return res.status(200).json({
      success: true,
      count: orders.length,
      data: orders,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Add Order
// @route POST /orders
// @access User
exports.addOrder = async (req, res) => {
  try {
    // Check if CustomerId exists
    const customer = await Customer.findOne({
      where: {
        id: req.body.order.CustomerId,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer ID was not found',
      });
    }
    // Add order to DB
    const order = await Order.create(req.body.order);

    // Add order items to database
    req.body.items.forEach((item) => OrderProduct.create(item));

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Get Single Order
// @route GET /orders/:id
// @access User
exports.getSingleOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { OrderId: req.params.id },
    });
    const orderProducts = await OrderProduct.findAll({
      where: {
        OrderId: order.OrderId,
      },
    });
    // console.log(orderProducts);
    // console.log(orderProducts);
    return res.status(200).json({
      success: true,
      data: order,
      orderProducts,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
