import { cart, removeFromCart, addToCart} from "./cart.js";
import { products } from "../data/products.js";
import { formatMoney } from "./utils/money.js";

function renderPaymentSummary(){
    let productPriceCents = 0;
    cart.forEach(cartItem => {
        const productId = cartItem.productId;
        let product;
        product = products.find(product => product.id === productId);
        productPriceCents += cartItem.quantity * product.priceCents;
    });
    const totalPrice = productPriceCents;
    const paymentSummaryHTML =`
    <p class="total-price-label">총 가격:</p>
    <p class="total-price-value js-total-price">${formatMoney(totalPrice)}</p>
    `;
    document.querySelector('.js-payment-summary').innerHTML = paymentSummaryHTML;
}

function renderCheckoutItems() {
  let checkoutHTML = '';

cart.forEach(cartItem => {
    const productId = cartItem.productId;
    const quantity = cartItem.quantity;

    let matchingProduct;

    products.forEach(product => {
        if (product.id === productId) {
            matchingProduct = product;
        }
    });
    console.log(matchingProduct);

    checkoutHTML += `
      <div class="cart-item js-cart-item-${matchingProduct.id}">
        <img class="cart-item-image js-cart-item-image" src="${matchingProduct.image}">
        <div class="cart-item-details">
          <div class="cart-item-name js-cart-item-name">${matchingProduct.name}</div>
          <div class="cart-item-price js-cart-item-price">${formatMoney(matchingProduct.priceCents)}</div>
          <div class="cart-item-quantity js-cart-item-quantity">
          수량: <div class="delete-from-cart js-delete-from-cart">
          <button class="js-delete-button quantity-button" data-product-id="${matchingProduct.id}">-</button>
          </div> 
          ${cartItem.quantity}
          <div class="add-to-cart js-add-to-cart">
          <button class="js-add-button quantity-button" data-product-id="${matchingProduct.id}">+</button>
          </div>
          </div>
        </div>
    </div>

    `
});
document.querySelector('.js-cart-items-container').innerHTML = checkoutHTML;

document.querySelectorAll('.js-delete-button').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        removeFromCart(productId);
        renderCheckoutItems();

        renderPaymentSummary();

    });
});

document.querySelectorAll('.js-add-button').forEach(button => {
    button.addEventListener('click', () => {
        const productId = button.dataset.productId;
        addToCart(productId);
        renderCheckoutItems();
        renderPaymentSummary();
        

    });
});
}

renderCheckoutItems();
renderPaymentSummary()