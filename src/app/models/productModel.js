const sql = require('../../config/db');

exports.getProductsByDanhMuc = (danhmuc_id, results) => {
  const sqlQuery = 'SELECT * FROM tbl_sanpham WHERE danhmuc_id = ?';
  sql.query(sqlQuery, [danhmuc_id], function(err, res){
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};

exports.getProductsByLoaiSanPham = (loaisanpham_id, results) => {
  const sqlQuery = 'SELECT * FROM tbl_sanpham WHERE loaisanpham_id = ?';
  sql.query(sqlQuery, [loaisanpham_id], function(err, res){
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};