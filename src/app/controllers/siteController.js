const productModel = require('../models/productModel')
const menuModel = require('../models/menuModel')
const util = require('util');

exports.index = function(req, res) {
  res.render('home')
};

exports.introduce = function(req, res){
  res.render('introduce')
}

const getDanhMucByName = util.promisify(menuModel.getDanhMucByName);
const getProductsByDanhMuc = util.promisify(productModel.getProductsByDanhMuc);
const countProductsByDanhMuc = util.promisify(productModel.countProductsByDanhMuc);

exports.renderDanhMuc = async function(req, res) {
  try {
    const danhmucSlug = req.params.danhmucTen;
    const danhmucTen = danhmucSlug ? danhmucSlug.replace(/-/g, ' ') : '';
    
    const danhmuc = await getDanhMucByName(danhmucTen);
    if (!danhmuc || danhmuc.length === 0) {
      return res.status(404).send('Danh mục không tồn tại');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const orderby = req.query.orderby || 'menu_order';
    const totalProducts = await countProductsByDanhMuc(danhmuc[0].danhmuc_id);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await getProductsByDanhMuc(danhmuc[0].danhmuc_id, limit, offset, orderby);
    const productsOnPage = products.length;
    
    const breadcrumb = [
      { name: 'Trang chủ', url: '/' },
      { name: danhmuc[0].danhmuc_ten, url: `/${danhmucSlug}` }
    ];

    // console.log('Breadcrumb:', breadcrumb); // Debugging statement

    res.render('listProduct', {
      products: products,
      currentPage: page,
      totalPages: totalPages,
      productsOnPage: productsOnPage,
      totalProducts: totalProducts,
      orderby: orderby,
      breadcrumb: breadcrumb,
      title: danhmuc[0].danhmuc_ten,
      banner_img: danhmuc[0].danhmuc_anh
    });
  } catch (err) {
    console.error('Error in renderDanhMuc:', err);
    res.status(500).send('Internal Server Error');
  }
};

const getLoaiSanPhamByName = util.promisify(menuModel.getLoaiSanPhamByName);
const getProductsByLoaiSanPham = util.promisify(productModel.getProductsByLoaiSanPham);
const countProductsByLoaiSanPham = util.promisify(productModel.countProductsByLoaiSanPham);

exports.renderLoaiDanhMuc = async (req, res) => {
  try {
    const danhmucSlug = req.params.danhmucTen;
    const loaisanphamSlug = req.params.loaisanphamTen;
    const danhmucTen = danhmucSlug ? danhmucSlug.replace(/-/g, ' ') : '';
    const loaisanphamTen = loaisanphamSlug ? loaisanphamSlug.replace(/-/g, ' ') : '';
     // Truy vấn danh mục
     const danhmuc = await getDanhMucByName(danhmucTen);
     if (!danhmuc || danhmuc.length === 0) {
       return res.status(404).send('Danh mục không tồn tại');
     }
 
    const loaisanpham = await getLoaiSanPhamByName(loaisanphamTen);
    if (!loaisanpham || loaisanpham.length === 0) {
      return res.status(404).send('Loại sản phẩm không tồn tại');
    }

    const page = parseInt(req.query.page) || 1;
    const limit = 5;
    const offset = (page - 1) * limit;

    const orderby = req.query.orderby || 'menu_order';
    const totalProducts = await countProductsByLoaiSanPham(loaisanpham[0].loaisanpham_id);
    const totalPages = Math.ceil(totalProducts / limit);

    const products = await getProductsByLoaiSanPham(loaisanpham[0].loaisanpham_id, limit, offset, orderby);
    const productsOnPage = products.length;

    const breadcrumb = [
      { name: 'Trang chủ', url: '/' },
      { name: danhmuc[0].danhmuc_ten, url: `/${danhmucSlug}` },
      { name: loaisanpham[0].loaisanpham_ten, url: `/${danhmucSlug}/${loaisanphamSlug}`}
    ];
   
    // console.log('Breadcrumb:', breadcrumb); // Debugging statement

    res.render('listProduct', {
      products: products,
      currentPage: page,
      totalPages: totalPages,
      productsOnPage: productsOnPage,
      totalProducts: totalProducts,
      orderby: orderby,
      breadcrumb: breadcrumb,
      title: loaisanpham[0].loaisanpham_ten,
      banner_img: loaisanpham[0].loaisanpham_anh
    });
  } catch (err) {
    console.error('Error in renderLoaiDanhMuc:', err);
    res.status(500).send('Internal Server Error');
  }
};