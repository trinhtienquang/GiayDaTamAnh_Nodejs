function isUserLoggedIn() {
  // console.log(localStorage.getItem('userToken'))
  // Giả sử bạn có một token hoặc giá trị trong localStorage để kiểm tra trạng thái đăng nhập
  return !!localStorage.getItem('userToken');
}
// isUserLoggedIn()
function showToast(type, icon, title, text) {
  const notifications = document.querySelector('.notifications'); // Giả sử bạn có một container để chứa các thông báo
  const newToast = document.createElement('div');
  newToast.className = `toast ${type}`;
  newToast.innerHTML = `
    <i class="${icon}"></i>
    <div class="content">
      <div class="title">${title}</div>
      <span>${text}</span>
    </div>
    <i class="fa-solid fa-xmark" onclick="(this.parentElement).remove()"></i>
  `;
  notifications.appendChild(newToast);
  newToast.timeOut = setTimeout(() => newToast.remove(), 5000);
}
document.addEventListener('DOMContentLoaded', function() {
  //luôn cập nhật giỏ hàng mỗi khi tải lại trang hoặc sang trang khác
  updateCartUI();

  //sử lý sự kiện bật tắt giỏ hàng
  document.querySelector('.cart').addEventListener('click', function () {
    document.querySelector('.shopping_cart').classList.add('active_cart');
    document.querySelector('html').classList.add('no_scroll');

  });
  document.querySelector('.close_shopping_cart').addEventListener('click', function () {
    document.querySelector('.shopping_cart').classList.remove('active_cart');
    document.querySelector('html').classList.remove('no_scroll');
  });

//=================Sự kiện add cart=========================
  document.querySelector('.btn-addcart').addEventListener('click', function() {
      // Lấy thông tin sản phẩm từ DOM
  const productId = document.querySelector('.product-summary').getAttribute('data-product-id');
  const productName = document.querySelector('.product_title').innerText.trim();
  const productUrl = document.querySelector('.product_url').innerText.trim();
  const productImage = document.querySelector('.big_img img').alt;
  const productPrice = Number(document.querySelector('.product_priece p').innerText.replace(/\D/g, ''));
  const productQuantity = Number(document.getElementById('soluong').value);
  const selectedSizeElement = document.querySelector('#choose-size li.active span');
  const productSize = selectedSizeElement ? selectedSizeElement.innerText : "N/A";

  if (document.querySelector('#choose-size') && !selectedSizeElement) {
    showToast('warning', 'fa-solid fa-triangle-exclamation', 'Cảnh báo', 'Vui lòng chọn size sản phẩm.')
    return;
  }
  // Tạo đối tượng sản phẩm
  const product = {
    sanpham_id: productId,
    sanpham_ten: productName,
    sanpham_anh: productImage,
    sanpham_gia: productPrice,
    quantity: productQuantity,
    sanpham_size: productSize,
    sanpham_url: productUrl,
  };
  if (isUserLoggedIn()) {
    // Người dùng đã đăng nhập, lưu giỏ hàng vào cơ sở dữ liệu
    saveCartToDatabase(product);
  } else {
    // Người dùng chưa đăng nhập, lưu giỏ hàng vào localStorage
    saveCartToLocalStorage(product);
  }

  // Cập nhật giao diện giỏ hàng
  updateCartUI();
  });

  // Hàm lưu giỏ hàng vào localStorage
  function saveCartToLocalStorage(product) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProductIndex = cart.findIndex(item => item.sanpham_id === product.sanpham_id && item.sanpham_size === product.sanpham_size);
    if (existingProductIndex > -1) {
      // Cập nhật số lượng nếu sản phẩm đã tồn tại
      cart[existingProductIndex].quantity += product.quantity;
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      cart.push(product);
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));
    showToast('sucess', 'fa-solid fa-check-circle', 'Thành công', 'Sản phẩm đã được thêm vào giỏ hàng.')

  }

  // Hàm lưu giỏ hàng vào cơ sở dữ liệu
  function saveCartToDatabase(product) {
    fetch('/api/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Giả sử bạn sử dụng token để xác thực
      },
      body: JSON.stringify(product)
    })
    .then(response => response.json())
    .then(data => {
      if (data.success) {
        // console.log(data)
        showToast('sucess', 'fa-solid fa-check-circle', 'Thành công', 'Sản phẩm đã được thêm vào giỏ hàng.')
      } else {
        // console.error('Error adding product to cart in database', data.message);
        showToast('error', 'fa-solid fa-circle-exclamation', 'Thất bại', 'Có lỗi xảy ra.')
      }
    })
    .catch(error => {
      console.error('Error adding product to cart in database', error);
    });
  }

  // Hàm cập nhật giao diện giỏ hàng
  function updateCartUI() {
    if (isUserLoggedIn()) {
      // Người dùng đã đăng nhập, lấy giỏ hàng từ cơ sở dữ liệu
      fetch('/api/cart', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Giả sử bạn sử dụng token để xác thực
        }
      })
      .then(response => response.json())
      .then(data => {
        if (data.success) {
          renderCart(data.cart);
          // console.log(data)
        } else {
          console.error('Error fetching cart from database', data.message);
        }
      })
      .catch(error => {
        console.error('Error fetching cart from database', error);
      });
    }else {
     const cart = JSON.parse(localStorage.getItem('cart')) || [];
    renderCart(cart) 
    }
    
  }

// Hàm render giỏ hàng
  function renderCart(cart) {
    const cartContent = document.querySelector('.content_scroll_cart tbody');
    const bottomCart = document.querySelector('.bottom_giohang');
    cartContent.innerHTML = '';

    let totalAmount = 0;   //biến để tính tổng tiền
    let totalQuantity = 0; //biến để tính tổng số lượng sản phẩm
    if (cart.length === 0) {
      // Nếu giỏ hàng rỗng, hiển thị thông báo
      cartContent.innerHTML = '<p>Chưa có sản phẩm trong giỏ hàng.<p>';
      bottomCart.style.display = 'none'; // Ẩn phần bottom_giohang khi giỏ hàng rỗng
    } else {
      cart.forEach(item => {
        totalAmount += item.sanpham_gia * item.quantity;
        totalQuantity += item.quantity;

        const cartItem = document.createElement('tr');
        cartItem.classList.add('cart_item');

        let sizeHtml = '';
        if (item.size !== "N/A") {
          sizeHtml = `
            <dt class="variation-size">Size:</dt>
            <dd class="variation-size">
              <p>${item.sanpham_size}</p>
            </dd>
          `;
        }
        cartItem.innerHTML = `
          <td class="item_card_checkout">
            <div class="product-image">
              <a href="/chi-tiet-san-pham/${item.sanpham_url}"><img src="/uploads/${item.sanpham_anh}" alt="" class="img-fluid"></a>
              <div class="product-remove">
                <a href="#" class="remove" data-id="${item.sanpham_id}" data-size="${item.sanpham_size}">x</a>
              </div>
            </div>
            <div class="product-detail">
              <div class="name">
                <a href="/chi-tiet-san-pham/${item.sanpham_url}">${item.sanpham_ten}</a>
                <dl class="variation">
                    ${sizeHtml}
                    <dt class="variation-thuonghieu">Thương hiệu:</dt>
                      <dd class="variation-thuonghieu">
                        <p>Đồ Da Tâm Anh</p>
                      </dd>
                    </dl>
                </dl>
              </div>
              <div class="price_quantity">
                <div class="product-quantity">x${item.quantity}</div>
                <div class="product-price">${Number(item.sanpham_gia).toLocaleString('vi-VN')}₫</div>
              </div>
            </div>
          </td>
        `;

        cartContent.appendChild(cartItem);
      });
      bottomCart.style.display = 'block'; // Hiển thị bottom_giohang khi có sản phẩm trong giỏ hàng
    }

    document.querySelector('.checkout .amount').innerText = `${totalAmount.toLocaleString('vi-VN')}₫`;
    document.querySelector('.tongtien .amount').innerText = `${totalAmount.toLocaleString('vi-VN')}₫`;

    document.querySelector('.cart .count').innerText = `${totalQuantity}`
    document.querySelector('.title .count').innerText = `${totalQuantity}`

    // Thêm sự kiện cho nút "xóa"
    document.querySelectorAll('.product-remove .remove').forEach(button => {
      button.addEventListener('click', function(event) {
        event.preventDefault();
        const productId = this.getAttribute('data-id');
        const productSize = this.getAttribute('data-size');
        removeFromCart(productId, productSize);
        console.log('Product removed from cart in localstorage');
        showToast('sucess', 'fa-solid fa-check-circle', 'Thành công', 'Sản phẩm đã được xóa khỏi giỏ hàng.')
      });
    });
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(productId, productSize) {
    if (isUserLoggedIn()) {
      // Người dùng đã đăng nhập, xóa sản phẩm từ cơ sở dữ liệu
    fetch(`/api/cart/${productId}`, {
      method: 'DELETE',
      headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${localStorage.getItem('userToken')}` // Giả sử bạn sử dụng token để xác thực
      },
      body: JSON.stringify({ sanpham_size: productSize })
      })
      .then(response => response.json())
      .then(data => {
      if (data.success) {
      console.log('Product removed from cart in database');
      updateCartUI();
      updateCartCheckoutUI();

      } else {
      console.error('Error removing product from cart in database', data.message);
      showToast('error', 'fa-solid fa-circle-exclamation', 'Thất bại', 'Có lỗi xảy ra.')
      }
      })
      .catch(error => {
      console.error('Error removing product from cart in database', error);
      showToast('error', 'fa-solid fa-circle-exclamation', 'Thất bại', 'Có lỗi xảy ra.')
      });
    }else{
      let cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart = cart.filter(item => !(item.sanpham_id === productId && item.sanpham_size === productSize));
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartUI();
      updateCartCheckoutUI();
    }
  }
  
  // Cập nhật giao diện giỏ hàng khi tải trang
  updateCartUI();
})

// ==========Tăng giảm số lượng sản phẩm==============
let amountElement = document.getElementById('soluong');
let amount = amountElement.value;

let render = (amount) =>{
    amountElement.value = amount
}
//Handle Plus
let plusHandleClick = () =>{
    amount++
    render(amount)
}

let minusHandleClick = () =>{
    if(amount>1)
    amount--
    render(amount)
}

amountElement.addEventListener('input', ()=>{
    amount = amountElement.value;
    amount = parseInt(amount);
    amount = (isNaN(amount)||amount == 0)?1:amount;
    render(amount);
    console.log(amount);
})

const sizeItems = document.querySelectorAll('#choose-size li');

  // Lặp qua từng phần tử và thêm sự kiện click
  sizeItems.forEach(item => {
    item.addEventListener('click', function() {
      // Xóa lớp 'active' khỏi tất cả các phần tử li trong danh sách
      sizeItems.forEach(li => li.classList.remove('active'));
      
      // Thêm lớp 'active' vào phần tử li được click
      this.classList.add('active');
    });
  });

