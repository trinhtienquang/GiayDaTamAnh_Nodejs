const CartModel  = require('../models/cartModel');

class CartController {
  static async getCart(req, res) {
    const userId = req.user.user_id;
    console.log(userId)
    try {
      const cart = await CartModel.getCartByUserId(userId);
      res.json({ success: true, cart });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }

  static async addProductToCart(req, res) {
    const userId = req.user.id;
    const { id, name, image, price, quantity, size } = req.body;
    try {
      await CartModel.addProductToCart(userId, id, name, image, price, quantity, size);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }

  static async removeProductFromCart(req, res) {
    const userId = req.user.id;
    const { productId } = req.params;
    const { size } = req.body;
    try {
      await CartModel.removeProductFromCart(userId, productId, size);
      res.json({ success: true });
    } catch (error) {
      res.json({ success: false, message: error.message });
    }
  }
}

module.exports = CartController;