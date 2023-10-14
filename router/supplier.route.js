const express = require('express');
const supplierController = require('../controller/supplier.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router()


router.route('/')
    .post(verifyToken, supplierController.createSupplier)
    .get(supplierController.getSuppliers)

router.route('/:id')
    .get(supplierController.getSupplier)
    .patch(verifyToken, supplierController.updateSupplier)
    .delete(verifyToken, supplierController.deleteSupplier)


module.exports = router;