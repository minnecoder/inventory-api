const express = require('express');
const { getSuppliers } = require('../controllers/suppliers');

const router = express.Router();

router.route('/').get(getSuppliers);

module.exports = router;
