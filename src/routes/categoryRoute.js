const express = require('express');
const router = express.Router();

var categoryController = require('../app/controllers/categoryController');

router.get('/:danhmucTen', categoryController.renderDanhMuc);

router.get('/:danhmucTen/:loaisanphamTen', categoryController.renderLoaiDanhMuc);


module.exports = router;