const express = require('express');
const  stockController = require('../controller/stock.controller');

const router = express.Router();

router.route('/')
    .post(stockController.createStock)
    .get(stockController.getStocks)

router.route('/:id')
    .get(stockController.getStockById)
    .patch(stockController.updateStockById)
    .delete(stockController.deleteStockById)

module.exports = router;