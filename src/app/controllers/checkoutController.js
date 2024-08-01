const CartModel  = require('../models/cartModel');

exports.renderCheckout = async  (req, res) => {
  res.render('checkout',{ 
    messages: req.flash() , 
    title:"thanh toán",
  });
};