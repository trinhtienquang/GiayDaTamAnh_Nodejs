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

exports.renderDanhMuc = async  function(req, res){
  try {
    const danhmucSlug = req.params.danhmucTen;
    const danhmucTen = danhmucSlug ? danhmucSlug.replace(/-/g, ' ') : '';
    
    const danhmuc = await getDanhMucByName(danhmucTen);
    if (!danhmuc || danhmuc.length === 0) {
      return res.status(404).send('Danh mục không tồn tại');
    }
    
    const products = await getProductsByDanhMuc(danhmuc[0].danhmuc_id);
    res.render('listProduct', {
      products: products
    });
  } catch (err) {
    res.status(500).send(err);
  }
}

const getLoaiSanPhamByName = util.promisify(menuModel.getLoaiSanPhamByName);
const getProductsByLoaiSanPham = util.promisify(productModel.getProductsByLoaiSanPham);

exports.renderLoaiDanhMuc = async (req, res) => {
  try {
    const danhmucSlug = req.params.danhMucTen;
    const loaisanphamSlug = req.params.loaisanphamTen;
    const danhmucTen = danhmucSlug ? danhmucSlug.replace(/-/g, ' ') : '';
    const loaisanphamTen = loaisanphamSlug ? loaisanphamSlug.replace(/-/g, ' ') : '';
    
    const loaisanpham = await getLoaiSanPhamByName(loaisanphamTen);
    if (!loaisanpham || loaisanpham.length === 0) {
      return res.status(404).send('Loại sản phẩm không tồn tại');
    }
    
    const products = await getProductsByLoaiSanPham(loaisanpham[0].loaisanpham_id);
    res.render('listProduct', {
      products: products
    });
  } catch (err) {
    res.status(500).send(err);
  }
};