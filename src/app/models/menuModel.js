var sql = require('../../config/db');

exports.getDanhMucs = (results) => {
  const sqlQuery = 'SELECT * FROM tbl_danhmuc';
  sql.query(sqlQuery, function(err, res){
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};

exports.getLoaiSanPhams = (results) => {
  const sqlQuery = 'SELECT * FROM tbl_loaisanpham';
  sql.query(sqlQuery, function(err, res){
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};

exports.getDanhMucByName = (danhmucTen, callback) => {
  const query = 'SELECT * FROM tbl_danhmuc WHERE danhmuc_ten = ?';
  sql.query(query, [danhmucTen], callback);
};

exports.getDanhMucById = (danhmucTen, callback) => {
  const query = 'SELECT * FROM tbl_danhmuc WHERE danhmuc_id = ?';
  sql.query(query, [danhmucTen], callback);
};

exports.getLoaiSanPhamByName = (loaisanphamTen, callback) => {
  const query = 'SELECT * FROM tbl_loaisanpham WHERE loaisanpham_ten = ?';
  sql.query(query, [loaisanphamTen], callback);
};

exports.getAnhSanPhamById = (sanphamId, callback) =>{
  const query = 'SELECT * FROM tbl_sanpham_anh WHERE sanpham_id = ? order by sanpham_anh_id DESC';
  sql.query(query,[sanphamId], callback)
}

exports.getSizeSanPhamById = (sanphamId, callback) =>{
  const query = 'SELECT * FROM tbl_sanpham_size WHERE sanpham_id = ? order by sanpham_size_id';
  sql.query(query,[sanphamId], callback)
}