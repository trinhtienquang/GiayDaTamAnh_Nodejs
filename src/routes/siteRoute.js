const express = require('express');
const router = express.Router();

var siteController = require('../app/controllers/siteController');

router.get('/', siteController.index)

router.get('/gioi-thieu', siteController.introduce)

router.get('/lien-he', siteController.contact)

router.get('/blog-thoi-trang', siteController.blog)

router.get('/tin-tuc', siteController.news)

router.get('/san-pham', siteController.getAllProduct)


    
module.exports = router;
