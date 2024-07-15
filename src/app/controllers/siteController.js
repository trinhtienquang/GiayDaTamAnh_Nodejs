const sliderModel = require('../models/sliderModel')
const storeModel = require('../models/storeModel')
const  formatPhoneNumber  = require('../../utils/phoneFormat');

exports.index = function(req, res) {
  sliderModel.getSlider(function(err, sliders){
    console.log(sliders)
    res.render('home',{
      sliders:sliders
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


