'use strict';
module.exports = function(app) {
  var product = require('../app/controllers/productController');

  // todoList Routes
    app.route('/products')
      .get(product.list_all_products)
      // .post(product.create_a_product);
    app.route('/products/:productId')
      .get(product.read_a_products)
      // .put(product.update_a_product)
    //   .delete(product.delete_a_product);
    app.route('/Delete_products/:productId')
        .get(product.delete_a_product);

};