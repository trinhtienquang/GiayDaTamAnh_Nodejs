const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');


exports.renderRegisterForm = (req, res) => {
  res.render('register');
};

exports.renderLoginForm = (req, res) => {
  res.render('login');
};

exports.register = (req, res) => {
  const { phone, password } = req.body;

  User.findByPhone(phone, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Lỗi máy chủ' });
    }
    if (user) {
      return res.status(400).json({ message: 'số điện thoại đã tồn tại' });
    }

    bcrypt.hash(password, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        return res.status(500).json({ message: 'Lỗi mã hóa mật khẩu' });
      }

      User.create(phone, hashedPassword, (error, results) => {
        if (error) {
          return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
        res.status(201).json({ message: 'Đăng ký thành công' });
      });
    });
  });
};

exports.login = (req, res) => {
  const { phone, password } = req.body;

  User.findByPhone(phone, (error, user) => {
    if (error) {
      console.error('Error finding user:', error);
      return res.status(500).json({message: 'Lỗi máy chủ'});
    }
    if (!user) {
      console.log('User not found');
      return res.status(401).json({message: 'không tồn tại user'});
    }
    bcrypt.compare(password, user.password, (err, isMatch) => {
      if (err) {
        console.error('Error comparing password:', err);
        return res.status(500).json({message:'Lỗi máy chủ'});
      }
      if (!isMatch) {
        console.log('Password does not match');
        return res.status(401).json({message:'mật khẩu không đúng'});
      }

      const token = jwt.sign({ userId: user.user_id }, 'secret_key', { expiresIn: '1h' });
      res.status(200).json({ message: 'Đăng nhập thành công', token });
      // res.redirect('/',{token})
    });
  });
};