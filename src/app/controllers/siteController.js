const productModel = require('../models/productModel')
const menuModel = require('../models/menuModel')
const slugify = require('../../utils/slugify');
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
      { name: danhmuc[0].danhmuc_ten, url: `/danh-muc/${danhmucSlug}` }
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
      banner_img: danhmuc[0].danhmuc_anh,
      slugify
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
      { name: danhmuc[0].danhmuc_ten, url: `/danh-muc/${danhmucSlug}` },
      { name: loaisanpham[0].loaisanpham_ten, url: `/danh-muc/${danhmucSlug}/${loaisanphamSlug}`}
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
      banner_img: loaisanpham[0].loaisanpham_anh,
      slugify
    });
  } catch (err) {
    console.error('Error in renderLoaiDanhMuc:', err);
    res.status(500).send('Internal Server Error');
  }
};

const getProductBySlug = util.promisify(productModel.getProductBySlug);
const getDanhMucById = util.promisify(menuModel.getDanhMucById);
const getAnhSanPhamById = util.promisify(menuModel.getAnhSanPhamById);
const getSizeSanPhamById = util.promisify(menuModel.getSizeSanPhamById);


exports.renderProductDetail = async (req, res) => {
  try {
    const slug = req.params.slug;
    const productName = slug ? slug.replace(/-/g, ' ') : '';
    // console.log(productName)

    // Tìm sản phẩm dựa trên tên sản phẩm
    const product = await getProductBySlug(productName);
    if (!product) {
      return res.status(404).send('Sản phẩm không tồn tại');
    }
    // console.log(product)
    // Lấy danh mục của sản phẩm để tạo breadcrumb
    const danhmuc = await getDanhMucById(product.danhmuc_id);
    if (!danhmuc || danhmuc.length === 0) {
      return res.status(404).send('Danh mục không tồn tại');
    }

    const images = await getAnhSanPhamById(product.sanpham_id);
    // console.log(images)
    const sizes = await getSizeSanPhamById(product.sanpham_id);
    // console.log(sizes)
    const breadcrumb = [
      { name: 'Trang chủ', url: '/' },
      { name: danhmuc[0].danhmuc_ten, url: `/danh-muc/${slugify(danhmuc[0].danhmuc_ten, { lower: true })}` },
      { name: `${product.sanpham_ten} - ${product.sanpham_ma}`, url: `/chi-tiet-san-pham/${slug}` }
    ];

    res.render('productDetail', {
      product: product,
      breadcrumb: breadcrumb,
      images: images ? images : [],
      sizes: sizes ? sizes : [],
      slugify
    });
    // console.log(product)
  } catch (err) {
    console.error('Error in renderProductDetail:', err);
    res.status(500).send('Internal Server Error');
  }
};
