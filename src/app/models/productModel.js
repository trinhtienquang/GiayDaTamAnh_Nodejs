const sql = require('../../config/db');

exports.getProductsByDanhMuc = (danhmuc_id, limit, offset, orderby, callback) => {
  let orderQuery = '';
  switch (orderby) {
    case 'date':
      orderQuery = 'ORDER BY created_at DESC';
      break;
    case 'price':
      orderQuery = 'ORDER BY CAST(sanpham_gia AS UNSIGNED) ASC'; // Chuyển varchar sang số để sắp xếp theo giá
      break;
    case 'price-desc':
      orderQuery = 'ORDER BY CAST(sanpham_gia AS UNSIGNED) DESC';
      break;
    default:
      orderQuery = ''; // Thứ tự mặc định
  }

  const sqlQuery = `SELECT * FROM tbl_sanpham WHERE danhmuc_id = ? ${orderQuery} LIMIT ? OFFSET ?`;
  sql.query(sqlQuery, [danhmuc_id, limit, offset], function(err, res) {
    if (err) {
      return callback(err, null);
    }
    callback(null, res);
  });
};

exports.getProductsByLoaiSanPham = (loaisanpham_id, limit, offset, orderby, callback) => {
  let orderQuery = '';
  switch (orderby) {
    case 'date':
      orderQuery = 'ORDER BY created_at DESC';
      break;
    case 'price':
      orderQuery = 'ORDER BY CAST(sanpham_gia AS UNSIGNED) ASC'; // Chuyển varchar sang số để sắp xếp theo giá
      break;
    case 'price-desc':
      orderQuery = 'ORDER BY CAST(sanpham_gia AS UNSIGNED) DESC';
      break;
    default:
      orderQuery = ''; // Thứ tự mặc định
  }

  const sqlQuery = `SELECT * FROM tbl_sanpham WHERE loaisanpham_id = ? ${orderQuery} LIMIT ? OFFSET ?`;
  sql.query(sqlQuery, [loaisanpham_id, limit, offset], function(err, res) {
    if (err) {
      return callback(err, null);
    }
    callback(null, res);
  });
};

// Đếm số sản phẩm dựa trên danh mục
exports.countProductsByDanhMuc = (danhmuc_id, callback) => {
  const sqlQuery = 'SELECT COUNT(*) as total FROM tbl_sanpham WHERE danhmuc_id = ?';
  sql.query(sqlQuery, [danhmuc_id], function(err, res) {
    if (err) {
      return callback(err, null);
    }
    callback(null, res[0].total);
  });
};

// Đếm số sản phẩm dựa trên loại sản phẩm
exports.countProductsByLoaiSanPham = (loaisanpham_id, callback) => {
  const sqlQuery = 'SELECT COUNT(*) as total FROM tbl_sanpham WHERE loaisanpham_id = ?';
  sql.query(sqlQuery, [loaisanpham_id], function(err, res) {
    if (err) {
      return callback(err, null);
    }
    callback(null, res[0].total);
  });
};