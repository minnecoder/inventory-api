const Customer = require('../models/Customer');

// @desc Get Customers
// @route GET /customers
// @access User
exports.getCustomers = async (req, res) => {
  try {
    const customers = await Customer.findAll();
    return res.status(200).json({
      success: true,
      count: customers.length,
      data: customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Get Single Customers
// @route GET /customers/:id
// @access User
exports.getSingleCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found',
      });
    }
    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Add Customer
// @route POST /customers
// @access User
exports.addCustomer = async (req, res) => {
  try {
    const customer = await Customer.create(req.body);

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

exports.updateCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: { id: req.params.id },
    });
    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found',
      });
    }
    await Customer.update(req.body, {
      where: {
        id: req.params.id,
      },
    });

    return res.status(200).json({
      success: true,
      data: customer,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Delete Customer
// @route DELETE /customers/:id
// @access User
exports.deleteCustomer = async (req, res) => {
  try {
    const customer = await Customer.findOne({
      where: {
        id: req.params.id,
      },
    });

    if (!customer) {
      return res.status(404).json({
        success: false,
        error: 'Customer not found',
      });
    }
    await Customer.destroy({
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

exports.findCustomersByName = async (req, res) => {
  try {
    const customers = await Customer.findAll({
      where: {
        Customer_Name: req.params.custName,
      },
    });

    return res.status(200).json({
      success: true,
      data: customers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
