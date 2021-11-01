const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Customer = require('../models/Customer');
const Product = require('../models/Product');

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

    // Puts all ProductIds in array
    const orderItems = [];
    const orderProducts = req.body.products;

    orderProducts.forEach((product) => {
      orderItems.push(product.id);
    });

    // Gets all of the products for the order
    const productItems = [];
    const products = await Product.findAll({
      where: {
        id: orderItems,
      },
    });

    products.forEach((item) => {
      console.log(item);
      productItems.push(item);
    });

    // Check if prices from website are the same as the DB
    for (let i = 0; i < orderProducts.length; i += 1) {
      if (orderProducts[i].Product_Price !== productItems[i].Product_Price) {
        return res.status(501).json({
          error: 'Prices are wrong',
        });
      }
    }

    // Check if items are available, if not sends back id and error message
    products.forEach((item) => {
      if (item.On_Hand === 0) {
        return res.status(502).json({
          id: item.id,
          error: 'Item is out of stock',
        });
      }
      return true;
    });

    // Add order to DB and get current order ID
    let newOrderId = '';
    const order = await Order.create(req.body.order).then((result) => {
      newOrderId = result.id;
    });

    // Add order items to database
    req.body.products.forEach((product) =>
      OrderProduct.create({
        OrderId: newOrderId,
        ProductId: product.id,
        Quantity_Ordered: product.Quantity_Ordered,
      })
    );

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
      attributes: ['id', 'OrderId', 'CustomerId', 'Order_Status', 'Order_Total'],
    });
    const orderProducts = await OrderProduct.findAll({
      where: {
        OrderId: order.OrderId,
      },
    });
    const customer = await Customer.findOne({
      where: {
        id: order.CustomerId,
      },
      attributes: [
        'Customer_Name',
        'Customer_Address',
        'Customer_City',
        'Customer_State',
        'Customer_Zip',
        'Customer_Phone',
        'Customer_Email',
      ],
    });

    return res.status(200).json({
      success: true,
      data: { order, orderProducts, customer },
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: { id: req.params.id },
    });
    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }
    await Order.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Delete Order
// @route DELETE /orders/:id
// @access User
exports.deleteOrder = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order  not found',
      });
    }
    await Order.destroy({
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

// @desc Update order statuses
// @route Update /orders/status/:id
// @access User
exports.changeOrderStatus = async (req, res) => {
  try {
    const order = await Order.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!order) {
      return res.status(404).json({
        success: false,
        error: 'Order not found',
      });
    }

    await Order.update(req.Order_Status, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: order,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      error: 'Server Error',
    });
  }
};
