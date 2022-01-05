import { Response, Request } from "express";
import ProductSupplier from "../models/ProductSupplier"
import Product from "../models/Product";
import Supplier from "../models/Supplier";

// @desc Get Product Supplier
// @route GET /productSupplier
// @access User
export let getProductSuppliers = async (req: Request, res: Response) => {
  try {
    const productSuppliers = await ProductSupplier.findAll({
      include: [Product, Supplier],
    });
    return res.status(200).json({
      count: productSuppliers.length,
      data: productSuppliers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Get Single Product Supplier
// @route GET /productSupplier/:id
// @access User
export let getSingleProductSupplier = async (req: Request, res: Response) => {
  try {
    const productSupplier = await ProductSupplier.findOne({
      where: {
        id: req.params.id,
      },
      include: [Product, Supplier],
    });
    if (!productSupplier) {
      return res.status(404).send("Product supplier not found")
    }
    return res.status(200).json({
      data: productSupplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Add Product Supplier
// @route POST /productSupplier
// @access Admin
export let addProductSupplier = async (req: Request, res: Response) => {
  try {
    const product = await Product.findOne({
      where: {
        id: req.body.ProductId,
      },
    });

    if (!product) {
      return res.status(404).send('Product not found');
    }

    const supplier = await Supplier.findOne({
      where: {
        id: req.body.SupplierId,
      },
    });

    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }

    const productSupplier = await ProductSupplier.create(req.body);
    return res.status(200).json({
      data: productSupplier,
    });
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

// @desc Update Product Supplier
// @route PUT /productSupplier/:id
// @access Admin
export let updateProductSupplier = async (req: Request, res: Response) => {
  try {
    await ProductSupplier.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};

// @desc Delete Product Supplier
// @route DELETE /productSupplier/:id
// @access Admin
export let deleteProductSupplier = async (req: Request, res: Response) => {
  try {
    await ProductSupplier.destroy({
      where: {
        id: req.params.id,
      },
    });

    return res.sendStatus(200)
  } catch (error) {
    return res.status(500).send('Server Error');
  }
};
