var ListProduct = [];
//product-page
const newProduct_Btn = document.getElementById('newProduct-btn');
newProduct_Btn.addEventListener('click', ()=>{
    var productCreatePage = document.getElementById('productCreate-page');
    resetNavbar();
    clearMainBody();
    productCreatePage.classList.remove('hidden');
    let ProductIdDetail = document.getElementById('ProductId--create');
    ProductIdDetail.textContent = "Product ID: " + (ListProduct[ListProduct.length-1].id+1);

})
//product-page
headerTab2.addEventListener('click', () =>{
    n=1;
    clearTable();
    load6Product("next");
    var containerDetailProductImg = document.getElementById('containerDetailProduct--img');
    var imgElements = containerDetailProductImg.getElementsByTagName('img');
// Lặp qua danh sách các thẻ img và xóa
    for (var i = imgElements.length - 1; i >= 0; i--) {
        var imgElement = imgElements[i];
        imgElement.parentNode.removeChild(imgElement);
    }
})


//
// //////
// function loadJSonProduct(){
//     const jsonFilePath = '../data/products.json';
// // Sử dụng Fetch API để đọc file JSON
//     fetch(jsonFilePath)
//         .then(response => {
//             // Kiểm tra xem có lỗi không
//             if (!response.ok) {
//                 throw new Error(`HTTP error! Status: ${response.status}`);
//             }
//             // Parse JSON từ response
//             return response.json();
//         })
//         .then(data => {
//             // Khi dữ liệu JSON đã được đọc thành công
//             // console.log(data);
//
//             // Tiếp tục xử lý dữ liệu, ví dụ: chuyển đổi thành mảng ListProduct
//             ListProduct = data.map(item => new Product(
//                 item.id,
//                 item.name,
//                 item.category,
//                 item.brand_name,
//                 item.day_import,
//                 item.quantity,
//                 item.colors,
//                 item.price_imported,
//                 item.price_sell,
//                 item.for_gender,
//                 item.description,
//                 item.thumbnail_stack
//             ));
//
//             // In ra mảng ListProduct
//          //   console.log(ListProduct);
//         })
//         .catch(error => {
//             // Xử lý lỗi nếu có
//             console.error('Fetch error:', error);
//         });
//     load6Product('next');
// }
class Product {
    constructor(id, name, category, brand_name, day_import, quantity, colors, price_imported, price_sell, for_gender, description, thumbnail_stack) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brand_name = brand_name;
        this.day_import = day_import;
        this.quantity = quantity;
        this.colors = colors;
        this.price_imported = price_imported;
        this.price_sell = price_sell;
        this.for_gender = for_gender;
        this.description = description;
        this.thumbnail_stack = thumbnail_stack;
    }
}
function loadJSonProduct(){
    ListProduct = JSON.parse(localStorage.getItem('products'))
    load6Product('next');
    console.log(ListProduct);
}

function updataProductJson() {
    var productListJSON = JSON.stringify(ListProduct);
    localStorage.setItem('products', productListJSON);
}
function addProduct(Product){
    ListProduct.push(Product);
}
function updateProduct(Product){
    for (var i=0;i<ListProduct.length;i++){
        if (parseInt(Product.id) === ListProduct[i].id){
            ListProduct[i]=Product;
        }
    }
}
function deleteProduct(ID){
    for (var i=0;i<ListProduct.length;i++){
        if (ListProduct[i].id==ID){
            ListProduct.splice(i,1);
            break;
        }
    }
}
function filterInStockStatus(){
    loadJSonProduct();
    for (let i=0;i<ListProduct.length;i++){
        if (ListProduct[i].quantity<20){
            ListProduct.splice(i,1);
            i--;
        }
    }
}
function filterLowStockStatus(){
    loadJSonProduct();
    for (let i=0;i<ListProduct.length;i++){
        if (ListProduct[i].quantity>=20 || ListProduct[i].quantity<1){
            ListProduct.splice(i,1);
            i--;
        }
    }
}
function filterOutOfStockStatus(){
    loadJSonProduct();
    for (let i=0;i<ListProduct.length;i++){
        if (ListProduct[i].quantity>0){
            ListProduct.splice(i,1);
            i--;
        }
    }
}
function filterAllStatus(){
    loadJSonProduct();
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
//load 6 san pham vao bang
var n = 1;
var table_product = document.getElementById("table_product");

function load6Product(check) {
    // Lấy reference đến table
    if (check === 'back') {
        if ((n - 1) % 6 === 0) {
            n -= 12;
        } else {
            n = n - 6 - ((n - 1) % 6);
        }
    }

    let m = Math.min(n + 5, ListProduct.length);

    // Lấy đối tượng span có class là 'body2'
    var spanElement = document.getElementById('indexProductTable');
    // Kiểm tra xem đối tượng có tồn tại không
    if (spanElement) {
        // Thay đổi nội dung của đối tượng span
        spanElement.textContent = `${n} - ${m} of ${ListProduct.length}`; // Thay "New Text" bằng nội dung mới bạn muốn đặt
    }

    //  table_product.innerHTML = ''; // Clear the table content

    for (let i = n - 1; i < m; i++) {
        let product = ListProduct[i];

        // Tạo một hàng mới
        let newRow = document.createElement("tr");
        newRow.className = "productTable__row product__row canhover";
        newRow.id = `product__row--${i}`;

        // Tạo các ô (cột) cho hàng mới
        let cell1 = document.createElement("td");
        cell1.className = "productTable__cell col1";

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkBox--" + i;

        let img = document.createElement("img");
        img.className = "Product__img";
        img.src = product.thumbnail_stack[0];
        img.alt = "";

        let productName = document.createElement("p");
        productName.className = "product__name";
        productName.textContent = product.name;

        // Gắn các phần tử con vào cell1
        cell1.appendChild(checkbox);
        cell1.appendChild(img);
        cell1.appendChild(productName);

        // Tạo và gắn các ô khác vào hàng mới
        let cell2 = createTableCell("productTable__cell col2", `<p>${product.day_import}</p>`);
        let cell3 = createTableCell("productTable__cell col3", `<p>${product.price_sell} VND</p>`);
        let cell4 = createTableCell("productTable__cell col4", getStatusHTML(product.quantity));

        // Gắn các ô vào hàng mới
        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);

        // Gắn hàng mới vào table
        table_product.appendChild(newRow);

        //click xem chi tiet san pham
        let myTableRowProduct = document.getElementById(`product__row--${i}`);
        if (myTableRowProduct != null) {
            myTableRowProduct.addEventListener('click', function () {
                var detailProduct = document.getElementById('DetailProduct-page');
                resetNavbar();
                clearMainBody();
                detailProduct.classList.remove('hidden');
                loadDetail(i);
            });
        }
        n++;
    }
}

function createTableCell(className, innerHTML) {
    let cell = document.createElement("td");
    cell.className = className;
    cell.innerHTML = innerHTML;
    return cell;
}

function getStatusHTML(quantity) {
    let statusProduct = "In stock";
    if (quantity === 0 || quantity==="") {
        statusProduct = "Out of stock";
        return `<p class='OutOfStock'>${statusProduct}</p>`;
    } else if (quantity < 20) {
        statusProduct = "Low stock";
        return `<p class='LowStock'>${statusProduct}</p>`;
    } else {
        return `<p class='InStock'>${statusProduct}</p>`;
    }
}

// comboBox status
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
    load6Product('next');
})

//search bar
var ProductSearchInput = document.getElementById('Product-search-input');
ProductSearchInput.addEventListener('change',()=>{
    var statusSelected = ProductStatusSelection.options[ProductStatusSelection.selectedIndex].value;
    console.log(statusSelected);
    if (statusSelected==='All'){
        filterAllStatus();
    }else if (statusSelected==='InStock'){
        filterInStockStatus();
    }else if (statusSelected==='LowStock'){
        filterLowStockStatus();
    }else if (statusSelected==='OutOfStock'){
        filterOutOfStockStatus();
    }
    var input = ProductSearchInput.value;
    ListProduct = ListProduct.filter(element=>element.name.includes(input));
    n=1;
    clearTable();
    load6Product('next');
})


function handleImageClick(imgId){
    var confirmDelete = confirm("Bạn chắc chắn muốn xóa!");
    if (confirmDelete){
        document.getElementById(imgId).remove();
    }
}
//hien chi tiet san pham vao web
function loadDetail(i){

    //product-info--1
    var DetailProductNametxtField = document.getElementById('DetailProduct-Name--txtField');
    DetailProductNametxtField.value = ListProduct[i].name;
    var DetailProductDayImporttxtField = document.getElementById('DetailProduct-DayImport--txtField');
    DetailProductDayImporttxtField.value = ListProduct[i].day_import;
    var DetailProductdescribetxtField = document.getElementById('DetailProduct-describe--txtField');
    DetailProductdescribetxtField.value = ListProduct[i].description;
    var containerDetailProductImg = document.getElementById('containerDetailProduct--img');
    for (let j=0; j<ListProduct[i].thumbnail_stack.length;j++){
        let newImg = document.createElement("img");
        newImg.classList.add("imageDetailProduct");
        newImg.src = ListProduct[i].thumbnail_stack[j];
        newImg.id = "image" + i + "_" + j;
        containerDetailProductImg.prepend(newImg);
        newImg.addEventListener('click', function (){
            handleImageClick(newImg.id);
        })
    }
    //product-info--2
    var ProductIdDetail = document.getElementById('ProductId--detail');
    ProductIdDetail.textContent = "Product ID: " + ListProduct[i].id;
    var Detailproductradio1 = document.getElementById('Detailproduct--radio1');
    var Detailproductradio2 = document.getElementById('Detailproduct--radio2');
    var Detailproductradio3 = document.getElementById('Detailproduct--radio3');
    Detailproductradio1.checked=false;
    Detailproductradio2.checked=false;
    Detailproductradio3.checked=false;
    if (ListProduct[i].for_gender==="Nam" || ListProduct[i].for_gender==="Men"){
        Detailproductradio1.checked=true;
    }else
    if (ListProduct[i].for_gender==="Nữ" || ListProduct[i].for_gender==="Women" || ListProduct[i].for_gender==="Nu"){
        Detailproductradio2.checked=true;
    }else
    if (ListProduct[i].for_gender==="Tre em" || ListProduct[i].for_gender==="Kid" || ListProduct[i].for_gender==="Trẻ em"){
        Detailproductradio3.checked=true;
    }
    var DetailProductInfoCategory = document.getElementById('DetailProduct-info-category');
    if (ListProduct[i].category==="Balo"){
        DetailProductInfoCategory.value = "Balo";
    }else if (ListProduct[i].category==="TuiXach"){
            DetailProductInfoCategory.value = "TuiXach";
        }else if(ListProduct[i].category==="PhuKien"){
                DetailProductInfoCategory.value = "PhuKien";
    }
    var DetailProductBrandTextField = document.getElementById('DetailProduct__Brand-textField');
    DetailProductBrandTextField.value = ListProduct[i].brand_name;
    //colors
    for (let j=0; j<ListProduct[i].colors.length;j++){
        let DetailProductTableCheckbox;
        if (ListProduct[i].colors[j] === '#00ab55') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--1');
            DetailProductTableCheckbox.checked = true;
        } else if (ListProduct[i].colors[j] === '#00b8d9') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--2');
            DetailProductTableCheckbox.checked = true;
        } else if (ListProduct[i].colors[j] === '#003768') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--3');
            DetailProductTableCheckbox.checked = true;
        } else if (ListProduct[i].colors[j] === '#ffab00') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#ffac82') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#b71d18') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#161c24') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#858684') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#f13252') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#f36be1') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#cbd3cf') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }else if (ListProduct[i].colors[j] === '#ab7d00') {
            DetailProductTableCheckbox = document.getElementById('DetailProduct__Table__checkbox--4');
            DetailProductTableCheckbox.checked = true;
        }
    }

    // for (let j=0; j<ListProduct[i].sizes.length;j++) {
    //     let checkboxSizeDetail;
    //     if (ListProduct[i].sizes[j] === 'S') {
    //         checkboxSizeDetail = document.getElementById('checkboxSizeS--Detail');
    //         checkboxSizeDetail.checked = true;
    //     } else if (ListProduct[i].sizes[j] === 'M') {
    //         checkboxSizeDetail = document.getElementById('checkboxSizeM--Detail');
    //         checkboxSizeDetail.checked = true;
    //     } else if (ListProduct[i].sizes[j] === 'L') {
    //         checkboxSizeDetail = document.getElementById('checkboxSizeL--Detail');
    //         checkboxSizeDetail.checked = true;
    //     }
    // }
    //product-info--2-2
    var DetailProductPriceImportTextField = document.getElementById('DetailProduct__PriceImport-textField');
    DetailProductPriceImportTextField.value = ListProduct[i].price_imported;
    var DetailProductPriceExportTextField = document.getElementById('DetailProduct__PriceExport-textField');
    DetailProductPriceExportTextField.value = ListProduct[i].price_sell;
    var DetailProductAmountTextField = document.getElementById('DetailProduct__Amount-textField');
    DetailProductAmountTextField.value = ListProduct[i].quantity;

}

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
//Nút lưu sửa đổi
var saveProductButtonRepair = document.getElementById('saveProduct--button--repair');
saveProductButtonRepair.addEventListener('click', ()=>{
    if (!checkDayImport(1) || !checkPriceImport(1) || !checkPriceSell(1) || !checkAmount(1) ){
        alert("Sửa sản phẩm thất bại. Vui lòng kiểm tra lại thông tin.")
        return;
    }

    var DetailProductNametxtField = document.getElementById('DetailProduct-Name--txtField');
    var ProductName = DetailProductNametxtField.value;
    var DetailProductDayImporttxtField = document.getElementById('DetailProduct-DayImport--txtField');
    var DayImport = DetailProductDayImporttxtField.value;
    var DetailProductdescribetxtField = document.getElementById('DetailProduct-describe--txtField');
    var describe = DetailProductdescribetxtField.value;
    var containerDetailProductImg = document.querySelectorAll('.imageDetailProduct');
    var listDetailImgSrc = Array();
    console.log(listDetailImgSrc);
    containerDetailProductImg.forEach(function (img){
        if (img.src!=null){
            listDetailImgSrc.push(img.src);
        }
    });

    //product-info--2
    var ProductIdDetail = document.getElementById('ProductId--detail').textContent;
    ProductIdDetail = parseInt(ProductIdDetail.slice(12));

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
    //colors
    var listColorProduct = Array();
    if (document.getElementById('DetailProduct__Table__checkbox--1').checked){
        listColorProduct.push('#00ab55');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--2').checked){
        listColorProduct.push('#00b8d9');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--3').checked){
        listColorProduct.push('#003768');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--5').checked){
        listColorProduct.push('#ffab00');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--5').checked){
        listColorProduct.push('#ffac82');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--6').checked){
        listColorProduct.push('#b71d18');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--7').checked){
        listColorProduct.push('#161c24');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--8').checked){
        listColorProduct.push('#858684');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--9').checked){
        listColorProduct.push('#f13252');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--10').checked){
        listColorProduct.push('#f36be1');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--11').checked){
        listColorProduct.push('#cbd3cf');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--12').checked){
        listColorProduct.push('#ab7d00');
    }

    var DetailProductPriceImportTextField = parseInt(document.getElementById('DetailProduct__PriceImport-textField').value);
    var DetailProductPriceExportTextField = parseInt(document.getElementById('DetailProduct__PriceExport-textField').value);
    var DetailProductAmountTextField = parseInt(document.getElementById('DetailProduct__Amount-textField').value);

    product = new Product(ProductIdDetail, ProductName, DetailProductInfoCategory, DetailProductBrandTextField,
        DayImport, DetailProductAmountTextField, listColorProduct, DetailProductPriceImportTextField,
        DetailProductPriceExportTextField, Gender, describe, listDetailImgSrc);
    console.log(ListProduct);
    updateProduct(product);
    console.log(ListProduct);
    updataProductJson();
    alert("Đã sửa thông tin sản phẩm.");
})

//Nút tạo sản phẩm
var saveProductButtonCreate = document.getElementById('saveProduct--button--create');
saveProductButtonCreate.addEventListener('click', ()=>{

    if (!checkDayImport(0) || !checkPriceImport(0) || !checkPriceSell(0) || !checkAmount(0) ){
        alert("Thêm sản phẩm thất bại. Vui lòng kiểm tra lại thông tin.")
        return;
    }

    var DetailProductNametxtField = document.getElementById('product-Name--txtField');
    var ProductName = DetailProductNametxtField.value;
    var DetailProductDayImporttxtField = document.getElementById('product-DayImport--txtField');
    var DayImport = DetailProductDayImporttxtField.value;
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
    var ProductIdDetail = ListProduct[ListProduct.length-1].id;
    ProductIdDetail++;

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
    //colors
    var listColorProduct = Array();
    if (document.getElementById('Table__checkbox--1').checked){
        listColorProduct.push('#00ab55');
    }
    if (document.getElementById('Table__checkbox--2').checked){
        listColorProduct.push('#00b8d9');
    }
    if (document.getElementById('Table__checkbox--3').checked){
        listColorProduct.push('#003768');
    }
    if (document.getElementById('Table__checkbox--5').checked){
        listColorProduct.push('#ffab00');
    }
    if (document.getElementById('Table__checkbox--5').checked){
        listColorProduct.push('#ffac82');
    }
    if (document.getElementById('Table__checkbox--6').checked){
        listColorProduct.push('#b71d18');
    }
    if (document.getElementById('Table__checkbox--7').checked){
        listColorProduct.push('#161c24');
    }
    if (document.getElementById('Table__checkbox--8').checked){
        listColorProduct.push('#858684');
    }
    if (document.getElementById('Table__checkbox--9').checked){
        listColorProduct.push('#f13252');
    }
    if (document.getElementById('Table__checkbox--10').checked){
        listColorProduct.push('#f36be1');
    }
    if (document.getElementById('Table__checkbox--11').checked){
        listColorProduct.push('#cbd3cf');
    }
    if (document.getElementById('Table__checkbox--12').checked){
        listColorProduct.push('#ab7d00');
    }

    var DetailProductPriceImportTextField = parseInt(document.getElementById('PriceImport-textField').value);
    var DetailProductPriceExportTextField = parseInt(document.getElementById('PriceExport-textField').value);
    var DetailProductAmountTextField = parseInt(document.getElementById('Amount-textField').value);
    if (DetailProductAmountTextField===null) DetailProductAmountTextField=0;



    product = new Product(ProductIdDetail, ProductName, DetailProductInfoCategory, DetailProductBrandTextField,
        DayImport, DetailProductAmountTextField, listColorProduct, DetailProductPriceImportTextField,
        DetailProductPriceExportTextField, Gender, describe, listDetailImgSrc);
    addProduct(product);
    updataProductJson();
    alert("Đã thêm sản phẩm.");
})


//nút xóa sản phẩm
var saveProductButtonDelete = document.getElementById('saveProduct--button--delete');
saveProductButtonDelete.addEventListener('click',() =>{
    var ProductIdDetail = document.getElementById('ProductId--detail').textContent;
    ProductIdDetail = ProductIdDetail.slice(12);
    let result = confirm("Bạn có chắc chắn muốn xóa!");
    if (result){
        deleteProduct(ProductIdDetail);
        updataProductJson();
        headerTab2.click();
    }
});

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
    if (n<ListProduct.length){
        clearTable();
        load6Product("next");
    }
})
btnBack.addEventListener('click', ()=>{
    if (n>7){
        clearTable();
        load6Product("back");
    }
});

window.onload = function (){
    loadJSonProduct();
}
//Detail product
// var myTableRowProduct = document.getElementById("product__row--1");
// myTableRowProduct.addEventListener('click', function() {
//     console.log('Row clicked!');
// });
//Detail product


//kiểm tra lỗi sai khi nhập:
const NgayThangNam = /^(0[1-9]|[1-2][0-9]|3[0-1])\/(0[1-9]|1[0-2])\/\d{4}$/;
function checkDayImport(kt){
    if (kt===0){
        var productDayImportTxtField = document.getElementById('product-DayImport--txtField').value;
        var errorElement = document.getElementById('error--ProductDayImport');
    }else {
        var productDayImportTxtField = document.getElementById('DetailProduct-DayImport--txtField').value;
        var errorElement = document.getElementById('error--ProductDayImport--detail');
    }
    if (productDayImportTxtField.trim()===""){
        errorElement.innerHTML = 'Vui lòng điền ngày nhập hàng.';
        return false;
    }
    if (!NgayThangNam.test(productDayImportTxtField)){
        errorElement.innerHTML = 'Vui lòng điền đúng định dạng: dd/MM/yyyy';
        return false
    }
    errorElement.innerHTML='';
    return true;
}

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
