const productModel = require('../models/productModel')
const menuModel = require('../models/menuModel')
const slugify = require('../../utils/slugify');
const util = require('util');

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
