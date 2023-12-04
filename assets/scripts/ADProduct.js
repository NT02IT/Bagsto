ListProduct = [
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "60.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 2",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo1.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 1",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 9",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
    {
        productId: "B001",
        name: "San pham 10",
        img: "./assets/img/balo2.jpg",
        createAt: "08 Apr 2022",
        price: "55.47",
        status: "In Stock",
    },
];
var currentIndex = 0;
const addProduct = document.getElementsByClassName("main-body__header__btnAddProduct")[0];
var countProduct = document.getElementsByClassName("numberOfIngredients")[0];
var table = document.getElementsByClassName("productTable__body")[0];

function loadProduct(listProduct){
    countProduct.innerHTML="";
    var n = listProduct.length;
    var addNumberProduct ="";
    var kt=false;
    if (n<6) kt=true;
    if (kt == true){
            addNumberProduct += `
        <p>
            1-${n} of ${n}             
        </p>
        `;
        countProduct.innerHTML = addNumberProduct;
        load6Product(listProduct, n)
    }
    else{
        addNumberProduct += `
        <p>
            1-6 of ${n}             
        </p>
        `;
        countProduct.innerHTML = addNumberProduct;
    }
    load6Product(listProduct, currentIndex)  
}

function load6Product(listProduct, j){
    var ListItem = "";
    if (j>listProduct.length){
        return;
    }
    if (j+6<listProduct.length){
        j = listProduct.length;
    }
    else{
        j+=6;
    }
    for (let i=j;i<j;i++){
        table.innerHTML = "";
         ListItem += `
            <tr class="productTable__row">
                <th class="productTable__cell col1">
                    <label for="checkBox--${i}"></label>
                    <input type="checkbox" id="checkBox--${i}">
                    <img class="Product__img" src="${listProduct[i].img}" alt="">
                    <p class="product__name">${listProduct[i].name}</p>
                </th>
                <th class="productTable__cell col2">
                    <p>${listProduct[i].createAt}</p>
                </th>
                <th class="productTable__cell col3">
                    <p>$ ${listProduct[i].price}</p>
                </th>
                <th class="productTable__cell col4">
                 <p>${listProduct[i].status}</p>
                </th>
                <th class="productTable__cell col5">
                    <button id="btnInfo--${i}" class="btnInfo">
                        <img src="./assets/brand/icons/svg/3dot.svg" alt="">
                    </button>
                </th>
            </tr>
        `;
    }
    currentIndex = j
    table.innerHTML = ListItem;
}
window.onload = function () {
    loadProduct(ListProduct);
};

addProduct.addEventListener("click", load6Product(ListProduct));
var loadNextProduct = document.getElementById("nextButton--id");
var loadBackProduct = document.getElementById("backButton--id");
loadNextButton.addEventListener("click", load6Product);