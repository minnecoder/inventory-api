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
  const data = {
    order: {
      OrderId: 1,
      CustomerId: 1,
      Order_Status: 'Ordered',
      Order_Total: 134.78,
    },
    items: [
      { OrderId: 1, ProductId: 2, Quantity_Ordered: 4 },
      { OrderId: 1, ProductId: 3, Quantity_Ordered: 2 },
      { OrderId: 1, ProductId: 4, Quantity_Ordered: 1 },
    ],
  };

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
    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
