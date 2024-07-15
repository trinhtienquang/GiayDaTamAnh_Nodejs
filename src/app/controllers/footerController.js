const store = require('../models/storeModel') 

exports.renderFooter = (req, res, next) => {
  store.getStoresByCity((err,results) => {
    if (err) {
      return res.status(500).send(err);
  }
  // Nhóm cửa hàng theo thành phố
  const storesByCity = results.reduce((acc, store) => {
      if (!acc[store.cuahang_city]) {
          acc[store.cuahang_city] = [];
      }
      acc[store.cuahang_city].push(store);
      return acc;
  }, {});
  // console.log(results)
  // console.log(storesByCity)
  res.locals.storesByCity = storesByCity;
  next(); 
  })
};