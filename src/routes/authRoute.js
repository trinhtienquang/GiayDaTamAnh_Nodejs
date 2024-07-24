const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/userController');

router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/register', authController.renderRegisterForm);
router.post('/register', authController.register);

module.exports = router;