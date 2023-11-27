var ListProduct = [];
class Product {
    constructor(id, name, category, brandName, dayImport, quantity, colors, priceImported, priceSell, forGender, description, thumbnailStack) {
        this.id = id;
        this.name = name;
        this.category = category;
        this.brandName = brandName;
        this.dayImport = dayImport;
        this.quantity = quantity;
        this.colors = colors;
        this.priceImported = priceImported;
        this.priceSell = priceSell;
        this.forGender = forGender;
        this.description = description;
        this.thumbnailStack = thumbnailStack;
    }
}
function addProduct(Product){
    ListProduct.add(Product);
}
function updateProduct(Product){
    for (i=0;i<ListProduct.length;i++){
        if (Product.id === ListProduct[i].id){
            ListProduct[i]=Product;
        }
    }
}

const jsonFilePath = '../data/products.json';

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

        // Tiếp tục xử lý dữ liệu, ví dụ: chuyển đổi thành mảng ListProduct
        ListProduct = data.map(item => new Product(
            item.id,
            item.name,
            item.category,
            item.brand_name,
            item.day_import,
            item.quantity,
            item.colors,
            item.price_imported,
            item.price_sell,
            item.for_gender,
            item.description,
            item.thumbnail_stack
        ));

        // In ra mảng ListProduct
        console.log(ListProduct);
    })
    .catch(error => {
        // Xử lý lỗi nếu có
        console.error('Fetch error:', error);
    });

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
function load6Product(listProduct, check) {
    // Lấy reference đến table
    if (check == 'back') {
        if (n <= 12) {
            n = 1;
        } else {
            // Nếu n không phải là bội số của 6, đặt n về trang bắt đầu của trang hiện tại
            n = n - (n % 6 === 0 ? 12 : (n % 6) + 6);
        }
    }
    var m = n+5;
    if (m>listProduct.length){
        m = listProduct.length;
    }

    for (let i = n-1; i<m; i++) {
        // Tạo một hàng mới
        var newRow = document.createElement("tr");
        newRow.className = "productTable__row product__row canhover";
        newRow.id = `product__row--${i}`;
        // Tạo các ô (cột) cho hàng mới
        var cell1 = document.createElement("td");
        cell1.className = "productTable__cell col1";

        var checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = "checkBox--" + i;

        var img = document.createElement("img");
        img.className = "Product__img";
        img.src = listProduct[i].img;
        img.alt = "";

        var productName = document.createElement("p");
        productName.className = "product__name";
        productName.textContent = listProduct[i].name;

        // Gắn các phần tử con vào cell1
        cell1.appendChild(checkbox);
        cell1.appendChild(img);
        cell1.appendChild(productName);

        // Tạo và gắn các ô khác vào hàng mới
        var cell2 = document.createElement("td");
        cell2.className = "productTable__cell col2";
        cell2.innerHTML = "<p>" + listProduct[i].priceImported + "</p>";

        var cell3 = document.createElement("td");
        cell3.className = "productTable__cell col3";
        cell3.innerHTML = "<p>$ " + listProduct[i].priceSell + "</p>";

        var cell4 = document.createElement("td");
        cell4.className = "productTable__cell col4";
        cell4.innerHTML = "<p>" + listProduct[i].status + "</p>";

        // Gắn các ô vào hàng mới
        newRow.appendChild(cell1);
        newRow.appendChild(cell2);
        newRow.appendChild(cell3);
        newRow.appendChild(cell4);

        // Gắn hàng mới vào table
        table_product.appendChild(newRow);
        n++;
    }
    //click xem chi tiet san pham
    var myTableRowProduct = document.getElementById("product__row--0");
    myTableRowProduct.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-7);
    });
    var myTableRowProduct = document.getElementById("product__row--1");
    myTableRowProduct.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-6);
    });
    var myTableRowProduct = document.getElementById("product__row--2");
    myTableRowProduct.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-5);
    });
    var myTableRowProduct = document.getElementById("product__row--3");
    myTableRowProduct.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-4);
    });
    var myTableRowProduct = document.getElementById("product__row--4");
    myTableRowProduct.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-3);
    });
    var myTableRowProduct = document.getElementById("product__row--5");
    myTableRowProduct.addEventListener('click', function() {
        var detailProduct = document.getElementById('DetailProduct-page');
        // console.log('hello');
        resetNavbar();
        clearMainBody();
        detailProduct.classList.remove('hidden');
        loadDetail(n-2);
    });

}
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
    DetailProductDayImporttxtField.value = ListProduct[i].dayImport;
    var DetailProductdescribetxtField = document.getElementById('DetailProduct-describe--txtField');
    DetailProductdescribetxtField.value = ListProduct[i].description;
    var containerDetailProductImg = document.getElementById('containerDetailProduct--img');
    for (let j=0; j<ListProduct[i].thumbnailStack.length;j++){
        let newImg = document.createElement("img");
        newImg.classList.add("imageDetailProduct");
        newImg.src = ListProduct[i].thumbnailStack[j];
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
    if (ListProduct[i].forGender==="Nam" || ListProduct[i].forGender==="Men"){
        Detailproductradio1.checked=true;
    }else
    if (ListProduct[i].forGender==="Nữ" || ListProduct[i].forGender==="Women" || ListProduct[i].forGender==="Nu"){
        Detailproductradio2.checked=true;
    }else
    if (ListProduct[i].forGender==="Tre em" || ListProduct[i].forGender==="Kid" || ListProduct[i].forGender==="Trẻ em"){
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
    DetailProductBrandTextField.value = ListProduct[i].brandName;
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
    DetailProductPriceImportTextField.value = ListProduct[i].priceImported;
    var DetailProductPriceExportTextField = document.getElementById('DetailProduct__PriceExport-textField');
    DetailProductPriceExportTextField.value = ListProduct[i].priceSell;
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
//Nút lưu sửa đổi
var saveProductButtonRepair = document.getElementById('saveProduct--button--repair');
saveProductButtonRepair.addEventListener('click', ()=>{
    var DetailProductNametxtField = document.getElementById('DetailProduct-Name--txtField');
    var ProductName = DetailProductNametxtField.value;
    var DetailProductDayImporttxtField = document.getElementById('DetailProduct-DayImport--txtField');
    var DayImport = DetailProductDayImporttxtField.value;
    var DetailProductdescribetxtField = document.getElementById('DetailProduct-describe--txtField');
    var describe = DetailProductdescribetxtField.value;
    var containerDetailProductImg = document.querySelectorAll('.imageDetailProduct');
    var listDetailImgSrc = Array();
    containerDetailProductImg.forEach(function (img){
        listDetailImgSrc.add(img.src);
    });

    //product-info--2
    var ProductIdDetail = document.getElementById('ProductId--detail').value;
    ProductIdDetail = ProductIdDetail.slice(0,11);

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
        listColorProduct.add('#00ab55');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--2').checked){
        listColorProduct.add('#00b8d9');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--3').checked){
        listColorProduct.add('#003768');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--5').checked){
        listColorProduct.add('#ffab00');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--5').checked){
        listColorProduct.add('#ffac82');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--6').checked){
        listColorProduct.add('#b71d18');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--7').checked){
        listColorProduct.add('#161c24');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--8').checked){
        listColorProduct.add('#858684');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--9').checked){
        listColorProduct.add('#f13252');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--10').checked){
        listColorProduct.add('#f36be1');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--11').checked){
        listColorProduct.add('#cbd3cf');
    }
    if (document.getElementById('DetailProduct__Table__checkbox--12').checked){
        listColorProduct.add('#ab7d00');
    }

    var DetailProductPriceImportTextField = document.getElementById('DetailProduct__PriceImport-textField').value;
    var DetailProductPriceExportTextField = document.getElementById('DetailProduct__PriceExport-textField').value;
    var DetailProductAmountTextField = document.getElementById('DetailProduct__Amount-textField').value;

    product = new Product(ProductIdDetail, ProductName, DetailProductInfoCategory, DetailProductBrandTextField,
        DayImport, DetailProductAmountTextField, listColorProduct, DetailProductPriceImportTextField,
        DetailProductPriceExportTextField, Gender, describe, listDetailImgSrc);
    updateProduct(product);
})

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
    if (n>=ListProduct.length){
        return;
    }
    clearTable();
    load6Product(ListProduct, "next");
})
btnBack.addEventListener('click', ()=>{
    if (n<6){
        return;
    }
    clearTable();
    load6Product(ListProduct, "back");
});

window.onload = function(){
    load6Product(ListProduct, "next");
};

//Detail product
// var myTableRowProduct = document.getElementById("product__row--1");
// myTableRowProduct.addEventListener('click', function() {
//     console.log('Row clicked!');
// });
//Detail product