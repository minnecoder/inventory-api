import { Request, Response } from "express";
import Customer from "../models/Customer";

// @desc Get Customers
// @route GET /customers
// @access User
export let getCustomers = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json({
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Get Single Customers
// @route GET /customers/:id
// @access User
export let getSingleCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return res.status(404).send('Customer not found');
    }
    return res.status(200).json({
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

// @desc Add Customer
// @route POST /customers
// @access Admin
export let addCustomer = async (req: Request, res: Response) => {
  try {
    const customer = await Customer.create(req.body);

    return res.status(200).json({
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};

export let updateCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.update(req.body, {
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

// @desc Delete Customer
// @route DELETE /customers/:id
// @access Admin
export let deleteCustomer = async (req: Request, res: Response) => {
  try {
    await Customer.destroy({
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

export let findCustomersByName = async (req: Request, res: Response) => {
  try {
    const customers = await Customer.findAll({
      where: {
        Customer_Name: req.params.custName,
      },
    });

    return res.status(200).json({
      data: customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).send('Server Error');
  }
};
