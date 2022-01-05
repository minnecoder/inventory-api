import { Request, Response } from 'express';
import OrderProduct from '../models/OrderProduct';
import Order from '../models/Order';
import Product from '../models/Product';

// @desc get all orderProducts
// @route GET /orderproducts
// @access User
export let getOrderProducts = async (req: Request, res: Response) => {
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
export let getSingleOrderProduct = async (req: Request, res: Response) => {
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
export let addOrderProduct = async (req: Request, res: Response) => {
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
export let updateOrderProduct = async (req: Request, res: Response) => {
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
export let deleteOrderProduct = async (req: Request, res: Response) => {
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
