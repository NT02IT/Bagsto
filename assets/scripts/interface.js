// SIDE NAVIGATE
const mainBody = document.getElementById('main-body');
const sitesMainBody = document.querySelectorAll('[id$="-page"]');
const headerLogo = document.getElementById('header-logo');
const footerLogo = document.getElementById('footer-logo');
const headerTab1 = document.getElementById('header-tab-1');
const headerTab2 = document.getElementById('header-tab-2');
const headerTab3 = document.getElementById('header-tab-3');

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
const headerClientAvatar = document.querySelector('#header-client .header__avatar')
const accountPopover = document.querySelector('.account-popover')
burgerBtn.addEventListener('click', function(){
    mobileNav.classList.toggle('collapsed');
});

headerClientAvatar.addEventListener('click', function(){
    accountPopover.classList.toggle('collapsed');
});
// HEADER INTERFACE

const filterProductBtns = document.querySelectorAll('.action__filter');
// const filterCloseBtn = document.getElementById('btn-filter-close');
const filterPopover = document.getElementById('product-filter');
for(let i = 0; i < filterProductBtns.length; i++){
  const filterCloseBtn = document.querySelector('#btn-filter-close');
  filterCloseBtn.addEventListener('click', function(){
    filterPopover.classList.add('collapsed');
  });

  filterProductBtns[i].addEventListener("click", function () {
    filterPopover.classList.remove("collapsed");

    const deleteFilterOptionBtn = filterPopover.querySelector(".filter__action .delete");
    deleteFilterOptionBtn.addEventListener("click", () => {
      const prdFilterGenderList = filterPopover.querySelectorAll('.filter__gender input[type="checkbox"]');
      const prdFilterBrandList = filterPopover.querySelectorAll('.filter__brand input[type="checkbox"]');
      const prdFilterColorList = filterPopover.querySelectorAll('.filter__color input[type="checkbox"]');
      const prdFilterPriceList = filterPopover.querySelectorAll('.filter__price input[type="text"]');
      resetFilterOption(prdFilterGenderList);
      resetFilterOption(prdFilterBrandList);
      resetFilterOption(prdFilterColorList);
      for (let i = 0; i < prdFilterPriceList.length; i++) {
        prdFilterPriceList[i].value = "";
      }
    });
  });
}

// filterProductBtn.addEventListener('click', function(){
//     filterPopover.classList.remove('collapsed');

//     const prdFilterGenderList = filterPopover.querySelectorAll('.filter__gender input[type="checkbox"]')
//     const prdFilterBrandList = filterPopover.querySelectorAll('.filter__brand input[type="checkbox"]')
//     const prdFilterColorList = filterPopover.querySelectorAll('.filter__color input[type="checkbox"]')
//     const prdFilterPriceList = filterPopover.querySelectorAll('.filter__price input[type="text"]')
//     const deleteFilterOptionBtn = filterPopover.querySelector('.filter__action .delete')
//     deleteFilterOptionBtn.addEventListener('click', () => {
//         resetFilterOption(prdFilterGenderList);
//         resetFilterOption(prdFilterBrandList);
//         resetFilterOption(prdFilterColorList);
//         for(let i = 0; i < prdFilterPriceList.length; i++){
//             prdFilterPriceList[i].value = ""
//         }
//     });
// });
// filterCloseBtn.addEventListener('click', function(){
//     filterPopover.classList.add('collapsed');
// });

// const filterProductBtns = document.querySelectorAll('.action__filter');
// const filterPopovers = document.querySelectorAll("[id^='product-filter']");
// for (let i = 0; i < filterProductBtns.length; i++) {
//   console.log(i);

//   const filterCloseBtns = document.querySelectorAll('#btn-filter-close');
//   filterCloseBtns[i].addEventListener('click', function(){
//     filterPopovers[i].classList.add('collapsed');
//   });

//   filterProductBtns[i].addEventListener("click", function () {
//     filterPopovers[i].classList.remove("collapsed");

//     const prdFilterGenderList = filterPopovers[i].querySelectorAll('.filter__gender input[type="checkbox"]');
//     const prdFilterBrandList = filterPopovers[i].querySelectorAll('.filter__brand input[type="checkbox"]');
//     const prdFilterColorList = filterPopovers[i].querySelectorAll('.filter__color input[type="checkbox"]');
//     const prdFilterPriceList = filterPopovers[i].querySelectorAll('.filter__price input[type="text"]');
//     const deleteFilterOptionBtn = filterPopovers[i].querySelector(".filter__action .delete");
//     deleteFilterOptionBtn.addEventListener("click", () => {
//       resetFilterOption(prdFilterGenderList);
//       resetFilterOption(prdFilterBrandList);
//       resetFilterOption(prdFilterColorList);
//       for (let i = 0; i < prdFilterPriceList.length; i++) {
//         prdFilterPriceList[i].value = "";
//       }
//     });
//   });
// }

function resetFilterOption(listOption){
    for(let i=0; i<listOption.length; i++){
        listOption[i].checked = false;
    }
}

const sortProductBtns = document.querySelectorAll('.action__sort');
const sortProductPopovers = document.querySelectorAll('.sort-popover')
for(let i = 0; i < sortProductPopovers.length; i++){
  sortProductBtns[i].addEventListener('click', function(){
      sortProductPopovers[i].classList.toggle('hidden');
  });
}

const filterPopoverProduct = document.querySelector('.filter-desktop');
const deleteFilterOptionBtnProductPage = document.querySelector('.filter-desktop .filter__action > button.type-inherit');
deleteFilterOptionBtnProductPage.addEventListener('click', function(){
  const prdFilterGenderList = filterPopoverProduct.querySelectorAll('.filter__gender input[type="checkbox"]');
  const prdFilterBrandList = filterPopoverProduct.querySelectorAll('.filter__brand input[type="checkbox"]');
  const prdFilterColorList = filterPopoverProduct.querySelectorAll('.filter__color input[type="checkbox"]');
  const prdFilterPriceList = filterPopoverProduct.querySelectorAll('.filter__price input[type="text"]');
  resetFilterOption(prdFilterGenderList);
  resetFilterOption(prdFilterBrandList);
  resetFilterOption(prdFilterColorList);
  for (let i = 0; i < prdFilterPriceList.length; i++) {
    prdFilterPriceList[i].value = "";
  }
});


document.addEventListener("click", function (event) {
  // Kiểm tra xem người dùng có bấm ra ngoài popup mobileNav không
  if (!burgerBtn.contains(event.target) && !mobileNav.contains(event.target)) {
    mobileNav.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup accPopover không
  if (!headerClientAvatar.contains(event.target) && !accountPopover.contains(event.target)) {
    accountPopover.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup productFilterPopover không
  check = true;
  for(let i = 0; i < filterProductBtns.length; i++) {
    if (filterProductBtns[i].contains(event.target)) {
      check = false;
    }
  }
  if (check && !filterPopover.contains(event.target)) {
    filterPopover.classList.add("collapsed");
  }
  // Kiểm tra xem người dùng có bấm ra ngoài popup sortProductPopover không
  for(let i = 0; i < sortProductPopovers.length; i++) {
    if (!sortProductBtns[i].contains(event.target) && !sortProductPopovers[i].contains(event.target)) {
      sortProductPopovers[i].classList.add("hidden");
    }
  }
});





//checkout//
    
// })
document.addEventListener('DOMContentLoaded', function() {
  let data;
  function showCustomerAddresses() {
    var listAddresses = document.getElementById('listAddresses');
    listAddresses.innerHTML = '';

    fetch('data/receivers.json')
      .then(response => response.json())
      .then(data => {
        var isFirstDefaultAdded = false;

        data.slice(0, 4).forEach(function(customer, index) {
          var customerDiv = document.createElement('div');
          customerDiv.classList.add('customer-address');

          var namePara = document.createElement('p');
          namePara.classList.add('customer-info', 'customer-name');
          namePara.textContent = `${customer.name}`;

          var addressPara = document.createElement('p');
          addressPara.classList.add('customer-info', 'customer-address-text');
          addressPara.textContent = `${customer.address}`;

          var phonePara = document.createElement('p');
          phonePara.classList.add('customer-info', 'customer-phone');
          phonePara.textContent = `${customer.phone}`;

          var buttonContainer = document.createElement('div');
          buttonContainer.classList.add('button-on-address');

          var confirmButton = document.createElement('button');
          confirmButton.classList.add('confirmButton')
          confirmButton.textContent = 'Giao đến địa chỉ này';
        
          var defaultLabel = document.createElement('span');
          defaultLabel.classList.add('default-label');
          defaultLabel.textContent = 'Mặc định';
          if (customer.default && !isFirstDefaultAdded) {
            defaultLabel.style.color = 'lightblue';
            namePara.appendChild(defaultLabel);
            isFirstDefaultAdded = true;
          }

          var deleteButton = document.createElement('button');
          deleteButton.classList.add('deleteButton');
          deleteButton.textContent = 'Xóa';
          deleteButton.addEventListener('click', function() {
            var addressToDelete = this.closest('.customer-address');
            addressToDelete.remove();
          }); 

          buttonContainer.appendChild(deleteButton);
          buttonContainer.appendChild(confirmButton);
          customerDiv.appendChild(namePara);
          customerDiv.appendChild(addressPara);
          customerDiv.appendChild(phonePara);
          customerDiv.appendChild(buttonContainer);

          listAddresses.appendChild(customerDiv);
        });
      })
      .catch(error => {
        console.error('Error fetching data:', error);
      });
  }

  showCustomerAddresses();
  
});

document.addEventListener('DOMContentLoaded', function () {
  const checkoutAddress = document.getElementById('checkoutAddress');
  const checkoutPayment = document.getElementById('checkoutPayment');
  const checkoutSuccess = document.getElementById('checkoutSuccess');
  const mainbody = document.querySelector("#index-page");
  const bodyCheckout = document.querySelector("#checkoutPayment");
  const buttonBackMain = document.querySelector("#backHomePageButton");
  const continueShoppingButton = document.querySelector("#paymentSuccessButton");
  const backToAddressButton = document.getElementById('backButton');

  document.getElementById('listAddresses').addEventListener('click', function (event) {
    if (event.target.classList.contains('confirmButton')) {
      checkoutAddress.classList.add('hidden');
      checkoutPayment.classList.remove('hidden');
      document.querySelector('.step-two .step-circle').classList.add('step-circle-active');
    }
  });

  const paymentButton = document.getElementById('paymentButton');
  paymentButton.addEventListener('click', function() {
    checkoutPayment.classList.add('hidden');
    checkoutSuccess.classList.remove('hidden');
  });

  buttonBackMain.addEventListener('click', () =>{
    mainbody.classList.remove('hidden');
    bodyCheckout.classList.add('hidden');
    checkoutSuccess.classList.add('hidden'); 
  });

  continueShoppingButton.addEventListener('click', () => {
    mainbody.classList.remove('hidden');
    checkoutSuccess.classList.add('hidden'); 
  });
  backToAddressButton.addEventListener('click', function () {
    checkoutPayment.classList.add('hidden');
    checkoutAddress.classList.remove('hidden');
  });
});


document.addEventListener('DOMContentLoaded', function() {
  const optionTransports = document.querySelectorAll('.option-transport');

  optionTransports.forEach(option => {
      option.addEventListener('click', function(event) {
          const radioBtn = option.querySelector('input[type="radio"]');
          if (!radioBtn.checked) {
              radioBtn.checked = true;
          }
      });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const optionTransports = document.querySelectorAll('.option-payment');

  optionTransports.forEach(option => {
      option.addEventListener('click', function(event) {
          const radioBtn = option.querySelector('input[type="radio"]');
          if (!radioBtn.checked) {
              radioBtn.checked = true;
          }
      });
  });
});





//checkout//




/*checkoutpayment*/
document.addEventListener('DOMContentLoaded', function() {
  const customRadios = document.querySelectorAll('.custom-radio');

  customRadios.forEach(customRadio => {
    customRadio.addEventListener('change', function() {
      const radioLabel = this.nextElementSibling.querySelector('label');
      if (this.checked) {
        radioLabel.style.backgroundColor = '#4CAF50'; 
      } else {
        radioLabel.style.backgroundColor = ''; 
      }
    });
  });
});

document.addEventListener('DOMContentLoaded', function() {
  const listAddresses = document.getElementById('listAddresses');
  const contentAddress = document.getElementById('contentAddress');
  const editAddressButton = document.querySelector('.edit-address .edit-button');

  // Lấy danh sách các địa chỉ
  const addresses = listAddresses.querySelectorAll('.customer-address');

  // Kiểm tra xem danh sách có địa chỉ hay không và lấy địa chỉ đầu tiên
  if (addresses.length > 0) {
      const firstAddressData = addresses[0].innerHTML;

      // Gán dữ liệu vào contentAddress
      contentAddress.innerHTML = firstAddressData;

      // Thêm sự kiện khi click vào nút "Chỉnh sửa"
      editAddressButton.addEventListener('click', function() {
          // Hiển thị địa chỉ đầu tiên khi click vào nút "Chỉnh sửa"
          contentAddress.innerHTML = firstAddressData;
      });
  }
});



/*checkoutpayment*/