const express = require('express');
const router = express.Router();

var checkoutController = require('../app/controllers/checkoutController');

router.get('/', checkoutController.renderCheckout);


module.exports = router;