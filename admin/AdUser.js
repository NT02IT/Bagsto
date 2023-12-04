const newUser_Btn = document.getElementById('newProduct-btn--user');
newUser_Btn.addEventListener('click', ()=>{
    var productCreatePage = document.getElementById('userCreate-page');
    resetNavbar();
    clearMainBody();
    productCreatePage.classList.remove('hidden');
   // let ProductIdDetail = document.getElementById('ProductId--create');
   // ProductIdDetail.textContent = "Product ID: " + (ListUser[ListUser.length-1].id+1);

})
headerTab3.addEventListener('click', () =>{
    n=1;
    clearTable();
    load6User(ListUser, "next");
//     var containerDetailProductImg = document.getElementById('containerDetailProduct--img');
//     var imgElements = containerDetailProductImg.getElementsByTagName('img');
// // Lặp qua danh sách các thẻ img và xóa
//     for (var i = imgElements.length - 1; i >= 0; i--) {
//         var imgElement = imgElements[i];
//         imgElement.parentNode.removeChild(imgElement);
//     }
})

//////////
// "id": "AC000001",
//     "name": "Leanne Graham",
//     "email": "Sincere@april.biz",
//     "password": "abc1234@A",
//     "address": "173 Võ Thị Sáu, Q.1, Tp.HCM",
//     "phone": "0327531105",
//     "role" : "admin",
//     "avatar": ""
var ListUser = [];
class Product {
    constructor(id, name, email, password, address, phone, role, avatar) {
        this.id = id;
        this.name = name;
        this.email = email;
        this.password = password;
        this.address = address;
        this.phone = phone;
        this.role = role;
        this.avatar = avatar;
    }
}
function addProduct(Product){
    ListUser.push(Product);
}
function updateProduct(Product){
    for (var i=0;i<ListUser.length;i++){
        if (parseInt(Product.id) === ListUser[i].id){
            ListUser[i]=Product;
        }
    }
}
function deleteProduct(ID){
    for (var i=0;i<ListUser.length;i++){
        if (ListUser[i].id === parseInt(ID)){
            ListUser.splice(i,1);
            break;
        }
    }
}
function loadJSonProduct(){
    const jsonFilePath = '../data/users.json';

// Sử dụng Fetch API để đọc file JSON
    fetch(jsonFilePath)
        .then(response => {
            // Kiểm tra xem có lỗi không
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            // Parse JSON từ response
            return response.json();
        })
        .then(data => {
            // Khi dữ liệu JSON đã được đọc thành công
            // console.log(data);

            // Tiếp tục xử lý dữ liệu, ví dụ: chuyển đổi thành mảng ListUser
            ListUser = data.map(item => new Product(
                item.id,
                item.name,
                item.email,
                item.password,
                item.address,
                item.phone,
                item.role,
                item.avatar,
            ));

            // In ra mảng ListUser
            //   console.log(ListUser);
        })
        .catch(error => {
            // Xử lý lỗi nếu có
            console.error('Fetch error:', error);
        });
    load6User(ListUser, 'next');
}

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
function updataProductJson() {
    var productListJSON = JSON.stringify(ListUser);
    localStorage.setItem('users', productListJSON);

}
var n = 1;
var table_product = document.getElementById("table_product--user");
function load6User(listUser, check) {

    // Lấy reference đến table
    if (check === 'back') {
        if (n <= 13) {
            n = 1;
        } else {
            // Nếu n không phải là bội số của 6, đặt n về trang bắt đầu của trang hiện tại
            n = n - (n % 6 === 0 ? 11 : (n % 6) + 5);
        }
    }
    var m = n+5;
    if (m>listUser.length){
        m = listUser.length;
    }
    var j=0;
    for (let i = n-1; i<m; i++) {
        // Tạo một hàng mới
        var newRow = document.createElement("tr");
        newRow.className = "productTable__row user__row canhover";
        newRow.id = `user__row--${j}`;
        // Tạo các ô (cột) cho hàng mới
        var cell1 = document.createElement("td");
        cell1.className = "productTable__cell col1";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkBox--" + j;

        var img = document.createElement("img");
        img.className = "Product__img";
        img.src = listUser[i].avatar;
        img.alt = "";
        var productName = document.createElement("p");
        productName.className = "product__name";
        productName.textContent = listUser[i].name;

        // Gắn các phần tử con vào cell1
        cell1.appendChild(checkbox);
        cell1.appendChild(img);
        cell1.appendChild(productName);

        // Tạo và gắn các ô khác vào hàng mới
        var cell2 = document.createElement("td");
        cell2.className = "productTable__cell col2";
        cell2.innerHTML = "<p>" + listUser[i].address + "</p>";

        var cell3 = document.createElement("td");
        cell3.className = "productTable__cell col3";
        cell3.innerHTML = "<p>" + listUser[i].phone + "</p>";

        var cell4 = document.createElement("td");
        cell4.className = "productTable__cell col4";
        var statusProduct="In stock";
        if (listUser[i].status==='admin'){
            statusProduct="admin"
            cell4.innerHTML = "<p class='OutOfStock--banded'>" + statusProduct + "</p>";
        }else{
            cell4.innerHTML = "<p class='InStock--avtice'>" + statusProduct + "</p>";
        }


        // Gắn các ô vào hàng mới
        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);

        // Gắn hàng mới vào table
        table_product.appendChild(newRow);
        n++;
        j++;
    }
    //click xem chi tiet san pham
    // let myTableRowProduct1 = document.getElementById("user__row--0");
    // myTableRowProduct1.addEventListener('click', function() {
    //     var detailProduct = document.getElementById('userDetail-page');
    //     // console.log('hello');
    //     resetNavbar();
    //     clearMainBody();
    //     detailProduct.classList.remove('hidden');
    //    // loadDetail(n-7);
    // });
    // var myTableRowProduct2 = document.getElementById("user__row--1");
    // myTableRowProduct2.addEventListener('click', function() {
    //     var detailProduct = document.getElementById('userDetail-page');
    //     // console.log('hello');
    //     resetNavbar();
    //     clearMainBody();
    //     detailProduct.classList.remove('hidden');
    //  //   loadDetail(n-6);
    // });
    // var myTableRowProduct3 = document.getElementById("user__row--2");
    // myTableRowProduct3.addEventListener('click', function() {
    //     var detailProduct = document.getElementById('userDetail-page');
    //     // console.log('hello');
    //     resetNavbar();
    //     clearMainBody();
    //     detailProduct.classList.remove('hidden');
    //   //  loadDetail(n-5);
    // });
    // var myTableRowProduct4 = document.getElementById("user__row--3");
    // myTableRowProduct4.addEventListener('click', function() {
    //     var detailProduct = document.getElementById('userDetail-page');
    //     // console.log('hello');
    //     resetNavbar();
    //     clearMainBody();
    //     detailProduct.classList.remove('hidden');
    //    // loadDetail(n-4);
    // });
    // var myTableRowProduct5 = document.getElementById("user__row--4");
    // myTableRowProduct5.addEventListener('click', function() {
    //     var detailProduct = document.getElementById('userDetail-page');
    //     // console.log('hello');
    //     resetNavbar();
    //     clearMainBody();
    //     detailProduct.classList.remove('hidden');
    //  //   loadDetail(n-3);
    // });
    // var myTableRowProduct6 = document.getElementById("user__row--5");
    // myTableRowProduct6.addEventListener('click', function() {
    //     var detailProduct = document.getElementById('userDetail-page');
    //     // console.log('hello');
    //     resetNavbar();
    //     clearMainBody();
    //     detailProduct.classList.remove('hidden');
    //     loadDetail(n-2);
    // });
}
window.onload = function (){
    loadJSonProduct();
    console.log(ListUser);
}