const express = require('express');
const router = express.Router();
const { verifyToken } = require('../middleware/verifyToken');
const CartController = require('../app/controllers/cartController');

// Lấy giỏ hàng
router.get('/cart',verifyToken, CartController.getCart);

// Thêm sản phẩm vào giỏ hàng
router.post('/cart', verifyToken, CartController.addProductToCart);

// Xóa sản phẩm khỏi giỏ hàng
router.delete('/cart/:productId', verifyToken, CartController.removeProductFromCart);

module.exports = router;