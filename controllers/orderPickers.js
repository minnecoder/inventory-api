const Order = require('../models/Order');
const OrderProduct = require('../models/OrderProduct');
const Product = require('../models/Product');

// @desc Get all orders with order status of paid
// @route GET /orderpickers
// @access User
exports.getOrderPickers = async (req, res) => {
    try {
        const orders = await Order.findAll({
            where: {
                Order_Status: 'Paid',
            },
        });
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

// @desc Get single order with order status of paid
// @route GET /orderpickers/:id
// @access User
exports.getSingleOrderPicker = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                Order_Status: 'Paid',
                id: req.params.id,
            },
        });

        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found',
            });
        }
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

// @desc Update order after all of the order products are picked
// @route PUT /orderPickers/:id
// @access User
exports.updateOrderPicker = async (req, res) => {
    try {
        const order = await Order.findOne({
            where: {
                Order_Status: 'Paid',
                id: req.params.id,
            },
        });
        if (!order) {
            return res.status(404).json({
                success: false,
                error: 'Order not found',
            });
        }


        // Check if all orderProducts Product_Status is Picked
        const orderproducts = await OrderProduct.findAll({
            where: {
                OrderId: req.params.id
            }
        })
        orderproducts.forEach(orderproduct => {
            if (orderproduct.Product_Status !== "Picked") {
                return res.status(401).json({
                    error: "All items are not picked"
                })

            }
            return orderproducts
        })


        // Decrease quantity by product quality
        orderproducts.forEach(orderproduct => {
            const product = Product.findOne({
                where: {
                    id: orderproduct.ProductId
                }

            })
            product.On_Hand -= orderproduct.Quantity_Ordered

            // Check if product quantity is at or below reorder level

            if (product.On_Hand <= product.Reorder_level) {
                console.log("Item needs to be re-ordered")
            }
        })

        return res.status(200).json({
            success: true,
            data: order,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ error: 'Server Error' });
    }
};
