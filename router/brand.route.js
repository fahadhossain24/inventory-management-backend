const express = require('express');
const brandController = require('../controller/brand.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router()

router.route('/')
    .post(verifyToken, brandController.createBrand)
    .get(brandController.getBrands)

router.route('/:id')
    .get(brandController.getBrandById)
    .patch(verifyToken, brandController.updateBrandById)


module.exports = router