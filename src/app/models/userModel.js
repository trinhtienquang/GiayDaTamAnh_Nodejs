const db = require('../../config/db');

const User = {
  findByEmail: (email, callback) => {
    const query = 'SELECT * FROM tbl_user WHERE email = ?';
    db.query(query, [email], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      if (results.length > 0) {
        return callback(null, results[0]);
      }
      return callback(null, null);
    });
  },
  
  create: (user_name, phone, email, password, callback) => {
    const query = 'INSERT INTO tbl_user (user_name, phone, email, password) VALUES (?, ?, ?, ?)';
    db.query(query, [user_name, phone,email, password], (error, results) => {
      if (error) {
        return callback(error, null);
      }
      return callback(null, results);
    });
  }
};

module.exports = User;
