const express = require('express');
const router = express.Router();

var productDetailController = require('../app/controllers/productDetailController');

router.get('/:slug', productDetailController.renderProductDetail);

module.exports = router;