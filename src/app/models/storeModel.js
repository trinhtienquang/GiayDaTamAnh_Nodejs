var sql = require('../../config/db');

exports.getStore = (results) => {
  const sqlQuery = 'SELECT * FROM tbl_cuahang';
  sql.query(sqlQuery, function(err, res){
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};

exports.getStoresByCity = (results) => {
  const query = `SELECT * FROM tbl_cuahang ORDER BY CASE cuahang_city
                    WHEN 'Hà Nội' THEN 1
                    WHEN 'TP.Hồ Chí Minh' THEN 2
                    ELSE 3
                END;`;
  sql.query(query, (err, res) => {
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};