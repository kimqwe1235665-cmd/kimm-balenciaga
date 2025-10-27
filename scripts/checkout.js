import { cart } from "./cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";
let checkoutHTML = '';

cart.forEach(cartItem => {
    const productId = cartItem.productId;

    let matchingProduct;

    products.forEach(product => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    console.log(matchingProduct);

    checkoutHTML += `
      <div class="cart-item js-cart-item">
        <img class="cart-item-image js-cart-item-image" src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="cart-item-name js-cart-item-name">${matchingProduct.name}</div>
          <div class="cart-item-price js-cart-item-price">${formatMoney(matchingProduct.priceCents)}</div>
          <div class="cart-item-quantity js-cart-item-quantity">
          수량: <div class="delete-from-cart js-delete-from-cart">-</div> 
          ${cartItem.quantity}
          <div class="add-to-cart js-add-to-cart">+</div>
          </div>
        </div>
    </div>

    `
});
document.querySelector('.js-cart-items-container').innerHTML = checkoutHTML;