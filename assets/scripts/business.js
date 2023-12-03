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
writeToStorage('receivers', '../../data/receivers.json');
let receiversList = getFromStorage('receivers');


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

// ACCOUNT
//----------------------------------------------------------------
const currentUser= JSON.parse(localStorage.getItem("currentUser"));

function showAccountInfo(){
    document.getElementById("user_fullName").value = currentUser.name;
    document.getElementById("user_number").value = currentUser.phone;
    document.getElementById("user_address").value = currentUser.address;
    document.getElementById("user_email").value = currentUser.email;
    document.getElementById("user_pass").value = currentUser.password;
    document.getElementById("user_checkpass").value = currentUser.password;
}
function showAccountOrder(){
    var iduser = currentUser.id;
    var filteredUseroder = ordersList.filter(item => item.id_user == iduser);
    const tableAccountInvoice = document.querySelector(".account-invoice-table__cont table");
    const tbodyAccountInvoice = tableAccountInvoice.querySelector("tbody");
    var cellTotal = 0;

    for (let i = 0; i < filteredUseroder.length; i++) {
        let row = tbodyAccountInvoice.insertRow();
        row.classList.add('table__data','canhover');

        for (let j = 0; j < filteredUseroder[i].products_order.length; j++) {
            cellTotal = filteredUseroder[i].products_order[j].price_sell * filteredUseroder[i].products_order[j].quantity;
            row.setAttribute('id', `account-order-${filteredUseroder[i].id}`)
            row.innerHTML = `
            <td><div class="body2">${filteredUseroder[i].day_order}</div></td>
            <td><div class="body2">${filteredUseroder[i].id}</div></td>
            <td><div class="subtitle2">${cellTotal}đ</div></td>
            `;
        }

        row.addEventListener("click", function () {
            // Chuyển trang
            clearMainBody();
            siteAccountOrder.classList.remove("hidden");
    
            // Fill data
            let receiverID = filteredUseroder[i].id_receiver;
            let filteredReceiver = receiversList.filter(item => item.id_receiver == receiverID);
            document.querySelector(".address-card__receiver").textContent = filteredReceiver[0].name;
            document.querySelector(".address-card__address").textContent = filteredReceiver[0].address;
            document.querySelector(".address-card__phonenumber").textContent = filteredReceiver[0].phone;
    
            // Fill table
            let tableAccountInvoiceDetail = document.querySelector(".account-order-detail-table__cont table");
            let tbodyAccountInvoiceDetail = tableAccountInvoiceDetail.querySelector("tbody");
            console.log(filteredUseroder[i].products_order);
            for(let k =0; k < filteredUseroder[i].products_order.length; k++){
                let row = tbodyAccountInvoiceDetail.insertRow();
                row.classList.add('table__data');
                let cellTotal = filteredUseroder[i].products_order[k].price_sell * filteredUseroder[i].products_order[k].quantity;
                var filteredProductOrder = productsList.filter(item => item.id == filteredUseroder[i].products_order[k].id);
                row.innerHTML = `
                <tr class="table__data">
                    <td class="product__info">
                        <img src="${filteredProductOrder[0].thumbnail_stack[0]}" onerror="handleErrorPrdThumbnail(this)" alt="">
                        <div class="product__info--detail">
                            <div class="product__name subtitle2">${filteredProductOrder[0].name}</div>
                            <div class="product__info--order body2">
                                <p class="body2">Màu sắc: </p><div class="color-dot" style="background: ${filteredUseroder[i].products_order[k].colors};"></div><p></p>
                            </div>
                        </div>
                    </td>
                    <td><div class="body2">${filteredUseroder[i].products_order[k].price_sell}đ</div></td>
                    <td><p class="body2">${filteredUseroder[i].products_order[k].quantity}</p></td>
                    <td><div class="subtitle2 cellTotal">${cellTotal}đ</div></td>
                </tr>
                `;
            }
            showAccountOrderDetailPrice(0);
        });
    }
}
function showAccountOrderDetailPrice(shippingPrice){
    let paymentTotalTempValue = 0;
    const cellTotals = document.querySelectorAll(".account-order-detail-table__cont .cellTotal");
    for (let i = 0; i < cellTotals.length; i++) {
        let value = cellTotals[i].textContent.match(/\d+/)[0];
        paymentTotalTempValue += parseInt(value);
    }

    document.querySelector(".payment-card__total-temp--number").innerText = paymentTotalTempValue + "đ";
    document.querySelector(".payment-card__shipping--number").innerText = shippingPrice + "đ";
    let paymentTotalValue = paymentTotalTempValue + shippingPrice;
    document.querySelector(".account-order__resume .total-label").innerText = paymentTotalValue + "đ";

}

if (currentUser) {
    showAccountInfo();
    showAccountOrder();
    

    var checkupdateInput = document.getElementById("Components_Button_Medium");
    function updateUserInfo() {
        // Get updated values from input fields
        const updatedFullName = document.getElementById("user_fullName").value;
        const updatedPhoneNumber = document.getElementById("user_number").value;
        const updatedEmail = document.getElementById("user_email").value;
        const updatedpass = document.getElementById("user_pass").value;
        const updatedcheckpass = document.getElementById("user_checkpass").value;
        const updatedaddress = document.getElementById("user_address").value;
        if(updatedpass == updatedcheckpass )
        {
            // Update user info in local storage
        currentUser.name = updatedFullName;
        currentUser.phone = updatedPhoneNumber;
        currentUser.email = updatedEmail;
        currentUser.address = updatedaddress;
        currentUser.password = updatedpass ;
        localStorage.setItem("currentUser", JSON.stringify(currentUser));

        // Display updated user info in input fields
        document.getElementById("user_fullName").value = updatedFullName;
        document.getElementById("user_number").value = updatedPhoneNumber;
        document.getElementById("user_email").value = updatedEmail;
        document.getElementById("user_address").value = updatedaddress;
        document.getElementById("user_pass").value = updatedpass;
        document.getElementById("user_checkpass").value = updatedcheckpass;

        alert("dữ liệu đã được cập nhật");
        }
        else {
            alert("Xác nhận mật khẩu không đúng");
        }
    }
    checkupdateInput.addEventListener('click', function(){
        updateUserInfo();
    })

  }
//----------------------------------------------------------------
// ACCOUNT