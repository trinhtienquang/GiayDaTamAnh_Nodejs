const db = require('../../config/db');

const User = {
  findByPhone: (phone, callback) => {
    const query = 'SELECT * FROM tbl_user WHERE phone = ?';
    db.query(query, [phone], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length > 0) {
        return callback(null, results[0]);
      }
      return callback(null, null);
    });
  },
  
  create: (phone, password, callback) => {
    const query = 'INSERT INTO tbl_user (phone, password) VALUES (?, ?)';
    db.query(query, [phone, password], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = User;
