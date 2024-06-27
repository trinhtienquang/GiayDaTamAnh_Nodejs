'use strict';
const Product = require('../models/productModel');

exports.list_all_products = function(req, res) {
  Product.getAllProduct(req, function(err, product, _name,_page, totalPage) {

      if (err)
          res.send(err);
      res.render('test2',{
        title: "đang test",
        data: product,
        _name:_name,
        _page: parseInt(_page),
        totalPage: totalPage,
      });
  });
};

exports.read_a_products = function(req, res) {
  Product.getProductById(req.params.productId,function(err, product) {

      if (err)
          res.send(err);
      res.render('test2',{
        title: "đang test",
        data: product
      });
  });
};

exports.delete_a_product = function(req, res) {
  Product.remove(req.params.productId,function(err, product) {

      if (err)
          res.send(err);
      res.redirect('/products');
  });
};