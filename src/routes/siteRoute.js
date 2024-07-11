const express = require('express');
const router = express.Router();

var siteController = require('../app/controllers/siteController');

router.get('/', siteController.index)

router.get('/gioi-thieu', siteController.introduce)

router.get('/:danhmucTen', siteController.renderDanhMuc);

router.get('/:danhmucTen/:loaisanphamTen', siteController.renderLoaiDanhMuc);


// router.get('/chi-tiet-san-pham', siteController.productDetail)
    
module.exports = router;
