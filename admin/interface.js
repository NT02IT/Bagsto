// SIDE NAVIGATE
const mainBody = document.getElementById('main-body');
const sitesMainBody = document.querySelectorAll('[id$="-page"]');
const headerLogo = document.getElementById('header-logo');
const footerLogo = document.getElementById('footer-logo');
const headerTab1 = document.getElementById('header-tab-admin1');
const headerTab2 = document.getElementById('header-tab-admin2');
const headerTab3 = document.getElementById('header-tab-admin3');

const siteIndex = document.getElementById('index-page');
const siteProduct = document.getElementById('product-page');

headerLogo.addEventListener('click', () =>{
    resetNavbar();
    clearMainBody();
    siteIndex.classList.remove('hidden');
})
footerLogo.addEventListener('click', () =>{
    resetNavbar();
    clearMainBody();
    siteIndex.classList.remove('hidden');
})
var currentPageBaloProduct = 1;
headerTab1.addEventListener('click', () =>{
    if(!headerTab1.classList.contains('active')){
        resetNavbar();
        if(!headerTab1.classList.contains('active'))
            headerTab1.classList.add('active');
        clearMainBody();
        if(siteProduct.classList.contains('hidden')){
            siteProduct.classList.remove('hidden');
            siteProduct.classList.add('product-balo')

            const prdItems_Product = document.querySelector("#product-page .products__items");
            const pagination_Product = document.getElementById('product-pagination-products');
            displayProducts(prdItems_Product, itemList, currentPageBaloProduct);
            updatePaginationOfProducts(prdItems_Product, itemList, pagination_Product, currentPageBaloProduct);
        }
    }
})

function resetNavbar(){
    if(headerTab1.classList.contains('active'))
        headerTab1.classList.remove('active');
    if(headerTab2.classList.contains('active'))
        headerTab2.classList.remove('active');
    if(headerTab3.classList.contains('active'))
        headerTab3.classList.remove('active');
}
function clearMainBody(){
    for(let i = 0; i < sitesMainBody.length; i++){
        sitesMainBody[i].classList.add('hidden');
    }
}
// SIDE NAVIGATE

// HEADER INTERFACE
const burgerBtn = document.getElementById('burger-btn')
const mobileNav = document.getElementById('mobile-nav')
const headerClientAvatar = document.querySelector('.header__avatar')
const accountPopover = document.querySelector('.account-popover')
burgerBtn.addEventListener('click', function(){
    mobileNav.classList.toggle('collapsed');
});

headerClientAvatar.addEventListener('click', function(){
    accountPopover.classList.toggle('collapsed');
});
// HEADER INTERFACE

document.addEventListener("click", function (event) {
    // Kiểm tra xem người dùng có bấm ra ngoài popup mobileNav không
    if (!burgerBtn.contains(event.target) && !mobileNav.contains(event.target)) {
      mobileNav.classList.add("collapsed");
    }
    // Kiểm tra xem người dùng có bấm ra ngoài popup accPopover không
    if (!headerClientAvatar.contains(event.target) && !accountPopover.contains(event.target)) {
      accountPopover.classList.add("collapsed");
    }
  });