'user strict';
var sql = require('../../config/db');
const util = require('node:util');

const query = util.promisify(sql.query).bind(sql);

var Product = function(product){
  // console.log(product);
  this.sanpham_tieude = product.title;
  this.sanpham_ma = product.code;
  this.sanpham_gia = product.price;
};

Product.getAllProduct = async function getAllProduct(req,result) {
    let _name = req.query.sanpham_tieude;

    //trang hiện tại: 1, 2, 3
    let _page = req.query.page ? req.query.page : 1;
    
    //truy vấn tính tổng số dòng trong 1 bảng
    let _sql_total = "SELECT COUNT(*) as totalProduct FROM tbl_sanpham"
    if(_name){
        _sql_total += ` where sanpham_tieude LIKE '%${_name}%' `;
    }
    let rowData = await query(_sql_total);
    let  totalRow = rowData[0].totalProduct;
    
    let _limit = 5;
    let totalPage = Math.ceil(totalRow/_limit);
    _page = _page > 0 ? Math.floor(_page) : 1;
    _page = _page <= totalPage ? Math.floor(_page) : totalPage;

    let _start = (_page-1) * _limit;

    let sqlQuery= "SELECT * FROM tbl_sanpham"
    if(_name){
      sqlQuery += ` where sanpham_tieude LIKE '%${_name}%' `;
    }
    sqlQuery += ` order by sanpham_id DESC LIMIT ${_start} , ${_limit}`;
    console.log(sqlQuery);
  sql.query(sqlQuery,function (err, data) {

      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          // console.log('products : ', res);
          result(null, data, _name,_page, totalPage);
      }
  });
};
Product.getProductById = function getProduct(productId, result) {
  sql.query("SELECT * FROM tbl_sanpham WHERE sanpham_id = ?",productId, function (err, res) {

      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          result(null, res);
      }
  });
};
Product.remove = function(productId, result) {
  sql.query("DELETE FROM tbl_sanpham WHERE sanpham_id = ?",productId, function (err, res) {

      if(err) {
          console.log("error: ", err);
          result(null, err);
      }
      else{
          result(null, res);
      }
  });
};
module.exports = Product;  