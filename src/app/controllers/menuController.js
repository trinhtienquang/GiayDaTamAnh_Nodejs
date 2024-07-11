const Menu = require('../models/menuModel') 
const slugify = require('../../utils/slugify');
exports.renderMenu = (req, res, next) => {
  Menu.getDanhMucs((err, danhmucs) => {
    if (err) {
      return res.status(500).send(err);
    }
    
    Menu.getLoaiSanPhams((err, loaisanphams) => {
      if (err) {
        return res.status(500).send(err);
      }

      // Nhóm các loại sản phẩm theo danh mục
      const menuData = danhmucs.map(danhmuc => {
        return {
          ...danhmuc,
          loaisanphams: loaisanphams.filter(loaisanpham => loaisanpham.danhmuc_id === danhmuc.danhmuc_id)
        };
      });
      res.locals.menuData = menuData;
      res.locals.slugify = slugify;  // Truyền hàm slugify vào view
      next(); // Chuyển tiếp sang middleware hoặc route tiếp theo
    });
  });
};