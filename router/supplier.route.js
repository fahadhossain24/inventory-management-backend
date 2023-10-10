const express = require('express');
const supplierController = require('../controller/supplier.controller');

const router = express.Router()


router.route('/')
    .post(supplierController.createSupplier)
    .get(supplierController.getSuppliers)

router.route('/:id')
    .get(supplierController.getSupplier)
    .patch(supplierController.updateSupplier)
    .delete(supplierController.deleteSupplier)


module.exports = router;