const bcrypt = require('bcrypt');
const User = require('../models/userModel');
const jwt = require('jsonwebtoken');
const transporter = require('../../middleware/mailer');
require('dotenv').config();

exports.renderRegisterForm = (req, res) => {
  res.render('register',{ messages: req.flash() });
};

exports.renderLoginForm = (req, res) => {
  res.render('login',{ messages: req.flash() });
};

exports.renderFormSendEmail = (req,res) =>{
  res.render('sendEmail',{ messages: req.flash() })
}
exports.renderFormResetPassword = (req,res) =>{
  const token = req.query.token;
  res.render('resetPass',{
    messages: req.flash(),
    token: token,
  })
}
exports.register = (req, res) => {
  const { user_name, phone, email, password, re_password } = req.body;

  User.findByEmail(email, (error, user) => {
    if (error) {
      return res.status(500).json({ message: 'Lỗi máy chủ' });
    }
    if (user) {
      req.flash('err', 'Email đã tồn tại');
      return  res.redirect('/user/register');
      // return res.status(400).json({ message: 'email đã tồn tại' });
    }
    if(password === re_password){
      bcrypt.hash(password, 10, (err, hashedPassword) => {
        if (err) {
          console.error('Error hashing password:', err);
          req.flash('err', 'Lỗi không xác định');
          return  res.redirect('/user/register');
          // return res.status(500).json({ message: 'Lỗi mã hóa mật khẩu' });
        }
  
        User.create(user_name, phone, email, hashedPassword, (error, results) => {
          if (error) {
            req.flash('err', 'Lỗi không xác định');
            return  res.redirect('/user/register');
            // return res.status(500).json({ message: 'Lỗi máy chủ' });
          }
          req.flash('info', 'Đăng ký thành công');
          return res.redirect('/user/login');
        });
      });
    }else{
      req.flash('info', 'Xác nhận mật khẩu không trùng khớp');
      return res.redirect('/user/register');
      // res.status(400).json({ message: 'Xác nhận mật khẩu không trùng khớp' });
    }
    
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  User.findByEmail(email, (error, user) => {
    if (error) {
      console.error('Error finding user:', error);
      return res.status(500).json({message: 'Lỗi máy chủ'});
    }
    if (!user) {
      console.log('User not found');
      return res.status(401).json({message: 'Người dùng không tồn tại'});
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
      const SECRET_KEY = process.env.JWT_SECRET_KEY;
      const token = jwt.sign({ userId: user.user_id }, SECRET_KEY, { expiresIn: '1h' });
      res.status(200).json({ message: 'Đăng nhập thành công', token, user: {userId: user.user_id, phone: user.phone, userName: user.user_name}});
    });
  });
};


exports.sendResetPasswordEmail = (req, res) => {
  const { email } = req.body;

  User.findByEmail(email, (error, user) => {
    if (error) {
      console.error('Error finding user:', error);
      req.flash('err', 'Lỗi không xác định');
      return  res.redirect('/user/forgot-password');
      // return res.status(500).json({ message: 'Lỗi máy chủ' });
    }
    if (!user) {
      req.flash('err', 'Email không tồn tại');
      return  res.redirect('/user/forgot-password');
      // return res.status(404).json({ message: 'Email không tồn tại' });
    }
    const SECRET_KEY = process.env.JWT_SECRET_KEY;
    const token = jwt.sign({ userId: user.user_id },SECRET_KEY, { expiresIn: '1h' });

    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: user.email,
      subject: 'Đặt lại mật khẩu',
      text: `Nhấp vào liên kết sau để đặt lại mật khẩu của bạn: http://localhost:3000/user/reset-password?token=${token}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error('Error sending email:', error);
        req.flash('err', 'Lỗi gửi email vui lòng thử lại');
        return  res.redirect('/user/forgot-password');
        // return res.status(500).json({ message: 'Lỗi gửi email' });
      }
      req.flash('info', 'Email đặt lại mật khẩu đã được gửi, kiểm tra hòm thư hoặc hòm thư rác của bạn');
      return res.redirect('/user/login');
    });
  });
};

exports.resetPassword = (req, res) => {
  const { newPassword, re_password, token } = req.body;
  if(newPassword !== re_password) {
    req.flash('err', 'Mật khẩu xác nhận không khớp');
    return  res.redirect('/user/reset-password');
    // return res.status(400).json({ message: 'Mật khẩu xác nhận không khớp' });
  }
  const SECRET_KEY = process.env.JWT_SECRET_KEY;
  jwt.verify(token, SECRET_KEY, (err, decoded) => {
    if (err) {
      console.error('Error verifying token:', err);
      req.flash('err', 'Lỗi không xác định');
      return  res.redirect('/user/reset-password');
      // return res.status(400).json({ message: 'Token không hợp lệ hoặc đã hết hạn' });
    }

    const userId = decoded.userId;

    bcrypt.hash(newPassword, 10, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        req.flash('err', 'Lỗi không xác định');
        return  res.redirect('/user/reset-password');
        // return res.status(500).json({ message: 'Lỗi mã hóa mật khẩu' });
      }

      User.updatePassword(userId, hashedPassword, (error, results) => {
        if (error) {
          console.error('Error updating password:', error);
          req.flash('err', 'Lỗi không xác định');
          return  res.redirect('/user/reset-password');
          // return res.status(500).json({ message: 'Lỗi máy chủ' });
        }
        req.flash('info', 'Đổi mật khẩu thành công');
        return res.redirect('/user/login')
        // res.status(200).json({ message: 'đổi mật khẩu thành công' });
      });
    });
  });
};