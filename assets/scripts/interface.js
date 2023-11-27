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

//cart//



function createDeleteIcon() {
  const deleteCell = document.createElement('td');
  const deleteButton = document.createElement('button');

  const trashIcon = document.createElement('img');
  trashIcon.src = 'assets/brand/icons/svg/trash.svg'; 

  deleteButton.appendChild(trashIcon);
  deleteButton.classList.add('delete-button');
  deleteButton.addEventListener('click', function() {
    const row = this.closest('tr');
    row.remove(); 
  });

  deleteCell.appendChild(deleteButton);
  return deleteCell;
}

function createQuantityCell() {
  const quantityCell = document.createElement('td');
  quantityCell.classList.add('quantity-cell'); 

  const quantityValue = document.createElement('span');
  quantityValue.textContent = '1'; 
  quantityValue.classList.add('quantity-value');
  

  const decreaseButton = document.createElement('button');
  decreaseButton.textContent = '-';
  decreaseButton.classList.add('custom-decrease-button');
  decreaseButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityValue.textContent);
      if (currentValue > 1) {
          quantityValue.textContent = (currentValue - 1).toString();
      }
  });
  quantityCell.appendChild(decreaseButton);
  quantityCell.appendChild(quantityValue);

  const increaseButton = document.createElement('button');
  increaseButton.textContent = '+';
  increaseButton.classList.add('custom-increase-button');
  increaseButton.addEventListener('click', () => {
      let currentValue = parseInt(quantityValue.textContent);
      quantityValue.textContent = (currentValue + 1).toString();
  });
  quantityCell.appendChild(increaseButton);

  return quantityCell;
}


// Hàm điền dữ liệu vào bảng
function fillTableWithData(data) {
  data.forEach(item => {
      const row = document.createElement('tr');
    
      // Tạo và điền các ô dữ liệu vào hàng
      const productNameCell = document.createElement('td');
      productNameCell.textContent = item.name;
      row.appendChild(productNameCell);

      const priceCell = document.createElement('td');
      priceCell.textContent = item.price_sell.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      row.appendChild(priceCell);

      const quantityCell = createQuantityCell(); // Sử dụng hàm tạo cột số lượng
      row.appendChild(quantityCell);

      const totalCell = document.createElement('td');
      const total = (parseInt(quantityCell.firstChild.textContent) * item.price_sell) - item.price_sell; 
      totalCell.textContent = total.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' });
      row.appendChild(totalCell);

      const deleteCell = createDeleteIcon(); // Thêm cột biểu tượng thùng rác
      row.appendChild(deleteCell);

      tableBody.appendChild(row);
  });
  applyColumnWidths();
}

const tableBody = document.getElementById('table-body');
function applyColumnWidths() {
  const headerColumns = document.querySelectorAll('.head-table th');

  // Lấy số lượng cột trong tiêu đề
  const numOfColumns = headerColumns.length;

  const dataRows = document.querySelectorAll('.product-table tbody tr');
  dataRows.forEach(row => {
    const dataColumns = row.querySelectorAll('td');

    dataColumns.forEach((column, index) => {
      const width = window.getComputedStyle(headerColumns[index]).width;
      column.style.minWidth = width; // Sử dụng minWidth để ô dữ liệu có độ rộng tối thiểu tương đương với cột tiêu đề
    });

    // Đặt độ rộng cho ô cuối cùng (nút xóa), nếu cần thiết
    const deleteCell = row.querySelector('.delete-button');
    if (deleteCell) {
      deleteCell.style.minWidth = window.getComputedStyle(headerColumns[numOfColumns - 1]).width;
    }
  });
}

// Gọi hàm applyColumnWidths sau khi dữ liệu đã được thêm vào bảng
fetch('data/products.json')
  .then(response => response.json())
  .then(data => {
      fillTableWithData(data);
      applyColumnWidths(); // Áp dụng kích thước cột sau khi thêm dữ liệu vào bảng
  })
  .catch(error => {
      console.error('Error fetching data:', error);
  });







//cart//