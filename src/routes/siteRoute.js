const express = require('express');
const router = express.Router();

var siteController = require('../app/controllers/siteController');

router.get('/', siteController.index)

router.get('/gioi-thieu', siteController.introduce)

router.get('/danh-muc/:danhmucTen', siteController.renderDanhMuc);

router.get('/danh-muc/:danhmucTen/:loaisanphamTen', siteController.renderLoaiDanhMuc);

router.get('/chi-tiet-san-pham/:slug', siteController.renderProductDetail);


// router.get('/chi-tiet-san-pham', siteController.productDetail)
    
module.exports = router;
