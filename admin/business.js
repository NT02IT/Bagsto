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
writeToStorage('promotions','../data/promotions.json');
let promotionsList = getFromStorage('promotions');
writeToStorage('shipping_types','../data/shipping_types.json')
let kindOfShipping = getFromStorage('shipping_types')
//----------------------------------------------------------------
// DATA INIT

// VALIDATE DATA
//----------------------------------------------------------------
const realNumbers =/^\d+(\.\d+)?$/;
function checkPriceImport(kt){
    if (kt===0){
        var PriceImportTextField = document.getElementById('PriceImport-textField').value;
        var errorElement = document.getElementById('error--ProductPriceImport');
    }else{
        var PriceImportTextField = document.getElementById('DetailProduct__PriceImport-textField').value;
        var errorElement = document.getElementById('error--ProductPriceImport--detail');
    }
    if (!realNumbers.test(PriceImportTextField)){
        errorElement.innerHTML ='Giá nhập vui lòng điền số thực không âm.'
        return false;
    }
    errorElement.innerHTML='';
    return true;
}
function checkPriceSell(kt){
    if (kt===0){
        var PriceExportTextField = document.getElementById('PriceExport-textField').value;
        var errorElement = document.getElementById('error--ProductPriceSell');
    }else{
        var PriceExportTextField = document.getElementById('DetailProduct__PriceExport-textField').value;
        var errorElement = document.getElementById('error--ProductPriceSell--detail');
    }
    if (!realNumbers.test(PriceExportTextField)){
        errorElement.innerHTML ='Giá bán vui lòng điền số thực không âm.'
        return false;
    }
    errorElement.innerHTML='';
    return true;
}

const naturalNumbers =/^\d+$/;
function checkAmount(kt){
    if (kt===0){
        var detailProductAmountTextField = document.getElementById('Amount-textField').value;
        var errorElement = document.getElementById('error--ProductAmount');
    }else{
        var detailProductAmountTextField = document.getElementById('DetailProduct__Amount-textField').value;
        var errorElement = document.getElementById('error--ProductAmount--detail');
    }
    if (!naturalNumbers.test(detailProductAmountTextField)){
        errorElement.innerHTML ='Số lượng vui lòng nhập số tự nhiên.'
        return false;
    }
    errorElement.innerHTML='';
    return true;
}
//----------------------------------------------------------------
// VALIDATE DATA

// STATISTIC ADMIN
//----------------------------------------------------------------
let totalProductSelled = 0;
for(let i = 0; i < ordersList.length; i++){
    for(let j = 0; j <  ordersList[i].products_order.length; j++){
        totalProductSelled += parseInt(ordersList[i].products_order[j].quantity);
    }
}
document.getElementById('totalProductSelled').textContent = totalProductSelled;

let totalIncome = 0;
for(let i = 0; i < ordersList.length; i++){
    for(let j = 0; j <  ordersList[i].products_order.length; j++){
        totalIncome += parseInt(ordersList[i].products_order[j].quantity) * parseInt(ordersList[i].products_order[j].price_sell);
    }
}

document.getElementById('totalIncome').textContent = totalIncome + "đ";

let totalVon = 0;
for(let i = 0; i < ordersList.length; i++){
    for(let j = 0; j <  ordersList[i].products_order.length; j++){
        for(let k = 0; k < productsList.length; k++){
            if(productsList[k].id == ordersList[i].products_order[j].id){
                totalVon += parseInt(ordersList[i].products_order[j].quantity) * productsList[k].price_imported
            }
        }
    }
}
let totalRevenue = totalIncome - totalVon;
document.getElementById('totalRevenue').textContent = totalRevenue + "đ";

function viewAdminInvoices(){
    const tableAdminInvoices = document.querySelector(".invoice-table__cont table");
    const tbodyAdminInvoices = tableAdminInvoices.querySelector("tbody");
    tbodyAdminInvoices.innerHTML = `
        <tr class="table__header subtitle1">
            <th>Khách hàng</th>
            <th>Ngày mua</th>
            <th>Hóa đơn</th>
            <th>Giá trị</th>
        </tr>            
    `;
    for (let i = 0; i < ordersList.length; i++) {
        let row = tbodyAdminInvoices.insertRow();
        row.classList.add('table__data', 'canhover');

        let buyer = usersList.filter(user => user.id == ordersList[i].id_user)[0];
        let rowTotal = 0;
        for(let j = 0; j < ordersList[i].products_order.length; j++) {
            rowTotal += ordersList[i].products_order[j].price_sell * ordersList[i].products_order[j].quantity;
        }

        row.innerHTML = `
            <td class="client__avatar">
                <img src=".${buyer.avatar}" onerror="handleErrorAvatar(this)" alt="">
                <div class="client__info">
                    <div class="client__name subtitle2">${buyer.name}</div>
                    <div class="client__id body2">${buyer.id}</div>
                </div>
            </td>
            <td>
                <div class="body2">${ordersList[i].day_order}</div>
            </td>
            <td>
                <div class="body2">${ordersList[i].id}</div>
            </td>
            <td>
                <div class="subtitle2">${rowTotal}đ</div>
            </td>
        `;

        row.addEventListener('click', () => {
            clearMainBody();
            resetNavbar();
            siteInvoiceDetail.classList.remove('hidden');

            const tableAdminInvoiceDetail = document.querySelector(".invoice-detail-table__cont table");
            const tbodyAdminInvoiceDetail = tableAdminInvoiceDetail.querySelector("tbody");
            tbodyAdminInvoiceDetail.innerHTML = `
                <tr class="table__header subtitle1">
                    <th>Sản phẩm</th>
                    <th>Đơn giá</th>
                    <th class="quantity">Số lượng</th>
                    <th>Thành tiền</th>
                </tr>
            `;
            let currentInvoice = ordersList[i];
            let tempTotal = 0;
            for(let j = 0; j < currentInvoice.products_order.length; j++) {
                let row = tbodyAdminInvoiceDetail.insertRow();
                row.classList.add('table__data');

                let product = productList.filter(prd => prd.id == currentInvoice.products_order[j].id)[0];
                let rowTotal = ordersList[i].products_order[j].price_sell * ordersList[i].products_order[j].quantity;
                tempTotal += rowTotal;
                row.innerHTML = `
                    <td class="product">
                        <img src="${product.thumbnail_stack[0]}" alt="">
                        <div class="product__info">
                            <div class="subtitle2">${product.name}</div>
                        </div>
                    </td>
                    <td>
                        <div class="body2">${ordersList[i].products_order[j].price_sell}đ</div>
                    </td>
                    <td>
                        <div class="quantity body2">${ordersList[i].products_order[j].quantity}</div>
                    </td>
                    <td>
                        <div class="subtitle2">${rowTotal}đ</div>
                    </td>
                `;
            }

            document.querySelector('.invoice-detail .buyer-card .client__name').textContent = buyer.name;
            document.querySelector('.invoice-detail .buyer-card .client__id').textContent = buyer.id;
            document.querySelector('.invoice-detail .buyer-card img').src = buyer.avatar;

            let receiver = receiversList.filter(rec => rec.id_receiver == currentInvoice.id_receiver)[0];
            document.querySelector('.invoice-detail .address-card__receiver').textContent = receiver.name;
            document.querySelector('.invoice-detail .address-card__address').textContent = receiver.address;
            document.querySelector('.invoice-detail .address-card__phonenumber').textContent = receiver.phone;

            document.querySelector('.payment-card__total-temp-value').textContent = tempTotal + "đ";
            let shippingPrice = 0;
            document.querySelector('.payment-card__total .total-label').textContent = tempTotal + shippingPrice + "đ";

        });
    }
}
viewAdminInvoices();
//----------------------------------------------------------------
// STATISTIC ADMIN

// ACCOUNT SITE
//----------------------------------------------------------------
const itemsPerPageUser = 5;
let accountTableCurrentPage = 1;
const totalPages = Math.ceil(usersList.length / itemsPerPageUser);
function loadUser(){
    const tableUser = document.getElementById('user-table-body')
    const startIndex = (accountTableCurrentPage - 1) * itemsPerPageUser;
    const endIndex = startIndex + itemsPerPageUser;
    const usersToDisplay = usersList.slice(startIndex, endIndex);
    tableUser.innerHTML = ''; 
    if( usersList && Array.isArray(usersList)){
        usersToDisplay.forEach(user => {
            let rowhtml = `
            <tr>
                <td>${user.id}</td>
                <td style="display: flex; align-items: center;">
                    <div><img src=".${user.avatar}" alt="Avatar" width="40" height="40" onerror="handleErrorAvatar(this)" style="border-radius: 100%;"></div>
                    <div style="margin-left: 10px;">${user.name}</div>
                </td>
                <td>${user.address}</td>
                <td>${user.phone}</td>
            </tr>
            `;
            tableUser.innerHTML += rowhtml;
        })
    }
}
loadUser();
function updatePagination() {
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = accountTableCurrentPage;

    const prevButton = document.querySelector('#pagination button:nth-child(1)');
    const nextButton = document.querySelector('#pagination button:nth-child(3)');

    prevButton.disabled = accountTableCurrentPage === 1;
    nextButton.disabled = accountTableCurrentPage === totalPages;
}
function prevPage() {
    if (accountTableCurrentPage > 1) {
        accountTableCurrentPage--;
        loadUser();
    }
}
function nextPage() {
    if (accountTableCurrentPage < totalPages) {
        accountTableCurrentPage++;
        loadUser();
    }
}

// Search user
let searchInput = document.getElementById('search-input-user');
searchInput.addEventListener("keypress", function(event) {
    if (event.key === "Enter") {
        searchUser(searchInput.value.toUpperCase());
    }
});
function searchUser(searchPattern){
    let result = [];
    for (i = 0; i < usersList.length; i++) {
        txtValue = usersList[i].name;
        if (txtValue.toUpperCase().indexOf(searchPattern) > -1) {
            result.push(usersList[i]);
        }
    }    
    const tableUser = document.getElementById('user-table-body')
    const startIndex = (accountTableCurrentPage - 1) * itemsPerPageUser;
    const endIndex = startIndex + itemsPerPageUser;
    const usersToDisplay = result.slice(startIndex, endIndex);
    tableUser.innerHTML = '';  
    if( result && Array.isArray(result)){
        usersToDisplay.forEach(user => {
            let rowhtml = `
            <tr>
                <td>${user.id}</td>
                <td style="display: flex; align-items: center;">
                    <div><img src=".${user.avatar}" alt="Avatar" width="40" height="40" onerror="handleErrorAvatar(this)" style="border-radius: 100%;"></div>
                    <div style="margin-left: 10px;">${user.name}</div>
                </td>
                <td>${user.address}</td>
                <td>${user.phone}</td>
            </tr>
            `;
            tableUser.innerHTML += rowhtml;
        })
    }
}
//----------------------------------------------------------------
// ACCOUNT SITE

// ACCOUNT DETAIL SITE
//----------------------------------------------------------------
//Thay đổi avatar
function changeAvatarImg() {
    let input = document.getElementById("image-input-Avatar");    
    // Kiểm tra xem người dùng đã chọn hình ảnh chưa
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('account-avatar-img').src = e.target.result;
            // currentUser.avatar = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

let AGlobal
let rowSelectedAccountID
document.getElementById('account-info-delete').addEventListener('click', () => {
    console.log(usersList);

    for(let i = 0; i < usersList.length; i++) {
        if(usersList[i].id == rowSelectedAccountID) {
            alert("Xóa tài khoản");
            usersList.splice(i, 1);
            localStorage.setItem("users", JSON.stringify(usersList));
            console.log(usersList);
            clearMainBody();
            document.getElementById('user-page').classList.remove('hidden');
            location.reload();
            break;
        }
    }
});
document.getElementById('account-info-update').addEventListener('click', ()=> updateUserInfo());
function updateUserInfo() {
    // Get updated values from input fields
    const updatedFullName = document.getElementById('user_fullName').value;
    const updatedPhoneNumber = document.getElementById("user_number").value;
    const updatedEmail = document.getElementById("user_email").value;
    const updatedpass = document.getElementById("user_pass").value;
    const updatedcheckpass = document.getElementById("user_checkpass").value;
    const updatedaddress = document.getElementById("user_address").value;

    //Kiểm tra định dạng
    // Kiểm tra định dạng email
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(updatedEmail)) {
        alert('Email không hợp lệ.');
        return;
    }
    // Kiểm tra định dạng số điện thoại
    var phoneRegex = /^\d{10}$|^\d{13}$/;
    if (!phoneRegex.test(updatedPhoneNumber)) {
        alert('Số điện thoại không hợp lệ.');
        return;
    }
    var passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d).+$/;
    if (!passwordRegex.test(updatedpass)) {
        alert('Nhập mật khẩu không đúng định dạng');
        return;
    }

    if(updatedpass == updatedcheckpass ){
        for(let i = 0; i < usersList.length; i++) {
            if(rowSelectedAccountID == usersList[i].id)
            {
                usersList[i].name = updatedFullName;
                usersList[i].phone = updatedPhoneNumber;
                usersList[i].email = updatedEmail;
                usersList[i].address = updatedaddress;
                usersList[i].password = updatedpass ;
                usersList[i].avatar = document.getElementById('account-avatar-img').src;
                localStorage.setItem("users", JSON.stringify(usersList));
                break;
            }
        }
        alert("Dữ liệu đã được cập nhật");
    } else {
        alert("Xác nhận mật khẩu không đúng");
    }
    location.reload();
}
document.addEventListener("DOMContentLoaded", function () {
  var UserTableChange = document.getElementById("user-table-title");
  AGlobal = 0;
  if (UserTableChange) {
    var tbodyUserTable = UserTableChange.querySelector("tbody");
    if (tbodyUserTable) {
      tbodyUserTable.addEventListener("click", function (e) {
        var targetElement = e.target;
        // Tìm dòng cha chứa ô được click
        var row = targetElement.closest("tr");
        if (row) {
          var idCellUser = row.querySelector("td:first-child");
          rowSelectedAccountID = idCellUser.textContent.trim();
          AGlobal = parseInt(rowSelectedAccountID.slice(-6));
          console.log(rowSelectedAccountID);
          console.log(AGlobal);
          loadOrder(rowSelectedAccountID);
          loadUserInfor(rowSelectedAccountID);
        }
        const UserTablePage = document.getElementById("user-page");
        const UserAdjust = document.getElementById("user-detail-page");
        // Kiểm tra xem có chứa lớp "hidden-user" hay không
        const isHidden = UserAdjust.classList.contains("hidden");
        // Nếu đang ẩn, hiển thị và ngược lại
        if (isHidden) {
          UserAdjust.classList.remove("hidden");
          UserTablePage.classList.add("hidden");
        } else {
          UserAdjust.classList.add("hidden");
          UserTablePage.classList.remove("hidden");
        }
      });
    }
  }
});

let NumberOrderLenghtCurrent;
const itemsPerPageOrder = 5;
let currentPageOrder = 1;
let totalPagesOrder;
function loadOrder(a) {
  const TableOrder = document.getElementById("table-history-buying-body");
  // const startIndex = (currentPageOrder - 1) * itemsPerPageOrder;
  // const endIndex = startIndex + itemsPerPageOrder;
  // const ordersToDisplay = ordersList.slice(startIndex, endIndex);
  TableOrder.innerHTML = "";
  let hasOrderToDisplay = false;
  NumberOrderLenghtCurrent = 0;
  if (ordersList && Array.isArray(ordersList)) {
    const orderArray = ordersList.filter((order) => order.id_user == a);
    if (orderArray && orderArray.length > 0) {
      NumberOrderLenghtCurrent = orderArray.length;
      totalPagesOrder = Math.ceil(NumberOrderLenghtCurrent / itemsPerPageOrder);
      console.log(NumberOrderLenghtCurrent);
      const startIndex = (currentPageOrder - 1) * itemsPerPageOrder;
      const endIndex = startIndex + itemsPerPageOrder;
      const ordersToDisplay = orderArray.slice(startIndex, endIndex);
      ordersToDisplay.forEach((order) => {
        const row = document.createElement("tr");
        const DateBuyingCell = document.createElement("td");
        const IDCell = document.createElement("td");
        const PriceCell = document.createElement("td");
        const shipping = order.id_shipping_type;
        // console.log(shipping)
        DateBuyingCell.textContent = order.day_order;
        IDCell.textContent = order.id;
        if (
          Array.isArray(order.products_order) &&
          order.products_order.length > 0
        ) {
          const total = order.products_order.reduce(
            (acc, product) =>
              acc +
              parseFloat(product.price_sell) * parseFloat(product.quantity),
            0
          );
          PriceCell.textContent = formatCurrency(
            total + pricesShipping(shipping)
          );
        } else {
          PriceCell.textContent = "N/A";
        }
        row.appendChild(DateBuyingCell);
        row.appendChild(IDCell);
        row.appendChild(PriceCell);
        TableOrder.appendChild(row);
        row.addEventListener("click", () => {
            const orderID = row.querySelector('td:nth-child(2)').textContent;
            console.log(orderID);
            clearMainBody();
            siteUserOrders.classList.remove("hidden");

            const tableOrderDetail = document.querySelector('.account-order-detail-table__cont tbody')
            for(let i = 0; i < ordersList.length; i++) {
                if(ordersList[i].id == orderID) {
                    let tamtinh = 0;
                    //hiển thị prd
                    for(let j = 0; j < ordersList[i].products_order.length; j++){
                        tamtinh += ordersList[i].products_order[j].price_sell*ordersList[i].products_order[j].quantity;
                        let prd;
                        for(let k = 0; k < productsList.length; k++){
                            if(productsList[k].id == ordersList[i].products_order[j].id){
                                prd = productsList[k];
                                break;
                            } 
                        }
                        tableOrderDetail.innerHTML += `
                        <tr class="table__data">                
                            <td class="product__info">
                                <img src="${prd.thumbnail_stack[0]}" onerror="handleErrorPrdThumbnail(this)" alt="">
                                <div class="product__info--detail">
                                    <div class="subtitle2">${prd.name}</div>
                                    <!--<div class="product__info--order body2">
                                        <p class="body2">Màu sắc: </p><div class="color-dot" style="background: #000000;"></div><p></p>
                                    </div>-->
                                </div>
                            </td>
                            <td><div class="body2">${ordersList[i].products_order[j].price_sell + "đ"}</div></td>
                            <td><p class="body2">${ordersList[i].products_order[j].quantity}</p></td>
                            <td><div class="subtitle2 cellTotal">${ordersList[i].products_order[j].price_sell*ordersList[i].products_order[j].quantity + "đ"}</div></td>
                        </tr>
                        `;
                    }

                    //hiển thị địa chỉ giao hàng
                    let receiver;
                    for(let j = 0; j < receiversList.length; j++) {
                        if(receiversList[j].id_receiver == ordersList[i].id_receiver){
                            receiver = receiversList[j];
                            document.querySelector('#user-order-page .address-card__receiver').textContent = receiver.name;
                            document.querySelector('#user-order-page .address-card__address').textContent = receiver.address;
                            document.querySelector('#user-order-page .address-card__phonenumber').textContent = receiver.phone;
                            break;
                        }
                    }

                    //hiển thị thông tin đơn hàng
                    document.querySelector('#user-order-page .payment-card__total-temp--number').textContent = tamtinh + "đ";
                    let shippingPrice;
                    if(ordersList[i].id_shipping_type == 0) shippingPrice = 0;
                    else shippingPrice = 30000;
                    document.querySelector('#user-order-page .payment-card__shipping--number').textContent = shippingPrice + "đ";
                    document.querySelector('#user-order-page .total-label').textContent = (tamtinh+shippingPrice) + "đ";
                }
            }
        });
      });
    }
    if (!hasOrderToDisplay) {
      currentPageOrder = 1;
    }
  }
}

function loadUserInfor(idUser){
    for(let i = 0; i < usersList.length; i++){
        if(usersList[i].id === idUser){
            document.getElementById('account-avatar-img').src = usersList[i].avatar
            document.getElementById('user_fullName').value = usersList[i].name;
            document.getElementById('user_number').value = usersList[i].phone;
            document.getElementById('user_address').value = usersList[i].address;
            document.getElementById('user_email').value = usersList[i].email;
            document.getElementById('user_pass').value = usersList[i].password;
            document.getElementById('user_checkpass').value = usersList[i].password;
            break;
        }
    }
}

function formatCurrency(amount){
    return amount.toLocaleString('vi',{style: 'currency', currency:'VND'});
}
function pricesShipping(a) {
    if (kindOfShipping && Array.isArray(kindOfShipping)){
        const IDShipping = kindOfShipping.find(shipping => shipping.id == a);
        if (IDShipping) return IDShipping.price;
        else return 0;
    }
}  

function prevPageOrder() {
    if (currentPageOrder > 1) {
        currentPageOrder--;
        loadOrder(rowSelectedAccountID);
    }
}
function nextPageOrder() {
    if (currentPageOrder < totalPagesOrder) {
        currentPageOrder++;
        loadOrder(rowSelectedAccountID);
    }
}
//----------------------------------------------------------------
// ACCOUNT DETAIL SITE

// ACCOUNT CREATE SITE
//----------------------------------------------------------------
//Thay đổi avatar
function changeAvatarImgNewUser() {
    let input = document.getElementById("image-input-Avatar-newUser");    
    // Kiểm tra xem người dùng đã chọn hình ảnh chưa
    if (input.files && input.files[0]) {
        var reader = new FileReader();
        reader.onload = function(e) {
            document.getElementById('new-account-avatar-img').src = e.target.result;
            // currentUser.avatar = e.target.result;
        };
        reader.readAsDataURL(input.files[0]);
    }
}

function CreateAccount(){
    var username = document.getElementById('newUser_fullName').value;
    var address = document.getElementById('newUser_address').value;
    var phone = document.getElementById('newUser_number').value;
    var email = document.getElementById('newUser_email').value;
    var password = document.getElementById('newUser_pass').value;
    var newUserId = "AC" + IDGenerate();
    var confirmPassword = document.getElementById('newUser_checkpass').value;
     // Kiểm tra định dạng email
     var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
     if (!emailRegex.test(email)) {
         alert('Email không hợp lệ.');
         return;
     }
 
     // Kiểm tra định dạng số điện thoại
     var phoneRegex = /^\d{10}$|^\d{13}$/;
     if (!phoneRegex.test(phone)) {
         alert('Số điện thoại không hợp lệ.');
         return;
     }
     var passwordRegex = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*[A-Z])(?=.*\d).+$/;
     if (!passwordRegex.test(password)) {
        alert('Nhập mật khẩu không đúng định dạng');
         return;
     }
     if (password !== confirmPassword) {
         alert('Mật khẩu và xác nhận mật khẩu không khớp.');
         return;
     }
    var mewuser = {
        id: newUserId,
        name: username,
        address: address,
        phone: phone,
        email: email,
        password: password,
        role: "client",
        avatar: document.getElementById('new-account-avatar-img').src
    }
       
    var newusers = JSON.parse(localStorage.getItem("users"))|| [] ;
    newusers.push(mewuser);
    localStorage.setItem("users", JSON.stringify(newusers));
    alert("Account created successfully!"); 
    location.reload(true);   
}
document.getElementById('new-account-info-update').addEventListener('click', ()=>{
    CreateAccount();
});

document.addEventListener("DOMContentLoaded",function(){
    const createNewUserBtn = document.getElementById("AddNewUserBtn")
    createNewUserBtn.addEventListener("click", function () {
        clearMainBody();
        siteUserCreate.classList.remove("hidden");
    });
});
//----------------------------------------------------------------
// ACCOUNT CREATE SITE