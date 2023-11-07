const burgerBtn = document.getElementById('burger-btn')
const mobileNav = document.getElementById('mobile-nav')
const headerAvatar = document.querySelector('.header__avatar')
const accountPopover = document.querySelector('.account-popover')
const accPopoverCont = document.getElementById('account-popover-cont')
burgerBtn.addEventListener('click', function(){
    mobileNav.classList.toggle("expanded")
    mobileNav.classList.toggle("collapsed")
});

headerAvatar.addEventListener('click', function(){
    if(accountPopover.style.display == 'block'){
        accountPopover.style.display = 'none'
        accPopoverCont.style.display = 'none'
    }
    else{
        accountPopover.style.display = 'block'    
        accPopoverCont.style.display = 'block'
    } 
});