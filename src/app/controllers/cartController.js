const CartModel  = require('../models/cartModel');

class CartController {
  static async getCart(req, res) {
    const userId = req.user.userId;
    try {
      const cart = await CartModel.getCartByUserId(userId);
      res.json({ success: true, cart });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }

  static async addProductToCart(req, res) {
    const userId = req.user.userId;
    const { sanpham_id, sanpham_ten, sanpham_anh, sanpham_gia, quantity, sanpham_size, sanpham_url } = req.body;
    try {
      await CartModel.addProductToCart(userId, sanpham_id, sanpham_ten, sanpham_anh, sanpham_gia, quantity, sanpham_size, sanpham_url);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }

  static async removeProductFromCart(req, res) {
    const userId = req.user.userId;
    const { productId } = req.params;
    const { sanpham_size } = req.body;

    try {
      await CartModel.removeProductFromCart(userId, productId, sanpham_size);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }

  static async updateQuantity(req, res){
    const userId = req.user.userId;
    const { sanpham_id, quantity } = req.body;
    try{
      await CartModel.updateQuatity(userId, sanpham_id, quantity);
      res.json({ success: true });
    } catch (error){
      res.json({ success: false, message: error.message });
    }
  }
}

module.exports = CartController;