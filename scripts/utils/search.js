const searchButton = document.querySelector('.js-search-button');
const searchInput = document.querySelector('.js-search-input');
const searchBar = document.querySelector('.js-search-bar');
const searchClose = document.querySelector('.js-search-close');

searchButton.addEventListener('click',()=>{
    searchBar.classList.add('active');
    searchInput.focus();
})
searchClose.addEventListener('click',()=>{
    searchBar.classList.remove('active');
    searchInput.value = '';
})