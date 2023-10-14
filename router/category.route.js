const express = require('express');
const categoryController = require('../controller/category.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.route('/')
    .post(verifyToken, categoryController.createCategory)
    .get(categoryController.getCategories)

router.route('/:id')
    .get(categoryController.getCategoryById)
    .patch(verifyToken, categoryController.updateCategoryById)


module.exports = router