
function writeToLocalStorage(key,valueUrl){
    const localStorageData = localStorage.getItem(key);
    if (!localStorageData){
        fetch(valueUrl)
        .then(response => response.json())
        .then(data => 
        {localStorage.setItem(key,JSON.stringify(data));
        })
        .catch(error => console.error('Error reading JSON file:',error));
    } 
}
function readLocalStorage(key){
    const localStoredData = localStorage.getItem(key);
    if (localStoredData) {
      const users = JSON.parse(localStoredData);
      return users;
    } else {
      // console.log('No data found in localStorage.');
      return null;
    };
}
writeToLocalStorage('users','../data/users.json');
let listUser  = readLocalStorage('users');
writeToLocalStorage('orders','../data/orders.json');
let listOrder = readLocalStorage('orders');
writeToLocalStorage('promotions','../data/promotions.json');
let listPromotion = readLocalStorage('promotions');
writeToLocalStorage('shipping_types','../data/shipping_types.json')
let kindOfShipping = readLocalStorage('shipping_types')
function pricesShipping(a) {
    if (kindOfShipping && Array.isArray(kindOfShipping)){
        const IDShipping = kindOfShipping.find(shipping => shipping.id == a);
        if (IDShipping){
            return IDShipping.price;
        }
        else{
            return 0;
        }
}
}   
//previous and next button
const itemsPerPageUser = 5;
let currentPage = 1;
const totalPages = Math.ceil(listUser.length / itemsPerPageUser);
function loadUser(){
    const tableUser = document.getElementById('user-table-body')
    const startIndex = (currentPage - 1) * itemsPerPageUser;
    const endIndex = startIndex + itemsPerPageUser;
    const usersToDisplay = listUser.slice(startIndex, endIndex);
    tableUser.innerHTML = '';  
    if( listUser && Array.isArray(listUser)){
        // listUser.forEach(user => {
            usersToDisplay.forEach(user => {
            const row = document.createElement('tr');
            const IDCell = document.createElement('td');
            const InformationCell = document.createElement('td')
            const AvatarCell = document.createElement('div');
            const NameCell = document.createElement('div');
            const AddressCell = document.createElement('td');
            const PhoneCell = document.createElement('td');
            // const MoreIconCell = document.createElement('td');
            IDCell.textContent = user.id;
            NameCell.textContent = user.name;
            AddressCell.textContent = user.address;
            PhoneCell.textContent = user.phone;
            // AvatarCell.textContent = user.avatar;
            const AvatarImg = document.createElement('img');
            AvatarImg.src = user.avatar;
            AvatarImg.alt = "Avatar";
            AvatarImg.width = 40;
            AvatarImg.height = 40;
            AvatarImg.style.borderRadius = '100%';
            AvatarCell.appendChild(AvatarImg);
            // const EditMoreButton = document.createElement('button');
            // EditMoreButton.textContent = 'Edit';
            // EditMoreButton.addEventListener('click', () =>{
            //     alert ('Edit button');
            // })
            // MoreIconCell.appendChild(EditMoreButton);
            InformationCell.appendChild(AvatarCell);
            InformationCell.appendChild(NameCell)
            row.appendChild(IDCell);
            row.appendChild(InformationCell);
            row.appendChild(AddressCell);
            row.appendChild(PhoneCell);
            tableUser.appendChild(row);
            InformationCell.style.display = "flex";
            InformationCell.style.alignItems = "center";
            NameCell.style.marginLeft = "10px";
        })
    }
}
function updatePagination() {
    const currentPageElement = document.getElementById('currentPage');
    currentPageElement.textContent = currentPage;

    const prevButton = document.querySelector('#pagination button:nth-child(1)');
    const nextButton = document.querySelector('#pagination button:nth-child(3)');

    prevButton.disabled = currentPage === 1;
    nextButton.disabled = currentPage === totalPages;
}

function prevPage() {
    if (currentPage > 1) {
        currentPage--;
        loadUser();
    }
}

function nextPage() {
    if (currentPage < totalPages) {
        currentPage++;
        loadUser();
    }
}


document.getElementById('preview-image').addEventListener("click",function(){
    document.getElementById('image-input').click();   
});
function previewImage() {
    var input = document.getElementById('image-input');
    var preview = document.getElementById('preview-image');

    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            preview.style.display="block";
            preview.src = e.target.result;
        }

        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}
document.getElementById('preview-image-change').addEventListener("click",function(){
    document.getElementById('image-change').click();   
});
function previewImageChange() {
    var input = document.getElementById('image-change');
    var preview = document.getElementById('preview-image-change');

    var file = input.files[0];

    if (file) {
        var reader = new FileReader();
        
        reader.onload = function(e) {
            preview.style.display="block";
            preview.src = e.target.result;
        }

        reader.readAsDataURL(file);
    } else {
        preview.src = "";
    }
}
//button next order
const itemsPerPageOrder = 5;
let currentPageOrder = 1;
const totalPagesOrder = Math.ceil(listOrder.length / itemsPerPageOrder);
function loadOrder(){
    const TableOrder = document.getElementById('table-history-buying-body');
    const startIndex = (currentPageOrder - 1) * itemsPerPageOrder;
    const endIndex = startIndex + itemsPerPageOrder;
    const ordersToDisplay = listOrder.slice(startIndex, endIndex);
    TableOrder.innerHTML = '';  
    if (listOrder && Array.isArray(listOrder)){
        ordersToDisplay.forEach( order =>{
            const row = document.createElement('tr');
            const DateBuyingCell = document.createElement('td');
            const IDCell = document.createElement('td');
            const PriceCell = document.createElement('td');
            const shipping = order.id_shipping_type;
            // console.log(shipping)
            DateBuyingCell.textContent = order.day_order;
            IDCell.textContent = order.id;
            if(Array.isArray(order.products_order) && order.products_order.length > 0){
                    const total = order.products_order.reduce((acc,product) => acc + (parseFloat(product.price_sell) * parseFloat(product.quantity)),0);
                    PriceCell.textContent = formatCurrency(total + pricesShipping(shipping)) 
                }
                else {
                    PriceCell.textContent = "N/A";
                }
            row.appendChild(DateBuyingCell);
            row.appendChild(IDCell);
            row.appendChild(PriceCell);
            TableOrder.appendChild(row);
        })
    }
}
//button next order
function updatePaginationOrder() {
    const currentPageElement = document.getElementById('currentPageOder');
    currentPageElement.textContent = currentPageOrder;

    const prevButton = document.querySelector('#paginationOrder button:nth-child(1)');
    const nextButton = document.querySelector('#paginationOrder button:nth-child(3)');

    prevButton.disabled = currentPageOrder === 1;
    nextButton.disabled = currentPageOrder === totalPagesOrder;
}

function prevPageOrder() {
    if (currentPageOrder > 1) {
        currentPageOrder--;
        loadOrder();
    }
}

function nextPageOrder() {
    if (currentPageOrder < totalPagesOrder) {
        currentPageOrder++;
        loadOrder();
    }
}

function formatCurrency(amount){
   return amount.toLocaleString('vi',{style: 'currency', currency:'VND'});
// return amount.toLocaleString('vi-VN');
}
writeToLocalStorage('products','../data/products.json');
let listProduct = readLocalStorage('products');
function productImg(a){
    if (listProduct && Array.isArray(listProduct)){
        const products = listProduct.find(product => product.id == a);
            if(products){
                return products.thumbnail_stack[0];
            }
            else {
                return 0;
            }
        }
    }
function productName(a){
    if (listProduct && Array.isArray(listProduct)){
        const products = listProduct.find(product => product.id == a);
            if(products){
                return products.name;
            }
            else {
                return 0;
            }
        }
    }
function loadUserOrder(){
    const tableUserOrder = document.getElementById('user-order-table-body')
    if (listOrder && Array.isArray(listOrder)){
        listOrder.forEach(order =>{
             if(Array.isArray(order.products_order) && order.products_order.length>0){
                order.products_order.forEach(product =>{
                    const row = document.createElement('tr');
                    const ProductCell = document.createElement('td');
                    // const ProducImgCell = document.createElement('div');
                    const ProductInformation = document.createElement('div')
                    const ProductName = document.createElement('div');
                    const ProductColor = document.createElement('div');
                    const UnitColor = document.createElement('div');
                    const TextProductColor = document.createElement('div');
                    const UnitPriceCell = document.createElement('td');
                    const QuantityCell = document.createElement('td');
                    const IntoMoneyCell = document.createElement('td');
                    ProductName.textContent = productName(product.id);
                    TextProductColor.textContent = "Màu sắc: "
                    UnitColor.style.backgroundColor = product.colors;
                    UnitPriceCell.textContent = formatCurrency(product.price_sell);
                    QuantityCell.textContent = product.quantity;
                    IntoMoneyCell.textContent = formatCurrency (parseFloat(product.price_sell) * parseFloat(product.quantity));
                    const ProductImg = document.createElement('img');
                    ProductImg.src = productImg(product.id);
                    ProductImg.alt = "";
                    ProductImg.width = 60;
                    ProductImg.height = 60;
                    UnitColor.classList.add('ProductColor');
                    // ProductColor.style.width = "40px";
                    // ProductColor.style.height = "40px";
                    // ProductColor.style.borderRadius = "100%"
                    // ProductColor.style.backgroundColor = "product.colors"
                    // ProducImgCell.appendChild(ProducImg);
                    ProductColor.appendChild(TextProductColor);
                    ProductColor.appendChild(UnitColor);
                    ProductInformation.appendChild(ProductName);
                    ProductInformation.appendChild(ProductColor);
                    ProductCell.appendChild(ProductImg);
                    ProductCell.appendChild(ProductInformation);
                    // row.appendChild(ProducImgCell);
                    row.appendChild(ProductCell);
                    row.appendChild(UnitPriceCell);
                    row.appendChild(QuantityCell);
                    row.appendChild(IntoMoneyCell);
                    tableUserOrder.appendChild(row);
                    ProductCell.style.display = "flex";
                    ProductCell.style.alignItems = "center";
                    ProductImg.style.marginRight = "24px";
                    ProductColor.style.display = "flex"
                    ProductColor.style.alignItems = "center"
                    UnitColor.style.marginLeft = "8px"
                })
             }
        })
    }
}
writeToLocalStorage('receivers','../data/receivers.json')
let listReceiver = readLocalStorage('receivers')
function loadReceiver (a){
    const AddressCell = document.getElementById('address-ship')
    if (listReceiver && Array.isArray(listReceiver)){
       const Receivers =  listReceiver.find(receiver => receiver.id_receiver == a);
       if(Receivers){
            const NameRow = document.createElement('div')
            const AddressRow = document.createElement('div')
            const PhoneRow = document.createElement('div')
            NameRow.textContent = Receivers.name;
            AddressRow.textContent = Receivers.address;
            PhoneRow.textContent = Receivers.phone;
            AddressCell.appendChild(NameRow);
            AddressCell.appendChild(AddressRow);
            AddressCell.appendChild(PhoneRow);
       }
       else{
        console.error('Cannot find reiceiver',error)
       }
    }
}
function loadPriceOrder(a){
    const PriceCell = document.getElementById('price-order');
    if(listOrder && Array.isArray(listOrder)){
         const priceorders = listOrder.find(priceorder => priceorder.id == a);
         const priceorders2 =  listOrder.find( priceorder2 => priceorder2.id == a)?.products_order || [];
        if (priceorders && priceorders2){
            const total = priceorders2.reduce((acc,product) => acc + (parseFloat(product.price_sell) * parseFloat(product.quantity)),0)
            console.log(total)
            const TemporaryCalculation = document.createElement('div')
            const FeeShip = document.createElement('div')
            const textTemporaryCalculation = document.createElement('div')
            const textFeeShip = document.createElement('div')
            const MoneyTemporaryCalculation = document.createElement('div')
            const MoneyFeeShip = document.createElement('div')
            const Sum = document.createElement('div')
            const textSum = document.createElement('div')
            const SumOfMoney = document.createElement('div')
            textTemporaryCalculation.textContent = "Tạm tính";
            textFeeShip.textContent = "Shipping";
            MoneyTemporaryCalculation.textContent = formatCurrency(total);
            MoneyFeeShip.textContent = formatCurrency (parseFloat(pricesShipping(priceorders.id_shipping_type)))
            textSum.textContent = "Tổng cộng"
            SumOfMoney.textContent = formatCurrency(total + parseFloat(pricesShipping(priceorders.id_shipping_type)))
            TemporaryCalculation.appendChild(textTemporaryCalculation);
            TemporaryCalculation.appendChild(MoneyTemporaryCalculation)
            FeeShip.appendChild(textFeeShip)
            FeeShip.appendChild(MoneyFeeShip)
            Sum.appendChild(textSum)
            Sum.appendChild(SumOfMoney)
            PriceCell.appendChild(TemporaryCalculation)
            PriceCell.appendChild(FeeShip)
            PriceCell.appendChild(Sum)
            TemporaryCalculation.style.display = "flex";
            TemporaryCalculation.style.justifyContent = "space-between"
            TemporaryCalculation.style.marginBottom = "16px"
            FeeShip.style.display = "flex";
            FeeShip.style.justifyContent = "space-between"
            FeeShip.style.marginBottom = "16px"
            Sum.style.display = "flex";
            Sum.style.justifyContent = "space-between"
            Sum.style.marginTop = "8px"
            Sum.style.borderTop = "2px solid #919EAB33"
            Sum.style.paddingTop = "16px"
        }
    } 
}
//Thêm người dùng
document.addEventListener("DOMContentLoaded",function(){
    const UserTable = document.getElementById("user-page")
    const UserCreate = document.getElementById("user-create-page")
    const toggleButton = document.getElementById("AddNewUserBtn")
    toggleButton.addEventListener("click", function () {
        // Kiểm tra xem userContainer có chứa lớp "hidden-user" hay không
        const isHidden = UserCreate.classList.contains("hidden");
        // Nếu đang ẩn, hiển thị và ngược lại
        if (isHidden) {
            UserCreate.classList.remove("hidden");
            UserTable.classList.add("hidden")

        } else {
            UserCreate.classList.add("hidden");      
            UserTable.classList.remove("hidden")
        }
    });
});
function CreateAccount(){
    var username = document.getElementById('user-name').value;
    var address = document.getElementById('address-user').value;
    var phone = document.getElementById('phonenumeber-user').value;
    var email = document.getElementById('email-user').value;
    var password = document.getElementById('password-user').value;
    var account = {
        username: username,
        address: address,
        phone: phone,
        email: email,
        password: password,
    }
    var users = JSON.parse(localStorage.getItem("users"))|| [] ;
    users.push(account);
    localStorage.setItem("account", JSON.stringify(users));
    alert("Account created successfully!"); 
}

window.onload = function(){
    console.log(listUser);
    console.log(listOrder);
    loadUserOrder()
    loadUser();
    loadOrder();
   console.log(pricesShipping(2))
   console.log(productImg(2))
   console.log(productName(2))
   loadReceiver(2);
   loadPriceOrder(1);
}
 

