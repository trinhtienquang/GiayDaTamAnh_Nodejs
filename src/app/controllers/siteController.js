const sliderModel = require('../models/sliderModel')
const storeModel = require('../models/storeModel')
const productModel = require('../models/productModel')
const  formatPhoneNumber  = require('../../utils/phoneFormat');
const slugify = require('../../utils/slugify');
const util = require('util');

exports.index = function(req, res) {
  sliderModel.getSlider(function(err, sliders){
    productModel.getHotProducts(function(err, hotProducts){
      // console.log(hotProducts)
      res.render('home',{
        sliders:sliders,
        hotProducts: hotProducts,
        slugify
      })
    })
  })
};

exports.contact = function(req, res){
  storeModel.getStore(function(err, stores){
     // Định dạng số điện thoại cho từng cửa hàng
     stores.forEach(store => {
      const formattedPhone = formatPhoneNumber(store.cuahang_phone);
      store.cuahang_phone_part1 = formattedPhone.part1;
      store.cuahang_phone_part2 = formattedPhone.part2;
    });
    res.render('contact',{
      stores:stores,
      // formatPhoneNumber
    })
  })
}

exports.introduce = function(req, res){
  res.render('introduce')
}

exports.blog = function(req, res){
  res.render('blog&news')
}

exports.news = function(req, res){
  res.render('blog&news')
}

const countProductsById = util.promisify(productModel.countProductsById);
const getAllProduct = util.promisify(productModel.getAllProduct);
exports.getAllProduct = async function(req, res){
  try {
  const page = parseInt(req.query.page) || 1;
    const limit = 10;
    const offset = (page - 1) * limit;

    const orderby = req.query.orderby || 'menu_order';
    const totalProducts = await countProductsById();
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await getAllProduct(limit, offset, orderby);
    const productsOnPage = products.length;
    const breadcrumb = [
      { name: 'Trang chủ', url: '/' },
      { name: 'Sản phẩm', url: `/san-pham` }
    ];
    res.render('listProduct', {
      products: products,
      currentPage: page,
      limit: limit,
      totalPages: totalPages,
      productsOnPage: productsOnPage,
      totalProducts: totalProducts,
      orderby: orderby,
      breadcrumb: breadcrumb,
      title: 'Sản phẩm',
      banner_img: '',
      slugify
  }); 
  } catch (err) {
    console.error('Error in getAllProduct:', err);
    res.status(500).send('Internal Server Error');
  }
};
