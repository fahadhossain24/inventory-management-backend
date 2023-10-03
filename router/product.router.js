const express = require('express');
const productController = require('../controller/product.controller.js')

const router = express.Router();

router.post('/', productController.saveProduct);
router.get('/', productController.getProduct)

module.exports = router