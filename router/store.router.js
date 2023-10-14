const express = require('express');
const storeController = require('../controller/store.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.route('/')
    .post(verifyToken, storeController.createStore)
    .get(storeController.getStores)

router.route('/:id')
    .get(storeController.getStoreById)
    .patch(verifyToken, storeController.updateStoreById)

module.exports = router;