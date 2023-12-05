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
                <img src="${buyer.avatar}" onerror="handleErrorAvatar(this)" alt="">
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