const express = require('express');
const authController = require('../controller/auth.controller');
const { verifyToken } = require('../middleware/verifyToken');

const router = express.Router();

router.route('/signup')
    .post(authController.signUp)

router.route('/login')
    .post(authController.login)

router.route('/user')
    .get(verifyToken , authController.getUser)

router.get('/users', authController.allusers)


module.exports = router;