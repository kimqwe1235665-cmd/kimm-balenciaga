
import { products } from '../../data/products.js';
import { formatMoney } from '../utils/money.js';
import { cart, addToCart } from '../cart.js';

function renderProducts(type = 'all') {
  const list = type === 'all' ? products : products.filter((p) => p.gender === type);
  const productsHTML = list.map(product => `
    <div class="product-item">
      <img class="product-img" src="${product.image}" alt="${product.name}" loading="lazy">
      <p class="product-name">${product.name}</p>
      <p class="product-price">${formatMoney(product.priceCents)}</p>
      <button class="product-button js-add-to-cart" data-id="${product.id}">사다</button>
    </div>
  `).join('');

  const container = document.querySelector('.js-product-grid');
  if (container) container.innerHTML = productsHTML;
}

renderProducts('man');
function updateCartQuantity(){
  let cartQuantity = 0;
  cart.forEach(item => {
      cartQuantity += item.quantity;
  });
}

document.querySelectorAll('.js-add-to-cart').forEach(button => {
  button.addEventListener('click', () => {
    const productId = button.dataset.id;
    console.log(`Add to cart: ${productId}`);
    addToCart(productId);
    updateCartQuantity();
  });
});
