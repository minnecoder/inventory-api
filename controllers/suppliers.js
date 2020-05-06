const Supplier = require('../models/Supplier');

// @desc Get Supplier
// @route GET /suppliers
// @access User
exports.getSuppliers = async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    return res.status(200).json({
      success: true,
      count: suppliers.length,
      data: suppliers,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};

// @desc Add Supplier
// @route POST /suppliers
// @access User
exports.addSupplier = async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);

    return res.status(200).json({
      success: true,
      data: supplier,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Server Error' });
  }
};
