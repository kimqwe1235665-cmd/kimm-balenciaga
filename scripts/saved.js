import { formatMoney } from './utils/money.js';
import { products } from '../data/products.js';
export let saved;

loadFromLocalStorage();

function loadFromLocalStorage() {
    saved = JSON.parse(localStorage.getItem('saved'));
}

if (!saved) {
    saved = [
        {
            productId: "001",
        },
        {
            productId: "002",
        }
    ];
}

function saveToLocalStorage() {
    localStorage.setItem('saved', JSON.stringify(saved));
}

function deleteFromSaved(productId) {
    let newSaved = [];
    saved.forEach(savedItem => {
        if (savedItem.productId !== productId) {
            newSaved.push(savedItem);
        }
    });
    saved = newSaved;
    saveToLocalStorage(); // Moved inside the function
}

export function addToSaved(productId) {
    let matchingItem;
    saved.forEach(savedItem => {
        if (savedItem.productId === productId) {
            matchingItem = savedItem;
        }
    });
    if (!matchingItem) {
        saved.push({ productId: productId });
    }
    saveToLocalStorage();
}

function renderSavedItems() {
    const container = document.querySelector('.js-saved-items-container');
    let savedHTML = '';

    saved.forEach(savedItem => {
        const productId = savedItem.productId;
        const matchingProduct = products.find(product => product.id === productId);

        if (!matchingProduct) {
            console.error(`Product not found: ${productId}`);
            return;
        }

        savedHTML += `
        <div class="saved-item">
            <img class="saved-item-img" src="${matchingProduct.image}">
            <div class="saved-item-details">
                <div class="saved-item-name">${matchingProduct.name}</div>
                <div class="saved-item-price">${formatMoney(matchingProduct.priceCents)}</div>
                <button class="saved-item-delete-button js-delete-button" data-product-id="${matchingProduct.id}">삭제</button>
            </div>
        </div>
        `;
    });

    container.innerHTML = savedHTML;

    document.querySelectorAll('.js-delete-button').forEach(button => {
        button.addEventListener('click', () => {
            const productId = button.dataset.productId;
            deleteFromSaved(productId);
            renderSavedItems();
        });
    });
}

document.addEventListener('DOMContentLoaded', () => {
    renderSavedItems();
});