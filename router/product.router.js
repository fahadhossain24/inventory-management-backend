const express = require('express');
const productController = require('../controller/product.controller.js');
const uploader = require('../middleware/file-uploader.js');
const { verifyToken } = require('../middleware/verifyToken.js');
const { authorization } = require('../middleware/authorization.js');


const router = express.Router();

router.post('/upload-image',verifyToken, uploader.array('images'), productController.imageUpload)
router.patch('/bulk-update',verifyToken, productController.productsBulkUpdate)

router.post('/', verifyToken, authorization('admin', 'manager'), productController.saveProduct);
router.get('/', productController.getProduct)
router.route('/:id')
.patch(verifyToken, productController.updateProductById)
.delete(verifyToken, productController.deleteProduct)


module.exports = router