const jwt = require('jsonwebtoken');
require('dotenv').config();

function verifyToken(req, res, next) {
  // Kiểm tra sự tồn tại của tiêu đề Authorization
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader; // Lấy token sau "Bearer "
  if (!token) return res.status(403).send({ success: false, message: 'No token provided.' });
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
