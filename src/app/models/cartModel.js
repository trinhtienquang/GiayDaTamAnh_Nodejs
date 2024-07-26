const mysqlConnection = require('../../config/db');

const CartModel = {
  getCartByUserId: async (userId) => {
    const query = 'SELECT * FROM tbl_cart WHERE user_id = ?';
    return await mysqlConnection.query(query, [userId]);
  },
  
  addProductToCart: async (userId, productId, name, image, price, quantity, size, url) => {
    const query = `INSERT INTO tbl_cart (user_id, sanpham_id, sanpham_ten, sanpham_anh, sanpham_gia, quantity, sanpham_size, sanpham_url) 
                   VALUES (?, ?, ?, ?, ?, ?, ?, ?) 
                   ON DUPLICATE KEY UPDATE quantity = quantity + VALUES(quantity)`;
    return await mysqlConnection.query(query, [userId, productId, name, image, price, quantity, size, url]);
  },
  
  removeProductFromCart: async (userId, productId, size) => {
    const query = 'DELETE FROM tbl_cart WHERE user_id = ? AND sanpham_id = ? AND sanpham_size = ?';
    return await mysqlConnection.query(query, [userId, productId, size]);
  }
};

module.exports = CartModel;
