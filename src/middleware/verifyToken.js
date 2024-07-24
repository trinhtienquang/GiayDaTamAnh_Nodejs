const jwt = require('jsonwebtoken');

function verifyToken(req, res, next) {
  // Kiểm tra sự tồn tại của tiêu đề Authorization
  const authHeader = req.headers['authorization'];
  if (!authHeader) {
    return res.status(403).send({ success: false, message: 'No token provided.' });
  }
  const token = authHeader.startsWith('Bearer ') ? authHeader.substring(7) : authHeader; // Lấy token sau "Bearer "
  if (!token) return res.status(403).send({ success: false, message: 'No token provided.' });

  jwt.verify(token, process.env.JWT_SECRET, (err, decoded) => {
    if (err) return res.status(500).send({ success: false, message: 'Failed to authenticate token.' });

    req.user = decoded;
    next();
  });
}

module.exports = { verifyToken };
