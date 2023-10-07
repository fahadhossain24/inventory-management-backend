const express = require('express');
const productController = require('../controller/product.controller.js')

const router = express.Router();

router.patch('/bulk-update', productController.productsBulkUpdate)

router.post('/', productController.saveProduct);
router.get('/', productController.getProduct)
router.route('/:id')
.patch(productController.updateProductById)
.delete(productController.deleteProduct)


module.exports = router