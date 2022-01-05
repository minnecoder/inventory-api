import { Request, Response } from "express";
import Supplier from "../models/Supplier";

// @desc Get Supplier
// @route GET /suppliers
// @access User
export let getSuppliers = async (req: Request, res: Response) => {
  try {
    const suppliers = await Supplier.findAll();
    return res.status(200).json({
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Add Supplier
// @route POST /suppliers
// @access Admin
export let addSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.create(req.body);

    return res.status(200).json({
      data: supplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Get Single Supplier
// @route GET /suppliers/:id
// @access User
export let getSingleSupplier = async (req: Request, res: Response) => {
  try {
    const supplier = await Supplier.findOne({
      where: {
        id: req.params.id,
      },
    });
    if (!supplier) {
      return res.status(404).send('Supplier not found');
    }
    return res.status(200).json({
      data: supplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Update Supplier
// @route UPDATE /suppliers/:id
// @access Admin
export let updateSupplier = async (req: Request, res: Response) => {
  try {
    await Supplier.update(req.body, {
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

// @desc Delete Supplier
// @route DELETE /Suppliers/:id
// @access Admin
export let deleteSupplier = async (req: Request, res: Response) => {
  try {
    await Supplier.destroy({
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
