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
        cart.push({ productId: productId, quantity: 1 });
    }
    saveToLocalStorage();
}
export function removeFromCart(productId) {
    let newCart = [];   
    cart.forEach(cartItem =>{
        if (cartItem.productId === productId) {
            if (cartItem.quantity > 1) {
                cartItem.quantity -= 1;
                newCart.push(cartItem);
            }
        }else{
            newCart.push(cartItem);
        }
    });
    cart = newCart;
    saveToLocalStorage();
}
