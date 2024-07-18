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