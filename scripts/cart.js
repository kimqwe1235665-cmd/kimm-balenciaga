export let cart;

loadFromLocalStorage();

function loadFromLocalStorage(){
    cart = JSON.parse(localStorage.getItem('cart'));

if (!cart) {
    cart = [{
        productId:"001",
        quantity:2
    },{
        productId:"002",
        quantity:1
    }];
}
}
function saveToLocalStorage(){
    localStorage.setItem('cart', JSON.stringify(cart));
}


export function addToCart(productId) {
    let matchingItem; 
    cart.forEach(cartItem => {
        if (cartItem.productId === productId) {
            matchingItem = cartItem;
        }
    });
    if (matchingItem) {
        matchingItem.quantity += 1;
    } else {
        cart.push({ id: productId, quantity: 1 });
    }
    saveToLocalStorage();
}
export function removeFromCart(productId) {
    const newCart = [];
    cart.forEach(cartItem =>{
        if (cartItem.productId !== productId) {
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToLocalStorage();
}
