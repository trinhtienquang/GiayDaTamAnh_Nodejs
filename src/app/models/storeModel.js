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