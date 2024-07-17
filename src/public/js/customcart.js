document.addEventListener('DOMContentLoaded', function () {
  document.querySelector('.cart').addEventListener('click', function () {
    document.querySelector('.shopping_cart').classList.add('active_cart');
    document.querySelector('html').classList.add('no_scroll');

  });
  document.querySelector('.close_shopping_cart').addEventListener('click', function () {
    document.querySelector('.shopping_cart').classList.remove('active_cart');
    document.querySelector('html').classList.remove('no_scroll');
  });
});