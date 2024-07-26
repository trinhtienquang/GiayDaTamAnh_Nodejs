const express = require('express');
const router = express.Router();
const authController = require('../app/controllers/userController');

router.get('/login', authController.renderLoginForm);
router.post('/login', authController.login);
router.get('/register', authController.renderRegisterForm);
router.post('/register', authController.register);
router.get('/forgot-password', authController.renderFormSendEmail)
router.post('/forgot-password', authController.sendResetPasswordEmail);
router.get('/reset-password', authController.renderFormResetPassword)
router.post('/reset-password', authController.resetPassword);
module.exports = router;