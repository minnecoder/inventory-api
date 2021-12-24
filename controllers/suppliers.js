const Supplier = require('../models/Supplier');

// @desc Get Supplier
// @route GET /suppliers
// @access User
exports.getSuppliers = async (req, res) => {
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
exports.addSupplier = async (req, res) => {
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
exports.getSingleSupplier = async (req, res) => {
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
exports.updateSupplier = async (req, res) => {
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
exports.deleteSupplier = async (req, res) => {
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
