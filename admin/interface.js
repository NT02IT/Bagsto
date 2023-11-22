// SIDE NAVIGATE
const mainBody = document.getElementById('main-body');
const headerLogo = document.getElementById('header-logo');
const footerLogo = document.getElementById('footer-logo');
const headerTab1 = document.getElementById('header-tab-admin1');
const headerTab2 = document.getElementById('header-tab-admin2');
const headerTab3 = document.getElementById('header-tab-admin3');

const siteAnalysis = document.getElementById('analysis-page');
headerLogo.addEventListener('click', () =>{
    resetNavbar();
    clearMainBody();
    siteAnalysis.classList.remove('hidden');
    headerTab1.classList.add('active');
})
footerLogo.addEventListener('click', () =>{
    resetNavbar();
    clearMainBody();
    siteAnalysis.classList.remove('hidden');
    headerTab1.classList.add('active');
})
headerTab1.addEventListener('click', () =>{
    if(!headerTab1.classList.contains('active')){
        resetNavbar();
        clearMainBody();
        headerTab1.classList.add('active');
        siteAnalysis.classList.remove('hidden');
    }
})

headerTab2.addEventListener('click', () =>{
    const siteInvoiceDetail = document.getElementById('invoice-detail-page');
    if(!headerTab2.classList.contains('active')){
        resetNavbar();
        clearMainBody();
        headerTab2.classList.add('active');
        siteInvoiceDetail.classList.remove('hidden');
    }
})

function resetNavbar(){
    const headerTabs = document.querySelectorAll('#header-admin .tab');
    for(let i = 0; i < headerTabs.length; i++){
        if(headerTabs[i].classList.contains('active'))
        headerTabs[i].classList.remove('active');
    }
}
function clearMainBody(){
    const sitesMainBody = document.querySelectorAll('[id$="-page"]');
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