import { Request, Response } from 'express';
import Product from '../models/Product';

// @desc Get Product
// @route GET /products
// @access User
export let getProducts = async (req: Request, res: Response) => {
  try {
    const products = await Product.findAll({
      attributes: {
        exclude: [
          'Product_Cost',
          'On_Hand',
          'Reorder_Level',
          'Reorder_Qty',
          'createdAt',
          'updatedAt',
        ],
      },
    });
    return res.status(200).json({
      count: products.length,
      data: products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Get Single Product
// @route GET /products/:id
// @access User
export let getSingleProduct = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.params.id,
      },
      attributes: {
        exclude: [
          'Product_Cost',
          'On_Hand',
          'Reorder_Level',
          'Reorder_Qty',
          'createdAt',
          'updatedAt',
        ],
      },
    });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    return res.status(200).json({
      data: product,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Add Product
// @route POST /products
// @access Admin
export let addProduct = async (req: Request, res: Response) => {
  try {
    const customer = await Product.create(req.body);

    return res.status(200).json({
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Update Product
// @route UPDATE /products/:id
// @access Admin
export let updateProduct = async (req: Request, res: Response) => {
  try {
    await Product.update(req.body, {
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

// @desc Delete Product
// @route DELETE /products/:id
// @access Admin
export let deleteProduct = async (req: Request, res: Response) => {
  try {
    await Product.destroy({
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