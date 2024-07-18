
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
  const productImage = document.querySelector('.big_img img').src;
  const productPrice = Number(document.querySelector('.product_priece p').innerText.replace(/\D/g, ''));
  const productQuantity = Number(document.getElementById('soluong').value);
  const selectedSizeElement = document.querySelector('#choose-size li.active span');
  const productSize = selectedSizeElement ? selectedSizeElement.innerText : "N/A";

  if (document.querySelector('#choose-size') && !selectedSizeElement) {
    alert('Vui lòng chọn kích thước sản phẩm.');
    return;
  }


    // Tạo đối tượng sản phẩm
    const product = {
      id: productId,
      name: productName,
      image: productImage,
      price: productPrice,
      quantity: productQuantity,
      size: productSize
    };

    // Lấy giỏ hàng từ localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Kiểm tra sản phẩm đã tồn tại trong giỏ hàng hay chưa
    const existingProductIndex = cart.findIndex(item => item.id === productId && item.size === productSize);
    if (existingProductIndex > -1) {
      // Cập nhật số lượng nếu sản phẩm đã tồn tại
      cart[existingProductIndex].quantity += productQuantity;
    } else {
      // Thêm sản phẩm mới vào giỏ hàng
      cart.push(product);
    }

    // Lưu giỏ hàng vào localStorage
    localStorage.setItem('cart', JSON.stringify(cart));

    // Cập nhật giao diện giỏ hàng
    updateCartUI();
  });

  // Hàm cập nhật giao diện giỏ hàng
  function updateCartUI() {
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    const cartContent = document.querySelector('.content_scroll_cart tbody');
    cartContent.innerHTML = '';

    let totalAmount = 0;   //biến để tính tổng tiền
    let totalQuantity = 0; //biến để tính tổng số lượng sản phẩm

    cart.forEach(item => {
      totalAmount += item.price * item.quantity;
      totalQuantity += item.quantity;

      const cartItem = document.createElement('tr');
      cartItem.classList.add('cart_item');

      let sizeHtml = '';
      if (item.size !== "N/A") {
        sizeHtml = `
          <dt class="variation-size">Size:</dt>
          <dd class="variation-size">
            <p>${item.size}</p>
          </dd>
        `;
      }
      cartItem.innerHTML = `
        <td class="item_card_checkout">
          <div class="product-image">
            <a href=""><img src="${item.image}" alt="" class="img-fluid"></a>
            <div class="product-remove">
              <a href="#" class="remove" data-id="${item.id}" data-size="${item.size}">x</a>
            </div>
          </div>
          <div class="product-detail">
            <div class="name">
              <a href="">${item.name}</a>
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
              <div class="product-price">${item.price.toLocaleString('vi-VN')}₫</div>
            </div>
          </div>
        </td>
      `;

      cartContent.appendChild(cartItem);
    });

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
      });
    });
  }

  // Hàm xóa sản phẩm khỏi giỏ hàng
  function removeFromCart(productId, productSize) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    cart = cart.filter(item => !(item.id === productId && item.size === productSize));
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartUI();
  }

  // Cập nhật giao diện giỏ hàng khi tải trang
  updateCartUI();
});

//==========Tăng giảm số lượng sản phẩm==============
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