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
