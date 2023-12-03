// REGEX FORMAT
const emailFormat = /.*@.+/;
const numberFormat = /[0-9]/;
const lowercaseFormat = /[a-z]/;
const uppercaseFormat = /[A-Z]/;
const specialCharFormat = /[\!\@\#\$\%\^\&\*]/;
const phonenumFormat = /^0\d{8,10}$/;
// REGEX FORMAT

// DATA INIT
//----------------------------------------------------------------
function writeToStorage(key, valueUrl) {
    const storedData = localStorage.getItem(key);
    if (!storedData) {
        fetch(valueUrl)
            .then(response => response.json())
            .then(data => {
            localStorage.setItem(key, JSON.stringify(data));
            })
            .catch(error => console.error('Error reading JSON file:', error));
    }
}

function getFromStorage(key) {
  const storedData = localStorage.getItem(key);
  if (storedData) {
    const users = JSON.parse(storedData);
    return users;
  } else {
    // console.log('No data found in localStorage.');
    return null;
  }
}
writeToStorage('products', '../../data/products.json');
let productList = getFromStorage('products');
writeToStorage('users', '../../data/users.json');
let usersList = getFromStorage('users');
writeToStorage('orders', '../../data/orders.json');
let ordersList = getFromStorage('orders');
writeToStorage('products', '../../data/products.json');
let productsList = getFromStorage('products');


//----------------------------------------------------------------
// DATA INIT

// PRODUCT DISPLAY
//----------------------------------------------------------------
const itemsPerPage = 12;
const maxPaginationItem = 5;
let productItems;
function displayProducts(htmlContainer, productList, currentPage){
    htmlContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = productList.slice(start, end);

    for (const item of itemsToDisplay) {
        const prdItem = document.createElement("li");
        prdItem.classList.add("product-card", "col-3");
        prdItem.innerHTML = `
            <div class="product-card__cont">
                <img src=${item.thumbnail_stack[0]} onerror="handleErrorPrdThumbnail(this)" alt=${item.name} class="product__thumbnail">
                <div class="product__info">
                    <h6 class="product__name">${item.name}</h6>
                    <div class="stack">
                        <div class="product__color-utility">
                            <div class="color-utility"></div>
                            <div class="color-utility"></div>
                            <div class="color-utility"></div>
                        </div>
                        <div class="product__price--raw subtitle2 font-line_through">${item.price_sell}đ</div>
                        <div class="product__price--sale subtitle1">${item.price_sell}đ</div>
                    </div>
                    <button class="btn-add-prd"><i class="icon-add_shopping_cart"></i>Thêm vào giỏ</button>
                </div>
            </div>
        `;
        htmlContainer.appendChild(prdItem);
    }  
    
    productItems=htmlContainer.querySelectorAll('.product-card__cont');
    for (var i=0; i<productItems.length; i++){
        productItems[i].addEventListener('click', () =>{
            for (let i = 0; i < sitesMainBody.length; i++) {
                sitesMainBody[i].classList.add('hidden');
            }
            siteProductDetail.classList.remove('hidden');
        });
    }
}

function handleErrorPrdThumbnail(img){
    img.src = '..\\assets\\img\\product_placeholder.png';
}
// PRODUCT DISPLAY

// PAGINATION CONTROL
//----------------------------------------------------------------
function renderPrevBtnPagination(htmlContainer, productList, pagination, currentPage) {
    const previousBtn = document.createElement("li");    
    previousBtn.classList.add('pagination__btn-previous');
    if(currentPage === 1) previousBtn.classList.add('disable');
    previousBtn.innerHTML = `<i class="icon-chevron_left"></i>`;
    pagination.appendChild(previousBtn);

    if(!previousBtn.classList.contains('disable')){
        previousBtn.addEventListener('click', () =>{
            currentPage--;
            displayProducts(htmlContainer, productList, currentPage);
            updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
        });
    }
}

function renderNextBtnPagination(htmlContainer, productList, pagination, currentPage, totalPages){
    const nextBtn = document.createElement("li");
    nextBtn.classList.add('pagination__btn-next');
    if(currentPage == totalPages) nextBtn.classList.add('disable');
    nextBtn.innerHTML = `<i class="icon-chevron_right"></i>`;
    pagination.appendChild(nextBtn);
    if(!nextBtn.classList.contains('disable')){
        nextBtn.addEventListener('click', () =>{
            currentPage++;
            displayProducts(htmlContainer, productList, currentPage);
            updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
        });
    }
}

function renderBodyPagination(htmlContainer, productList, pagination, currentPage, paginationItemQuantity){
    for (let i = 1; i <= paginationItemQuantity; i++) {
        const li = document.createElement("li");
        li.textContent = i;
        li.classList.add("pagination__item");
        if (i === currentPage) {
            li.classList.add("selected");
        }
        li.addEventListener("click", () => {
            currentPage = i;
            displayProducts(htmlContainer, productList, currentPage);
            updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage);
        });
        pagination.appendChild(li);
    }  
}

function renderMoreBtnPagination(pagination){
    const moreBtn = document.createElement("li");
    moreBtn.classList.add('pagination__btn-previous', 'disabled');
    moreBtn.innerHTML = `...`;
    pagination.appendChild(moreBtn);
}

function updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage){
    pagination.innerHTML = "";
    const totalPages = Math.ceil(productList.length / itemsPerPage);
    if(productList.length <= itemsPerPage) return
    if(totalPages <= maxPaginationItem){
        renderPrevBtnPagination(htmlContainer, productList, pagination, currentPage);
        renderBodyPagination(htmlContainer, productList, pagination, currentPage, totalPages);
        renderNextBtnPagination(htmlContainer, productList, pagination, currentPage, totalPages);
    } else{
        renderPrevBtnPagination(htmlContainer, productList, pagination, currentPage);
        if(currentPage <= maxPaginationItem-2){
            renderBodyPagination(htmlContainer, productList, pagination, currentPage, maxPaginationItem-1);
            renderMoreBtnPagination(pagination);
        } else if(currentPage >= maxPaginationItem-1 && currentPage <= totalPages-(maxPaginationItem-2)){
            renderMoreBtnPagination(pagination);
            for (let i = currentPage - (maxPaginationItem-((maxPaginationItem%2)?4:5)); i <= currentPage + (maxPaginationItem-4); i++) {
                const li = document.createElement("li");
                li.textContent = i;
                li.classList.add("pagination__item");
                if (i === currentPage) {
                    li.classList.add("selected");
                }
                li.addEventListener("click", () => {
                    currentPage = i;
                    displayProducts(htmlContainer, productList, currentPage);
                    updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
                });
                pagination.appendChild(li);
            } 
            renderMoreBtnPagination(pagination);
        } else if(currentPage >= totalPages - (maxPaginationItem-3)){
            renderMoreBtnPagination(pagination);
            for (let i = totalPages - (maxPaginationItem-2); i <= totalPages; i++) {
                const li = document.createElement("li");
                li.textContent = i;
                li.classList.add("pagination__item");
                if (i === currentPage) {
                    li.classList.add("selected");
                }
                li.addEventListener("click", () => {
                    currentPage = i;
                    displayProducts(htmlContainer, productList, currentPage);
                    updatePaginationOfProducts(htmlContainer, productList, pagination, currentPage)
                });
                pagination.appendChild(li);
            } 
        }
        renderNextBtnPagination(htmlContainer, productList, pagination, currentPage, totalPages);
    }      
}
//----------------------------------------------------------------
// PAGINATION CONTROL

// INDEX SITE 
//----------------------------------------------------------------
var currentPage_Index = 1;
const prdItems_Index = document.querySelector("#index-page .products__items");
const pagination_Index = document.getElementById('index-pagination-products');
displayProducts(prdItems_Index, productList, currentPage_Index);
updatePaginationOfProducts(prdItems_Index, productList, pagination_Index, currentPage_Index);
//----------------------------------------------------------------
// INDEX SITE 

// PRODUCTS SITE
//----------------------------------------------------------------
var currentPage_Product = 1;
const prdItems_Product = document.querySelector("#product-page .products__items");
const pagination_Product = document.getElementById('product-pagination-products');
displayProducts(prdItems_Product, productList, currentPage_Product);
updatePaginationOfProducts(prdItems_Product, productList, pagination_Product, currentPage_Product);
//----------------------------------------------------------------
// PRODUCTS SITE

// PRODUCT DETAIL
//----------------------------------------------------------------
let totalPrdQuantity = 12;
const productOrderElement = document.getElementById('prd-detail-quantity');
const productQuantityRemain = document.getElementById('prd-detail-quantity-remain');
const addQuantityBtn = document.getElementById('prd-detail-add-quantity');
const subQuantityBtn = document.getElementById('prd-detail-sub-quantity');
let quantityPrdOrder = 1;
totalPrdQuantity--;
productQuantityRemain.innerText = `Còn lại ${totalPrdQuantity} sản phẩm`;
addQuantityBtn.addEventListener('click', () =>{
    if(quantityPrdOrder < totalPrdQuantity+quantityPrdOrder){
        quantityPrdOrder++;
        totalPrdQuantity--;
        productOrderElement.innerText = quantityPrdOrder;
        productQuantityRemain.innerText = `Còn lại ${totalPrdQuantity} sản phẩm`;
    }
});
subQuantityBtn.addEventListener('click', () =>{
    if(quantityPrdOrder > 0){
        quantityPrdOrder--;
        totalPrdQuantity++;
        productOrderElement.innerText = quantityPrdOrder;
        productQuantityRemain.innerText = `Còn lại ${totalPrdQuantity} sản phẩm`;
    }
});

//----------------------------------------------------------------
// PRODUCT DETAIL

// CART
//----------------------------------------------------------------
const BtnDeleteOrderProductInCart = document.querySelectorAll('.cart-table .delete-btn')
const RowOrderProductInCart = document.querySelectorAll('.cart-table tr');
for(let i=0; i<BtnDeleteOrderProductInCart.length; i++) {
    BtnDeleteOrderProductInCart[i].addEventListener('click', ()=>{
        RowOrderProductInCart[i+1].remove();
    });
}
//----------------------------------------------------------------
// CART

// AccountUser
const currentUser= JSON.parse(localStorage.getItem("currentUser"));
if (currentUser) {
    // Hiển thị thông tin trong các trường input
    document.getElementById("user_fullName").value = currentUser.name;
    document.getElementById("user_number").value = currentUser.phone;
    document.getElementById("user_address").value = currentUser.address;
    document.getElementById("user_email").value = currentUser.email;
    document.getElementById("user_pass").value = currentUser.password;
    document.getElementById("user_checkpass").value = currentUser.password;



    var iduser = currentUser.id;
    var filteredUseroder = ordersList.filter(item => item.id_user == iduser);
    var tbody = document.querySelector("#Table-info");
    var total = 0;
    
    for (var i = 0; i < filteredUseroder.length; i++) {
      var row = tbody.insertRow();
      var cell1 = row.insertCell(0);
      var cell2 = row.insertCell(1);
      var cell3 = row.insertCell(2);
      var cell4 = row.insertCell(3);
      var cell5 = row.insertCell(4);


    

      for(var j = 0;  j < filteredUseroder[i].products_order.length; j++ )
      {
        total = total + (filteredUseroder[i].products_order[j].price_sell * filteredUseroder[i].products_order[j].quantity);
      }

      // Lấy thể hiện của bảng
      var tableinfo = document.getElementById("Table-info");
    //   var tbody = tableinfo.getElementsByTagName("tbody")[0];

    //   // Lấy danh sách tất cả các dòng trong tbody của bảng
    //   var rows = tbody.getElementsByTagName("tr");

      // cell1.innerHTML = filteredUseroder[i].id;
      cell2.innerHTML = filteredUseroder[i].day_order;
      cell3.innerHTML = filteredUseroder[i].id;
      cell4.innerHTML = total;
      total = 0;

      cell1.className = 'Table_Row_Invoice';
      cell2.className = 'Table_Row_Invoice';
      cell3.className = 'Table_Row_Invoice';
      cell4.className = 'Table_Row_Invoice';


      row.addEventListener("click", function () {
        // Lấy dữ liệu từ các ô trong dòng được nhấp
        document.getElementById("AccountOrder").style.display = "block";
        var cells = this.getElementsByTagName("td");
       
        var hoaDon = cells[2].innerText;
        var giaTri = cells[3].innerText;

        // Hiển thị chi tiết đơn hàng trong bảng AccountOrder
        document.getElementById("account").style.display = "block";
        document.getElementById("AccountOrder").style.display = "block";
        document.getElementById("total").innerHTML = giaTri;
        document.getElementById("Oder-info-code").innerHTML = hoaDon;
        document.getElementById("Oder-info-Address").innerHTML = currentUser.address;

        // Hiển thị chi tiết đơn hàng trong bảng checkoutCart
        const checkoutCartTable = document.querySelector("#checkoutCart");
        // checkoutCartTable.innerHTML = ""; // Xóa nội dung cũ của bảng

        for (var k = 0; k < filteredUseroder.length; k++) {
            for (var l = 0; l < filteredUseroder[k].products_order.length; l++) {
                var checkoutRow = checkoutCartTable.insertRow();
                var checkoutCell1 = checkoutRow.insertCell(0);
                var checkoutCell2 = checkoutRow.insertCell(1);
                var checkoutCell3 = checkoutRow.insertCell(2);
                var checkoutCell4 = checkoutRow.insertCell(3);
        
                var productId = filteredUseroder[k].products_order[l].id;
        
                // Tìm sản phẩm trong mảng productList dựa trên productId
                var filteredProduct = productList.find(item => item.id === productId);
        
                if (filteredProduct) {
                    checkoutCell1.innerHTML = filteredProduct.name;
                    checkoutCell2.innerHTML = filteredUseroder[k].products_order[l].price_sell;
                    checkoutCell3.innerHTML = filteredUseroder[k].products_order[l].quantity;
                    checkoutCell4.innerHTML = (filteredUseroder[k].products_order[l].price_sell) * (filteredUseroder[k].products_order[l].quantity);
                } else {
                    console.log("Không tìm thấy sản phẩm với id:", productId);
                }
            }
        }
    });



    }


  }