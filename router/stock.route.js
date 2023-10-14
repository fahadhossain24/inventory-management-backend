const express = require('express');
const  stockController = require('../controller/stock.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.route('/')
    .post(verifyToken, stockController.createStock)
    .get(stockController.getStocks)

router.route('/:id')
    .get(stockController.getStockById)
    .patch(verifyToken, stockController.updateStockById)
    .delete(verifyToken, stockController.deleteStockById)

module.exports = router;