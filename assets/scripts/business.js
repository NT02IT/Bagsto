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
    const data = JSON.parse(storedData);
    return data;
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
writeToStorage('carts', '../../data/carts.json');
let cartsList = getFromStorage('carts');
//----------------------------------------------------------------
// DATA INIT

// PRODUCT DISPLAY
//----------------------------------------------------------------
const itemsPerPage = 12;
const maxPaginationItem = 5;
let productItems;
let selectedProduct;
function displayProducts(htmlContainer, productList, currentPage){
    htmlContainer.innerHTML = "";
    const start = (currentPage - 1) * itemsPerPage;
    const end = start + itemsPerPage;
    const itemsToDisplay = productList.slice(start, end);

    for (const item of itemsToDisplay) {
        console.log()
        const prdItem = document.createElement("li");
        prdItem.classList.add("product-card", "col-3");
        prdItem.innerHTML = `
            <div class="product-card__cont">
                <img src="${item.thumbnail_stack[0]}" onerror="handleErrorPrdThumbnail(this)" alt="${item.name}" class="product__thumbnail">
                <div class="product__info">
                    <h6 class="product__name">${item.name}</h6>
                    <div class="stack">
                        <div class="product__color-utility">
                            <p>Giá: </p>
                        <!-- <div class="color-utility"></div>
                            <div class="color-utility"></div>
                            <div class="color-utility"></div> -->
                        </div>
                        <!-- <div class="product__price--raw subtitle2 font-line_through">${item.price_sell}đ</div> -->
                        <div class="product__price--sale subtitle1">${item.price_sell}đ</div>
                    </div>
                    <button class="btn-add-prd"><i class="icon-add_shopping_cart"></i>Thêm vào giỏ</button>
                </div>
            </div>
        `;
        htmlContainer.appendChild(prdItem);
    }  
    productItems = htmlContainer.querySelectorAll('.product-card__cont');
    for (let i=0; i<productItems.length; i++){
        productItems[i].addEventListener('click', () =>{
            for (let j = 0; j < sitesMainBody.length; j++) {
                resetNavbar();
                sitesMainBody[j].classList.add('hidden');
            }
            siteProductDetail.classList.remove('hidden');
            localStorage.setItem('selectedProduct', JSON.stringify(productList[start+i]));
            viewProductDetail(productList[start+i]);
        });
        productItems[i].querySelector('.btn-add-prd').addEventListener('click', (e) => {
            e.stopPropagation();
            localStorage.setItem('selectedProduct', JSON.stringify(productList[start+i]));
            addToCartHandler();
        });
    }
}

function viewProductDetail(product){
    document.querySelector('.product-info-head .product-name').innerText = product.name;
    document.querySelector('.product-price-stack .sale-price').innerText = product.price_sell + "đ";
    document.querySelector('.product-introduce').innerText = product.description;
    document.getElementById('breadcrumb-product-detail').innerText = product.name;
    const activeImg = document.querySelector('.product-thumbnail-slider .active-img');
    activeImg.src = product.thumbnail_stack[0];
    const inactiveImgStack = document.querySelector('.product-thumbnail-slider .stack');
    inactiveImgStack.innerHTML = `<img src="${product.thumbnail_stack[0]}" onerror="handleErrorPrdThumbnail(this)" alt="" class="inactive-img selected">`;
    for(let i=1; i < product.thumbnail_stack.length; i++){
        inactiveImgStack.innerHTML += `
        <img src="${product.thumbnail_stack[i]}" onerror="handleErrorPrdThumbnail(this)" alt="" class="inactive-img">
        `;
    }

    const inactiveImgs = document.querySelectorAll('.product-thumbnail-slider .stack .inactive-img');
    const tempActiveImg = activeImg;
    for(let i=0; i < inactiveImgs.length; i++){
        inactiveImgs[i].addEventListener("click", ()=>{
            for(let j=0; j < inactiveImgs.length; j++){
                inactiveImgs[j].classList.remove('selected');
            }
            inactiveImgs[i].classList.add('selected');
            activeImg.src = inactiveImgs[i].src;
        })
    }

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

headerTab1.addEventListener('click', () => {
    if (!headerTab1.classList.contains('active')) {
      resetNavbar();
      if (!headerTab1.classList.contains('active'))
        headerTab1.classList.add('active');
      clearMainBody();
      if (siteProduct.classList.contains('hidden')) {
        siteProduct.classList.remove('hidden');
        siteProduct.classList.add('product-balo')
      }
    }
    let baloList = productList.filter(item => item.category == "Balo");
    currentPage_Product = 1;
    displayProducts(prdItems_Product, baloList, currentPage_Product);
    updatePaginationOfProducts(prdItems_Product, baloList, pagination_Product, currentPage_Product);
  })
  headerTab2.addEventListener('click', () => {
    if (!headerTab2.classList.contains('active')) {
      resetNavbar();
      if (!headerTab2.classList.contains('active'))
        headerTab2.classList.add('active');
      clearMainBody();
      if (siteProduct.classList.contains('hidden')) {
        siteProduct.classList.remove('hidden');
        siteProduct.classList.add('product-tuixach')
      }
    }
    let tuiList = productList.filter(item => item.category == "tui");
    currentPage_Product = 1;
    displayProducts(prdItems_Product, tuiList, currentPage_Product);
    updatePaginationOfProducts(prdItems_Product, tuiList, pagination_Product, currentPage_Product);
  })
  headerTab3.addEventListener('click', () => {
    if (!headerTab3.classList.contains('active')) {
      resetNavbar();
      if (!headerTab3.classList.contains('active'))
        headerTab3.classList.add('active');
      clearMainBody();
      if (siteProduct.classList.contains('hidden')) {
        siteProduct.classList.remove('hidden');
        siteProduct.classList.add('product-tuixach')
      }
    }
    let viList = productList.filter(item => item.category == "vi");
    currentPage_Product = 1;
    displayProducts(prdItems_Product, viList, currentPage_Product);
    updatePaginationOfProducts(prdItems_Product, viList, pagination_Product, currentPage_Product);
  })
//----------------------------------------------------------------
// PRODUCTS SITE

// SEARCH PRODUCT
//----------------------------------------------------------------
let productRepo = [];
for(let i = 0; i < productList.length; i++) {
    productRepo.push({
        "product" : productList[i],
        "pattern" : productList[i].category + " " + productList[i].for_gender + " " + productList[i].brand_name + " " + productList[i].name + " " + productList[i].description
    });
}

let searchInput = document.getElementById("header-search-feild");
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchProduct(searchInput.value.toUpperCase());
    }
});

function searchProduct(searchPattern) {
    let result = [];
    for (i = 0; i < productRepo.length; i++) {
        txtValue = productRepo[i].pattern;
        if (txtValue.toUpperCase().indexOf(searchPattern) > -1) {
            result.push(productRepo[i].product);
        }
    }
    resetNavbar();
    clearMainBody();
    siteProduct.classList.remove("hidden");
    console.log(result)
    let currentPage_Product = 1;
    displayProducts(prdItems_Product, result, currentPage_Product);
    updatePaginationOfProducts(prdItems_Product, result, pagination_Product, currentPage_Product);
}
//----------------------------------------------------------------
// SEARCH PRODUCT

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

const buttonAddToCart = document.getElementById('product-detail-addToCart');
buttonAddToCart.addEventListener('click', () =>{
    addToCartHandler();
});

function addToCartHandler(){
    let product = getFromStorage('selectedProduct');
    let productID = product.id;
    let productPrice = product.price_sell;
    let quantityOrder = document.getElementById('prd-detail-quantity').textContent;
    let orderDetail = {
        "id": productID,
        "colors" : "#000000",
        "price_sell" : productPrice,
        "quantity" : quantityOrder
    }
    localStorage.setItem('productOrder', JSON.stringify(orderDetail));

    //đọc giỏ hàng
    let iduser = currentUser.id;
    let filteredUserCart = cartsList.filter(item => item.id_user == iduser)[0];
    //check xem giỏ hàng có sản phẩm nào chưa -> chưa thì tạo key
    if(filteredUserCart){
        var index = cartsList.indexOf(filteredUserCart);
        //Còn thiếu việc check xem sản phẩm đã có trong giỏ chưa nếu có rr thì chỉ việc tăng số lượng lên, không add thêm item mới
        filteredUserCart.products_order.push(orderDetail);
        cartsList[index] = filteredUserCart;
    } else{
        let userCart = {
            "id": "CA" + IDGenerate(),
            "id_user": currentUser.id,
            "products_order": [orderDetail]
        }
        cartsList.push(userCart);
    }
    localStorage.setItem('carts', JSON.stringify(cartsList));
    alert (`Bạn đã thêm thành công ${quantityOrder} sản phẩm vào giỏ hàng`);
}
//----------------------------------------------------------------
// PRODUCT DETAIL

// CART
//----------------------------------------------------------------
function showCart(){
    let iduser = currentUser.id;
    let filteredUserCart = cartsList.filter(item => item.id_user == iduser)[0];
    const tableCart = document.querySelector(".cart-table__cont table");
    const tbodyCart = tableCart.querySelector("tbody");
    tbodyCart.innerHTML = `
        <tr class="table__header subtitle1">
            <th>Sản phẩm</th>
            <th>Đơn giá</th>
            <th>Số lượng</th>
            <th>Thành tiền</th>
            <th></th>
        </tr>            
    `;
    for (let j = 0; j < filteredUserCart.products_order.length; j++) {
        let row = tbodyCart.insertRow();
        row.classList.add('table__data');
        let filteredProduct = productList.filter(item => item.id == filteredUserCart.products_order[j].id)[0];
        let cellTotal = filteredProduct.price_sell * filteredUserCart.products_order[j].quantity;
        row.innerHTML = `
            <td class="product__info">
                <img src="${filteredProduct.thumbnail_stack[0]}" onerror="handleErrorPrdThumbnail(this)" alt="">
                <div class="product__info--detail">
                    <div class="product__name subtitle2">${filteredProduct.name}</div>
                    <!--<div class="product__info--order body2">
                        <p class="body2">Kích thước: <strong class="size">S</strong></p>
                        <br>
                        <p class="body2">Màu sắc: <div class="color-dot"></div></p>
                    </div>-->
                </div>
            </td>
            <td>
                <div class="body2">${filteredProduct.price_sell}đ</div>
            </td>
            <td>
                <div class="body2">
                    <div class="quantity-btn-group">
                        <button><i class="icon-minus"></i></button>
                        <button>${filteredUserCart.products_order[j].quantity}</button>
                        <button><i class="icon-plus"></i></button>
                    </div>
                    <div></div>
                </div>
            </td>
            <td>
                <div class="subtitle2 cart-cell-total">${cellTotal}đ</div>
            </td>
            <td>
                <button class="type-inherit style-text delete-btn"><i class="icon-trash"></i></button>
            </td>
        `;
    }
    showCartResume();
}

function showCartResume(){
    const cartSubtotalPrice = document.getElementById('cartSubtotalPrice');
    const cartShippingPrice = document.getElementById('cartShippingPrice');
    const cartSumPrice = document.getElementById('cartSumPrice');
    const allCartCellTotal = document.getElementsByClassName('cart-cell-total'); 

    let cartSubtotalPriceValue = 0;
    let cartShippingPriceValue = 0;
    for(let i = 0; i < allCartCellTotal.length; i++){
        let value = allCartCellTotal[i].innerText.match(/\d+/)[0];
        cartSubtotalPriceValue += parseInt(value);
    }
    let cartSumPriceValue = cartSubtotalPriceValue + cartShippingPriceValue;
    cartSubtotalPrice.textContent = cartSubtotalPriceValue + "đ";
    cartShippingPrice.textContent = cartShippingPriceValue + "đ";
    cartSumPrice.textContent = cartSumPriceValue + "đ";
}

const cartBtn = document.getElementById('header-cart');
cartBtn.onclick = function () {
    resetNavbar();
    clearMainBody();
    document.getElementById("cart-page").classList.remove("hidden");
    
    //Render data
    showCart();
    const RowOrderProductInCart = document.querySelectorAll('.cart-table tr');
    let BtnDeleteOrderProductInCart = document.querySelectorAll('.cart-table .delete-btn')
    for(let i=0; i<BtnDeleteOrderProductInCart.length; i++) {
        BtnDeleteOrderProductInCart[i].addEventListener('click', ()=>{
            RowOrderProductInCart[i+1].remove();
            showCartResume();
    
            let iduser = currentUser.id;
            let filteredUserCart = cartsList.filter(item => item.id_user == iduser)[0];
            var index = cartsList.indexOf(filteredUserCart);
            filteredUserCart.products_order.splice(i, 1);
            cartsList[index] = filteredUserCart;
            localStorage.setItem('carts', JSON.stringify(cartsList));
        });
    }
};

const cartCheckoutButton = document.getElementById('cart-checkout-btn');
cartCheckoutButton.addEventListener("click", () => {
    clearMainBody();
    siteCheckoutAddress.classList.remove('hidden');
    
    const cartSubtotalPrice = document.getElementById('cartSubtotalPriceAdd');
    const cartShippingPrice = document.getElementById('cartShippingPriceAdd');
    const cartSumPrice = document.getElementById('cartSumPriceAdd');

    let cartSubtotalPriceValue = 0;
    let cartShippingPriceValue = 0;

    let accountOrder = cartsList.filter(c => c.id_user == currentUser.id)[0].products_order;

    for(let i = 0; i < accountOrder.length; i++){
        cartSubtotalPriceValue += accountOrder[i].price_sell * accountOrder[i].quantity;
    }
    let cartSumPriceValue = cartSubtotalPriceValue + cartShippingPriceValue;
    cartSubtotalPrice.textContent = cartSubtotalPriceValue + "đ";
    cartShippingPrice.textContent = cartShippingPriceValue + "đ";
    cartSumPrice.textContent = cartSumPriceValue + "đ";
})
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
                            <!--<div class="product__info--order body2">
                                <p class="body2">Màu sắc: </p><div class="color-dot" style="background: ${filteredUseroder[i].products_order[k].colors};"></div><p></p>
                            </div>-->
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
}

var checkupdateInput = document.getElementById("account-info-update");
function updateUserInfo() {
    // Get updated values from input fields
    const updatedFullName = document.getElementById("user_fullName").value;
    const updatedPhoneNumber = document.getElementById("user_number").value;
    const updatedEmail = document.getElementById("user_email").value;
    const updatedpass = document.getElementById("user_pass").value;
    const updatedcheckpass = document.getElementById("user_checkpass").value;
    const updatedaddress = document.getElementById("user_address").value;
    if(updatedpass == updatedcheckpass ){
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

        alert("Dữ liệu đã được cập nhật");
    } else {
        alert("Xác nhận mật khẩu không đúng");
    }
    location.reload();
}
checkupdateInput.addEventListener('click', function(){
    updateUserInfo();
})

//Thay đổi avatar
function changeAvatarImg() {
    let input = document.getElementById("image-input-Avatar");
  
    // Lấy tên của tệp
    var fileName = input.files[0].name;
    console.log("Tên của tệp: " + fileName);
    let urlNewAvatar = "./data/avatar/" + fileName;
    currentUser.avatar = urlNewAvatar;
  
    // Kiểm tra xem người dùng đã chọn hình ảnh chưa
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            accountInfoAvatar.src = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
  }
//----------------------------------------------------------------
// ACCOUNT

// CHECKOUT ADDRESS
//----------------------------------------------------------------
function showCustomerAddresses() {
    var listAddresses = document.getElementById('listAddresses');
    listAddresses.innerHTML = '';
    var isFirstDefaultAdded = false;
    
    let userReceiver = [];
    for(let i = 0; i < receiversList.length; i++) {
        if(receiversList[i].id_ruser_create == currentUser.id){
            userReceiver.push(receiversList[i]);
        }
    }
    console.log(userReceiver);

    userReceiver.forEach(function(customer, index) {
      var customerDiv = document.createElement('div');
      customerDiv.classList.add('customer-address');
  
      customerDiv.innerHTML = `
        <div class="customer-info">
          <p class="subtitle-1">${customer.name}</p>
          <p class="body2 customer-address-text">${customer.address}</p>
          <p class="body2 customer-phone">${customer.phone}</p>
        </div>
        <div class="button-on-address">
            <button class="deleteButton type-inherit size-m">Xóa</button>
            <button class="confirmButton type-primary style-soft size-m" id="">Giao đến địa chỉ này</button>
        </div>
      `;
      listAddresses.appendChild(customerDiv);
    })
}
showCustomerAddresses();
//----------------------------------------------------------------
// CHECKOUT ADDRESS