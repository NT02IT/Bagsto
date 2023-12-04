// COMMON HANDLER
// ----------------------------------------------------------------
function handleImageClick(imgId){
    var confirmDelete = confirm("Bạn chắc chắn muốn xóa!");
    if (confirmDelete){
        document.getElementById(imgId).remove();
    }
}

//load bảng với 6 dòng
var n = 1;
var table_product = document.getElementById("table_product");
function load6Product(productsList, check) {
    // Lấy reference đến table
    if (check === 'back') {
        if (n <= 13) {
            n = 1;
        } else {
            // Nếu n không phải là bội số của 6, đặt n về trang bắt đầu của trang hiện tại
            n = n - (n % 6 === 0 ? 11 : (n % 6) + 5);
        }
    }
    var m = n + 5;
    if (m > productsList.length){
        m = productsList.length;
    }
    var j=0;
    for (let i = n-1; i<m; i++) {
        // Tạo một hàng mới
        var newRow = document.createElement("tr");
        newRow.className = "productTable__row product__row canhover";
        newRow.id = `product__row--${j}`;
        // Tạo các ô (cột) cho hàng mới
        var cell1 = document.createElement("td");
        cell1.className = "productTable__cell col1";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkBox--" + j;

        var img = document.createElement("img");
        img.className = "Product__img";
        img.src = productsList[i].thumbnail_stack[0];
        img.alt = "";
        var productName = document.createElement("p");
        productName.className = "product__name";
        productName.textContent = productsList[i].name;

        // Gắn các phần tử con vào cell1
        cell1.appendChild(checkbox);
        cell1.appendChild(img);
        cell1.appendChild(productName);

        // Tạo và gắn các ô khác vào hàng mới
        var cell2 = document.createElement("td");
        cell2.className = "productTable__cell col2";
        cell2.innerHTML = "<p>" + productsList[i].day_import + "</p>";

        var cell3 = document.createElement("td");
        cell3.className = "productTable__cell col3";
        cell3.innerHTML = "<p>$ " + productsList[i].price_sell + "</p>";

        var cell4 = document.createElement("td");
        cell4.className = "productTable__cell col4";
        var statusProduct="In stock";
        if (productsList[i].quantity===0){
            statusProduct="Out of stock"
            cell4.innerHTML = "<p class='OutOfStock'>" + statusProduct + "</p>";
        }else if(productsList[i].quantity<20) {
            statusProduct = "Low stock"
            cell4.innerHTML = "<p class='LowStock'>" + statusProduct + "</p>";
        }else{
            cell4.innerHTML = "<p class='InStock'>" + statusProduct + "</p>";
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
    let myTableRowProduct1 = document.getElementById("product__row--0");
    myTableRowProduct1.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-7);
    });
    var myTableRowProduct2 = document.getElementById("product__row--1");
    myTableRowProduct2.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-6);
    });
    var myTableRowProduct3 = document.getElementById("product__row--2");
    myTableRowProduct3.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-5);
    });
    var myTableRowProduct4 = document.getElementById("product__row--3");
    myTableRowProduct4.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-4);
    });
    var myTableRowProduct5 = document.getElementById("product__row--4");
    myTableRowProduct5.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-3);
    });
    var myTableRowProduct6 = document.getElementById("product__row--5");
    myTableRowProduct6.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-2);
    });
}
class Product {
    constructor(id, name, category, brand_name, day_import, quantity, price_imported, price_sell, for_gender, description, thumbnail_stack) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand_name = brand_name;
        this.day_import = day_import;
        this.quantity = quantity;
        this.price_imported = price_imported;
        this.price_sell = price_sell;
        this.for_gender = for_gender;
        this.description = description;
        this.thumbnail_stack = thumbnail_stack;
    }
}
function filterInStockStatus(){
    loadJSonProduct();
    for (let i=0;i<productsList.length;i++){
        if (productsList[i].quantity<20){
            productsList.splice(i,1);
            i--;
        }
    }
}
function filterLowStockStatus(){
    loadJSonProduct();
    for (let i=0;i<productsList.length;i++){
        if (productsList[i].quantity>=20 || productsList[i].quantity<1){
            productsList.splice(i,1);
            i--;
        }
    }
}
function filterOutOfStockStatus(){
    loadJSonProduct();
    for (let i=0;i<productsList.length;i++){
        if (productsList[i].quantity>0){
            productsList.splice(i,1);
            i--;
        }
    }
}
function filterAllStatus(){
    loadJSonProduct();
}
// ----------------------------------------------------------------
// COMMON HANDLER


// PRODUCT
// ----------------------------------------------------------------
headerTab2.addEventListener('click', () =>{
    if(!headerTab2.classList.contains('active')){
        resetNavbar();
        clearMainBody();
        headerTab2.classList.add('active');
        document.getElementById('product-page').classList.remove('hidden');
    }
    
    n=1;
    clearTable();
    load6Product(productsList, "next");
    var containerDetailProductImg = document.getElementById('containerDetailProduct--img');
    var imgElements = containerDetailProductImg.getElementsByTagName('img');
    // Lặp qua danh sách các thẻ img và xóa
    for (var i = imgElements.length - 1; i >= 0; i--) {
        var imgElement = imgElements[i];
        imgElement.parentNode.removeChild(imgElement);
    }
})

// New product
const newProduct_Btn = document.getElementById('newProduct-btn');
newProduct_Btn.addEventListener('click', ()=>{
    resetNavbar();
    clearMainBody();
    document.getElementById('productCreate-page').classList.remove('hidden');
    let ProductIdDetail = document.getElementById('ProductId--create');
    ProductIdDetail.textContent = "PD" + IDGenerate();
})

//Status Filter
var ProductStatusSelection = document.getElementById('Product-status-selection');
ProductStatusSelection.addEventListener('change',()=>{
    var statusSelected = ProductStatusSelection.options[ProductStatusSelection.selectedIndex].value;
    if (statusSelected==='All'){
        filterAllStatus();
    }else if (statusSelected==='InStock'){
        filterInStockStatus();
    }else if (statusSelected==='LowStock'){
        filterLowStockStatus();
    }else if (statusSelected==='OutOfStock'){
        filterOutOfStockStatus();
    }
    n=1;
    clearTable();
    load6Product(productsList, 'next');
})
// ----------------------------------------------------------------
// PRODUCT


// PRODUCT DETAIL
// ----------------------------------------------------------------
//hien chi tiet san pham vao web
function loadDetail(i){
    //product-info--1
    var DetailProductNametxtField = document.getElementById('DetailProduct-Name--txtField');
    DetailProductNametxtField.value = productsList[i].name;

    var DetailProductday_importtxtField = document.getElementById('DetailProduct-DayImport--txtField');
    DetailProductday_importtxtField.textContent = productsList[i].day_import;

    var DetailProductdescribetxtField = document.getElementById('DetailProduct-describe--txtField');
    DetailProductdescribetxtField.value = productsList[i].description;

    var containerDetailProductImg = document.getElementById('containerDetailProduct--img');
    for (let j=0; j<productsList[i].thumbnail_stack.length;j++){
        let newImg = document.createElement("img");
        newImg.classList.add("imageDetailProduct");
        newImg.src = productsList[i].thumbnail_stack[j];
        newImg.id = "image" + i + "_" + j;
        containerDetailProductImg.prepend(newImg);
        newImg.addEventListener('click', function (){
            handleImageClick(newImg.id);
        })
    }
    //product-info--2
    var ProductIdDetail = document.getElementById('ProductId--detail');
    ProductIdDetail.textContent = productsList[i].id;
    var Detailproductradio1 = document.getElementById('Detailproduct--radio1');
    var Detailproductradio2 = document.getElementById('Detailproduct--radio2');
    var Detailproductradio3 = document.getElementById('Detailproduct--radio3');
    Detailproductradio1.checked=false;
    Detailproductradio2.checked=false;
    Detailproductradio3.checked=false;
    if (productsList[i].for_gender==="Nam" || productsList[i].for_gender==="Men"){
        Detailproductradio1.checked=true;
    }else
    if (productsList[i].for_gender==="Nữ" || productsList[i].for_gender==="Women" || productsList[i].for_gender==="Nu"){
        Detailproductradio2.checked=true;
    }else
    if (productsList[i].for_gender==="Tre em" || productsList[i].for_gender==="Kid" || productsList[i].for_gender==="Trẻ em"){
        Detailproductradio3.checked=true;
    }
    var DetailProductInfoCategory = document.getElementById('DetailProduct-info-category');
    if (productsList[i].category==="Balo"){
        DetailProductInfoCategory.value = "Balo";
    }else if (productsList[i].category==="tui"){
            DetailProductInfoCategory.value = "tui";
    }else if(productsList[i].category==="vi"){
            DetailProductInfoCategory.value = "vi";
    }
    var DetailProductBrandTextField = document.getElementById('DetailProduct__Brand-textField');
    DetailProductBrandTextField.value = productsList[i].brand_name;

    //product-info--2-2
    var DetailProductPriceImportTextField = document.getElementById('DetailProduct__PriceImport-textField');
    DetailProductPriceImportTextField.value = productsList[i].price_imported;
    var DetailProductPriceExportTextField = document.getElementById('DetailProduct__PriceExport-textField');
    DetailProductPriceExportTextField.value = productsList[i].price_sell;
    var DetailProductAmountTextField = document.getElementById('DetailProduct__Amount-textField');
    DetailProductAmountTextField.value = productsList[i].quantity;
}

//Update product
var saveProductButtonRepair = document.getElementById('saveProduct--button--repair');
saveProductButtonRepair.addEventListener('click', ()=>{
    var DetailProductNametxtField = document.getElementById('DetailProduct-Name--txtField');
    var ProductName = DetailProductNametxtField.value;
    var DetailProductday_importtxtField = document.getElementById('DetailProduct-DayImport--txtField');
    var day_import = DetailProductday_importtxtField.textContent;
    var DetailProductdescribetxtField = document.getElementById('DetailProduct-describe--txtField');
    var describe = DetailProductdescribetxtField.value;
    var containerDetailProductImg = document.querySelectorAll('.imageDetailProduct');
    var listDetailImgSrc = Array();
    for(let i=0; i<containerDetailProductImg.length-1;i++){
        listDetailImgSrc.push(containerDetailProductImg[i].src);
    }

    //product-info--2
    var ProductIdDetail = document.getElementById('ProductId--detail').textContent;
    var Gender;
    var Detailproductradio1 = document.getElementById('Detailproduct--radio1').checked;
    var Detailproductradio2 = document.getElementById('Detailproduct--radio2').checked;
    var Detailproductradio3 = document.getElementById('Detailproduct--radio3').checked;
    if (Detailproductradio1===true){
        Gender="Nam";
    }else if (Detailproductradio2===true){
        Gender="Nu"
    }else if (Detailproductradio3===true){
        Gender="Tre em"
    }
    var DetailProductInfoCategory = document.getElementById('DetailProduct-info-category').value;
    var DetailProductBrandTextField = document.getElementById('DetailProduct__Brand-textField').value;
    var DetailProductPriceImportTextField = document.getElementById('DetailProduct__PriceImport-textField').value;
    var DetailProductPriceExportTextField = document.getElementById('DetailProduct__PriceExport-textField').value;
    var DetailProductAmountTextField = document.getElementById('DetailProduct__Amount-textField').value;

    product = new Product(ProductIdDetail, ProductName, DetailProductInfoCategory, DetailProductBrandTextField,
        day_import, DetailProductAmountTextField, DetailProductPriceImportTextField,
        DetailProductPriceExportTextField, Gender, describe, listDetailImgSrc);
    
    for (var i=0;i<productsList.length;i++){
        if (product.id == productsList[i].id){
            productsList[i]=product;
        }
    }
    localStorage.setItem('products', JSON.stringify(productsList));
    alert("Đã sửa thông tin sản phẩm.");
})

//Xóa sản phẩm
var saveProductButtonDelete = document.getElementById('saveProduct--button--delete');
saveProductButtonDelete.addEventListener('click',() =>{
    var ProductIdDetail = document.getElementById('ProductId--detail').textContent;
    let result = confirm("Bạn có chắc chắn muốn xóa!");
    if (result){
        for (var i=0;i<productsList.length;i++){
            if (ProductIdDetail == productsList[i].id){
                productsList.splice(i,1);
            }
        }
        localStorage.setItem('products', JSON.stringify(productsList));
        headerTab2.click();
    }
});
// ----------------------------------------------------------------
// PRODUCT DETAIL


// PRODUCT CREATE
// ----------------------------------------------------------------
var saveProductButtonCreate = document.getElementById('saveProduct--button--create');
saveProductButtonCreate.addEventListener('click', ()=>{

    if (!checkPriceImport(0) || !checkPriceSell(0) || !checkAmount(0) ){
        alert("Thêm sản phẩm thất bại. Vui lòng kiểm tra lại thông tin.")
        return;
    }

    var DetailProductNametxtField = document.getElementById('product-Name--txtField');
    var ProductName = DetailProductNametxtField.value;
    var DetailProductday_importtxtField = document.getElementById('product-day_import--txtField');
    var day_import = getCurrentDate();
    var DetailProductdescribetxtField = document.getElementById('product-describe--txtField');
    var describe = DetailProductdescribetxtField.value;
    var containerDetailProductImg = document.querySelectorAll('.imageProduct');
    var listDetailImgSrc = Array();
    containerDetailProductImg.forEach(function (img){
        if (img.src!=null){
            listDetailImgSrc.push(img.src);
        }
    });

    //product-info--2
    var ProductIdDetail = "PD" + IDGenerate();

    var Gender;
    var Detailproductradio1 = document.getElementById('product--radio1').checked;
    var Detailproductradio2 = document.getElementById('product--radio2').checked;
    var Detailproductradio3 = document.getElementById('product--radio3').checked;
    if (Detailproductradio1===true){
        Gender="Nam";
    }else if (Detailproductradio2===true){
        Gender="Nu"
    }else if (Detailproductradio3===true){
        Gender="Tre em"
    }
    var DetailProductInfoCategory = document.getElementById('product-info-category').value;
    var DetailProductBrandTextField = document.getElementById('Brand-textField').value;
    var DetailProductPriceImportTextField = parseInt(document.getElementById('PriceImport-textField').value);
    var DetailProductPriceExportTextField = parseInt(document.getElementById('PriceExport-textField').value);
    var DetailProductAmountTextField = parseInt(document.getElementById('Amount-textField').value);
    if (DetailProductAmountTextField===null) DetailProductAmountTextField=0;



    product = new Product(ProductIdDetail, ProductName, DetailProductInfoCategory, DetailProductBrandTextField,
        day_import, DetailProductAmountTextField, DetailProductPriceImportTextField,
        DetailProductPriceExportTextField, Gender, describe, listDetailImgSrc);
    productList.push(product);
    localStorage.setItem('products', JSON.stringify(productList));
    alert("Đã thêm sản phẩm");
    location.reload();
})
// ----------------------------------------------------------------
// PRODUCT CREATE


//Nút thêm ảnh
var DetailProductInfoBtnImg = document.getElementById('DetailProduct-info__btn-img');
DetailProductInfoBtnImg.addEventListener('click', ()=>{
    document.getElementById('fileInput').click();
})
function showImage(input) {
    // Kiểm tra xem đã chọn file hay chưa
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Hiển thị ảnh đã chọn trong div
            var imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.classList.add('imageDetailProduct');
            imgElement.id = 'Img'+Date.now();
            document.getElementById('containerDetailProduct--img').prepend(imgElement);
            imgElement.addEventListener('click', function (){
                handleImageClick(imgElement.id);
            })
        };
        reader.readAsDataURL(input.files[0]);
    }
}
//thêm ảnh create
var CreateProductInfoBtnImg = document.getElementById('containerCreateProduct--img');
CreateProductInfoBtnImg.addEventListener('click', ()=>{
    document.getElementById('fileInput--Product').click();
})
function showCreateImage(input) {
    // Kiểm tra xem đã chọn file hay chưa
    if (input.files && input.files[0]) {
        var reader = new FileReader();

        reader.onload = function (e) {
            // Hiển thị ảnh đã chọn trong div
            var imgElement = document.createElement('img');
            imgElement.src = e.target.result;
            imgElement.classList.add('imageProduct');
            imgElement.id = 'Img'+Date.now();
            document.getElementById('containerCreateProduct--img').prepend(imgElement);
            imgElement.addEventListener('click', function (){
                handleImageClick(imgElement.id);
            })
        };
        reader.readAsDataURL(input.files[0]);
    }
}




 // Xóa tất cả các hàng có sản phẩm trong table
function clearTable() {
    const rows = document.querySelectorAll('.product__row');
    for(let i = 0; i < rows.length; i++){
        table_product.removeChild(rows[i]);
    }
}

var btnNext = document.getElementById("loadNextProduct");
var btnBack = document.getElementById("loadBackProduct");

btnNext.addEventListener('click', ()=>{
    if (n>=productsList.length){
        return;
    }
    clearTable();
    load6Product(productsList, "next");
})
btnBack.addEventListener('click', ()=>{
    if (n<6){
        return;
    }
    clearTable();
    load6Product(productsList, "back");
});

