var sql = require('../../config/db');

exports.getSlider = (results) => {
  const sqlQuery = 'SELECT * FROM tbl_slider WHERE type = 1';
  sql.query(sqlQuery, function(err, res){
    if (err) {
      return results(err, null);
    }
    results(null, res);
  });
};