const express = require('express');
const productController = require('../controller/product.controller.js');
const uploader = require('../middleware/file-uploader.js');


const router = express.Router();

router.post('/upload-image', uploader.array('images'), productController.imageUpload)
router.patch('/bulk-update', productController.productsBulkUpdate)

router.post('/', productController.saveProduct);
router.get('/', productController.getProduct)
router.route('/:id')
.patch(productController.updateProductById)
.delete(productController.deleteProduct)


module.exports = router