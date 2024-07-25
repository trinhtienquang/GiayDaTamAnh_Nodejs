//============sticky navbar=============
$(document).ready(function () {
  var header = $('.midle_header');
  var threshold = 100;

  function handleScroll() {
    var scrollPosition = $(window).scrollTop();

    if (scrollPosition > threshold) {
      header.addClass('fix_menu');
    } else {
      header.removeClass('fix_menu');
    }
  }

  $(window).scroll(handleScroll);
});

//==============backtop=============
$(document).ready(function () {
  $(window).scroll(function () {
    if ($(this).scrollTop()) {
      $('#backtop').fadeIn();
    } else {
      $('#backtop').fadeOut();
    }
  });
  $('#backtop').click(function () {
    $('html,body').animate({ scrollTop: 0 }, 100);
  });
});

//==========Detail Product change picture============
const bigImg = document.querySelector(".big_img img");
// console.log(bigImg)
const smallImgs = document.querySelectorAll(".small_img .slider_img p img");
// console.log(smallImgs)
smallImgs.forEach(function (imgItem) {
  imgItem.addEventListener("click", function () {
    bigImg.src = imgItem.src
     // Loại bỏ lớp selected từ tất cả các ảnh nhỏ
     smallImgs.forEach(function(img) {
      img.classList.remove('active');
    });

    // Thêm lớp selected vào ảnh được nhấp
    imgItem.classList.add('active');
  })
});

//============zoom ảnh chi tiết sản phẩm============= 
document.querySelectorAll('.big_img').forEach(elem =>{
  let x,y, width, height;
  elem.onmouseenter = () =>{
    const size = elem.getBoundingClientRect();

    x=size.x;
    y=size.y;
    width=size.width;
    height=size.height;
  };

  elem.onmousemove = e =>{
    const horizontal = (e.clientX -x) /width*100;
    const vertical = (e.clientY -y) /height*100;

    elem.style.setProperty('--x', horizontal + '%');
    elem.style.setProperty('--y', vertical + '%');

  }
})

//render menu theo đăng nhập đăng ký
function renderUserMenu() {
const userToken = localStorage.getItem('userToken');
const userInfo = JSON.parse(localStorage.getItem('userInfo'));

const userMenu = document.getElementById('user-menu');
  if (userToken && userInfo) {
    userMenu.innerHTML = `
      <div id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-regular fa-user" style="font-size: 20px; margin-right: 5px;">
        </i> <span>Chào, ${userInfo.userName}</span>
      </div>
      <ul class="dropdown-menu" aria-labelledby="dropdown-user">
        <li><a class="dropdown-item" href="#">Quản lý tài khoản</a></li>
        <li><a class="dropdown-item" href="#">Lịch sử đơn hàng</a></li>
        <li><a class="dropdown-item" href="#" id="logout">Đăng xuất</a></li>
      </ul>
    `;

    document.getElementById('logout').addEventListener('click', function() {
      localStorage.removeItem('userToken');
      localStorage.removeItem('userInfo');
      window.location.href = '/';
    });

  } else {
    userMenu.innerHTML = `
      <div id="dropdown-user" data-bs-toggle="dropdown" aria-expanded="false">
        <i class="fa-regular fa-user" style="font-size: 20px; margin-right: 5px;">
        </i>
      </div>
      <ul class="dropdown-menu" aria-labelledby="dropdown-user">
        <li><a class="dropdown-item" href="/user/login">Đăng nhập</a></li>
        <li><a class="dropdown-item" href="/user/register">Đăng ký</a></li>
      </ul>
    `;
  }
}

// Gọi hàm render khi trang được tải
document.addEventListener('DOMContentLoaded', renderUserMenu);